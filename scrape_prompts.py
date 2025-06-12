import requests
import json
import time
import os

def build_library_reference_md():
    """
    Scrapes Aceternity UI component data and builds a single, comprehensive
    Markdown file as a library reference for an AI model.
    """
    master_registry_url = "https://ui.aceternity.com/registry"
    output_filename = "aceternity_ui_library.md"

    print(f"Fetching master component list from: {master_registry_url}")
    
    try:
        response = requests.get(master_registry_url)
        response.raise_for_status()
        all_components = response.json()
        # Sort components alphabetically for a consistent output file
        component_names = sorted([component['name'] for component in all_components])
        print(f"Found {len(component_names)} components. Preparing to build reference file.")
    except (requests.exceptions.RequestException, json.JSONDecodeError) as e:
        print(f"FATAL: Could not fetch or parse the master registry. Aborting. Error: {e}")
        return

    # Open the output file once and write to it iteratively
    with open(output_filename, 'w', encoding='utf-8') as md_file:
        # Write the main header for the reference document
        md_file.write("# Aceternity UI Component Library Reference\n\n")
        md_file.write("This document contains the full source code and dependency information for all components in the Aceternity UI library. Use this as a reference to understand how to implement or modify them.\n\n")

        print("\nStarting to scrape and build Markdown for each component...")
        
        # Loop through each component name
        for name in component_names:
            demo_url = f"https://ui.aceternity.com/registry/{name}-demo.json"
            
            try:
                demo_response = requests.get(demo_url)
                if demo_response.status_code != 200:
                    print(f"  [SKIPPED] No demo file for '{name}' (Status: {demo_response.status_code})")
                    continue

                demo_data = demo_response.json()

                # --- Start building the Markdown section for this component ---
                
                # Component Name (as a level 2 heading)
                md_file.write(f"## `{name}`\n\n")

                # Dependencies Section
                dependencies = demo_data.get("dependencies", [])
                registry_deps = demo_data.get("registryDependencies", [])
                all_deps = dependencies + registry_deps
                
                md_file.write("### Dependencies\n")
                if not all_deps:
                    md_file.write("- None\n")
                else:
                    for dep in all_deps:
                        md_file.write(f"- `{dep}`\n")
                md_file.write("\n")

                # Source Files Section
                files_data = demo_data.get("files", [])
                if not files_data:
                    print(f"  [INFO] No 'files' array found for '{name}'.")
                    continue

                md_file.write("### Source Files\n")
                for file_info in files_data:
                    path = file_info.get("path")
                    content = file_info.get("content")
                    if not path or not content:
                        continue
                    
                    # Determine language for syntax highlighting from file extension
                    language = os.path.splitext(path)[1].lstrip('.')
                    if not language:
                        language = 'tsx' # Default to tsx if no extension found

                    # File Path (as a level 4 heading)
                    md_file.write(f"#### `{path}`\n")
                    # Fenced code block with language specifier
                    md_file.write(f"```{language}\n")
                    md_file.write(content.strip() + "\n")
                    md_file.write("```\n\n")
                
                # Add a horizontal rule to separate components
                md_file.write("---\n\n")
                
                print(f"  [SUCCESS] Added '{name}' to the reference file.")

            except (requests.exceptions.RequestException, json.JSONDecodeError) as e:
                print(f"  [ERROR] Failed to process '{name}': {e}")
            
            # Polite delay
            time.sleep(0.1)

    print(f"\n✅ Successfully created the library reference file: '{output_filename}'")


if __name__ == "__main__":
    build_library_reference_md()
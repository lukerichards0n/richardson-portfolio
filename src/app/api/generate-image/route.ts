import { NextRequest, NextResponse } from "next/server";
import { Content, GoogleGenAI, Modality } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const { prompt, drawingData } = await request.json();

    // Get API key from server-side environment variable (without NEXT_PUBLIC_ prefix)
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    
    if (!GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Google API key not configured" },
        { status: 500 }
      );
    }

    // Initialize AI client on server
    const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

    let contents: Content[] = [
      {
        role: "USER",
        parts: [{ text: prompt }],
      },
    ];

    if (drawingData) {
      contents = [
        {
          role: "USER",
          parts: [{ inlineData: { data: drawingData, mimeType: "image/png" } }],
        },
        {
          role: "USER",
          parts: [{ text: `${prompt}. Keep the same minimal line doodle style.` }],
        },
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const data = {
      success: true,
      message: "",
      imageData: null as string | null,
    };

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          data.message = part.text;
        } else if (part.inlineData?.data) {
          data.imageData = part.inlineData.data;
        }
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to generate image" 
      },
      { status: 500 }
    );
  }
} 
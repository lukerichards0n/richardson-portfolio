"use client";

interface LegendProps {
  type: "network" | "results";
}

export default function Legend({ type }: LegendProps) {
  if (type === "network") {
    return (
      <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-sm rounded-lg p-3 border border-neutral-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <span className="text-xs text-neutral-300">Neurons</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-0.5 bg-white"></div>
            <span className="text-xs text-neutral-300">Positive Weight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-0.5 bg-neutral-500"></div>
            <span className="text-xs text-neutral-300">Negative Weight</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-sm rounded-lg p-3 border border-neutral-800">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white"></div>
          <span className="text-xs text-neutral-300">Class 1 (Output &gt; 0.5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-neutral-500"></div>
          <span className="text-xs text-neutral-300">Class 0 (Output ≤ 0.5)</span>
        </div>
      </div>
    </div>
  );
} 
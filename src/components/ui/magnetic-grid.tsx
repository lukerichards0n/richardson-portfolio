"use client";
import React, { createContext, useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

const MouseContext = createContext<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}>({
  mouseX: new MotionValue(Infinity),
  mouseY: new MotionValue(Infinity),
});

export const MagneticGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY }}>
      <div
        onMouseMove={(e) => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          mouseY.set(Infinity);
        }}
        className={cn(
          "relative grid h-full w-full grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-5",
          className,
        )}
      >
        {children}
      </div>
    </MouseContext.Provider>
  );
};

export const MagneticGridItem = ({
  children,
  className,
  strength = 1,
  influenceRadius = 200,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  influenceRadius?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useContext(MouseContext);

  const position = useTransform(
    [mouseX, mouseY],
    (values: number[]) => {
      const [newX, newY] = values;
      if (!ref.current || newX === Infinity || newY === Infinity) {
        return { x: 0, y: 0 };
      }

      const rect = ref.current.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(newX - itemCenterX, newY - itemCenterY);

      if (distance < influenceRadius) {
        const directionX = newX - itemCenterX;
        const directionY = newY - itemCenterY;
        const force = (1 - distance / influenceRadius) * strength;
        return {
          x: directionX * force * 1.5,
          y: directionY * force * 1.5,
        };
      }
      return { x: 0, y: 0 };
    }
  );

  const springConfig = { damping: 15, mass: 0.1, stiffness: 100 };
  const x = useSpring(
    useTransform(position, (p) => p.x),
    springConfig
  );
  const y = useSpring(
    useTransform(position, (p) => p.y),
    springConfig
  );

  return (
    <motion.div ref={ref} style={{ x, y }} className={cn("z-10", className)}>
      {children}
    </motion.div>
  );
}; 
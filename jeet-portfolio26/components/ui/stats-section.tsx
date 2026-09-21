"use client";

import React, { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export interface StatItemData {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface AnimatedNumberProps {
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  shouldStart: boolean;
  numberColor?: string;
}

function AnimatedNumber({
  end,
  duration,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = true,
  shouldStart,
  numberColor = "#ffffff",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState("0");
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;
    if (raf.current) cancelAnimationFrame(raf.current);

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = easeOutExpo(progress);
      const current = eased * end;

      const formatted = separator
        ? current.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : current.toFixed(decimals);

      setDisplay(formatted);

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [shouldStart, end, duration, decimals, separator]);

  return (
    <span
      style={{
        fontVariantNumeric: "tabular-nums",
        color: numberColor,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}
      className="text-3xl md:text-4xl font-bold font-staat"
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export interface StatsSectionProps {
  stats?: StatItemData[];
  duration?: number;
  separator?: boolean;
  triggerOnView?: boolean;
  numberColor?: string;
  labelColor?: string;
  labelTextTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  itemGap?: number;
  columnGap?: number;
  rowGap?: number;
  minItemWidth?: number;
  divider?: boolean;
  dividerColor?: string;
  background?: string;
  borderRadius?: number;
  className?: string;
}

export function StatsSection({
  stats = [
    { value: 27, label: "Projects Completed", prefix: "", suffix: "+", decimals: 0 },
    { value: 10, label: "Technologies Used", prefix: "", suffix: "+", decimals: 0 },
    { value: 100, label: "Responsive & Quality", prefix: "", suffix: "%", decimals: 0 },
  ],
  duration = 2,
  separator = true,
  triggerOnView = true,
  numberColor = "#ffffff",
  labelColor = "#a3a3a3",
  labelTextTransform = "none",
  itemGap = 6,
  columnGap = 16,
  rowGap = 16,
  divider = true,
  dividerColor = "rgba(255, 255, 255, 0.1)",
  background = "transparent",
  borderRadius = 12,
  className = "",
}: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);

  return (
    <div
      ref={ref}
      style={{
        background,
        borderRadius,
        columnGap: `${columnGap}px`,
        rowGap: `${rowGap}px`,
      }}
      className={`grid grid-cols-3 w-full p-2 md:p-3 box-border ${className}`}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`relative flex flex-col items-start justify-center ${
            divider && i > 0 ? "border-l border-white/10 pl-3 md:pl-4" : ""
          }`}
          style={{ gap: `${itemGap}px` }}
        >
          <AnimatedNumber
            end={stat.value}
            duration={duration}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals ?? 0}
            separator={separator}
            shouldStart={started}
            numberColor={numberColor}
          />
          <span
            style={{
              color: labelColor,
              textTransform: labelTextTransform,
            }}
            className="text-xs md:text-sm font-mono tracking-wide leading-tight"
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;

"use client";

import React from "react";
import { StatsSection } from "./stats-section";

export function StatsSectionDemo() {
  return (
    <div className="w-full max-w-md p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-sm">
      <StatsSection
        stats={[
          { value: 27, label: "Projects Completed", suffix: "+" },
          { value: 10, label: "Technologies Used", suffix: "+" },
          { value: 100, label: "Responsive & Quality", suffix: "%" },
        ]}
        duration={2}
        triggerOnView={true}
        divider={true}
      />
    </div>
  );
}

export default StatsSectionDemo;

"use client";
import React from "react";
import { StickyScroll } from "./sticky-scroll-reveal";

const educationContent = [
  {
    title: "Diploma in Computer Operator & Programming Assistant - Jhabua",
    description:
      "The Diploma in Computer Operator and Programming Assistant (COPA) is a foundational course designed to provide students with essential knowledge and practical skills in computer operations, programming, and office automation. This one-year program focuses on developing proficiency in computer hardware, software applications, basic programming languages, and internet usage.",
    content: (
      <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
        <img
          src="./Images/border-bg.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Border Frame"
        />
        <img
          src="./Images/ITI Education.png"
          className="relative z-10 h-full w-full object-contain p-6"
          alt="ITI Education"
        />
        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-xs font-mono font-medium">ITI Professional Certification</span>
        </div>
      </div>
    ),
  },
  {
    title: "Commerce Certificate (Class XII)",
    description:
      "Commerce stream at Government High School, Indore, offers students a solid academic foundation in business, finance, and economics. This program is designed to equip students with theoretical and practical knowledge related to trade, accounting, management, and entrepreneurship. The curriculum follows the guidelines prescribed by the MP Board and emphasizes analytical thinking, numerical aptitude, and a strong understanding of economic and commercial systems.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-black/40 relative overflow-hidden">
        <img
          src="./Images/Edcation Class 12.png"
          className="h-full w-full object-cover rounded-xl"
          alt="Class 12 Education"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-xs font-mono font-medium">Commerce</span>
        </div>
      </div>
    ),
  },
  {
    title: "Secondary School Certificate (Class X)",
    description:
      "Core foundation in science, mathematics, and computer applications. Built early passion for software, visual arts, and design systems.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-black/40 relative overflow-hidden">
        <img
          src="./Images/Education class 10.png"
          className="h-full w-full object-cover rounded-xl"
          alt="Class 10 Education"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-xs font-mono font-medium">Secondary School Foundation</span>
        </div>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full">
      <StickyScroll content={educationContent} />
    </div>
  );
}

export default StickyScrollRevealDemo;

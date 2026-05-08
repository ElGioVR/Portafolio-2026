"use client";

import React from "react";
import Image from "next/image";

interface PersonProps {
  name?: string;
  submitted?: boolean;
}

const Person = ({ name, submitted }: PersonProps) => {
  // Determina qué imagen mostrar
  let svgSrc = "/person1.svg";
  if (name && !submitted) svgSrc = "/person2.svg";
  if (submitted) svgSrc = "/person3.svg";

  const displayName = name?.trim() || "";

  return (
    <div className="relative mx-6 w-full flex justify-center">
      <div className="relative inline-block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Image src={svgSrc} alt="Person" fill className="object-contain" />

        {/* Texto dinámico solo para person2.svg y si hay nombre */}
        {displayName && !submitted && svgSrc === "/person2.svg" && (
          <div
            className="absolute text-[12px] sm:text-sm font-bold text-center leading-tight"
            style={{
              top: "18%",
              left: "78%",
              transform: "translate(-50%, -50%) rotate(-5deg)",
              maxWidth: "90px",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
              color: "#2d133b",
            }}
            title={`I ❤️ ${displayName}`}
          >
            I ❤️ {displayName}
          </div>
        )}
      </div>
    </div>
  );
};

export default Person;

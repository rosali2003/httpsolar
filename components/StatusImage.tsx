"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  code: number;
  name: string;
  /** "card" = small thumbnail in the homepage grid, "full" = detail page */
  variant: "card" | "full";
  cardBg: string;
}

export default function StatusImage({ code, name, variant, cardBg }: Props) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return variant === "card" ? (
      <div className={`w-full h-36 flex items-center justify-center px-3 ${cardBg}`}>
        <p className="font-mono text-[10px] text-center text-[#7a4a20] leading-snug">
          solar has not manifested this status yet
        </p>
      </div>
    ) : (
      <div className={`w-full aspect-video flex items-center justify-center px-8 ${cardBg}`}>
        <p className="font-mono text-lg text-center text-[#7a4a20] leading-relaxed">
          solar has not manifested this status yet
        </p>
      </div>
    );
  }

  return variant === "card" ? (
    <div className={`w-full h-36 relative ${cardBg}`}>
      <Image
        src={`/api/images/${code}`}
        alt={`Solar the Goldendoodle — ${code} ${name}`}
        fill
        className="object-cover"
        unoptimized
        onError={() => setMissing(true)}
      />
    </div>
  ) : (
    <Image
      src={`/api/images/${code}`}
      alt={`Solar the Goldendoodle illustrating HTTP ${code} ${name}`}
      width={600}
      height={400}
      className="w-full object-cover"
      unoptimized
      onError={() => setMissing(true)}
    />
  );
}

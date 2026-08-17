"use client";

import Image from "next/image";
import { useState } from "react";
import { DashboardMock } from "./DashboardMock";

/**
 * Home hero visual. Renders the configured static hero image (responsive,
 * WebP/AVIF via next/image) and falls back to the built-in dashboard mock if
 * no image is set or the file fails to load — so a missing asset never shows a
 * broken image. The image URL is the source of truth (admin "Hero image URL").
 */
export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <DashboardMock />;

  return (
    <div className="card photo-frame photo-frame-lg relative aspect-[16/9] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover object-center"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

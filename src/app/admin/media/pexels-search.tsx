"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

type PexelsPhoto = {
  id: number;
  alt: string;
  photographer: string;
  src: { large: string; large2x: string; medium: string };
  url: string;
};

export function PexelsSearch() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`/api/admin/pexels?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Search failed");
      setPhotos(json.photos || []);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Search failed");
    }
  }

  async function copyUrl(photo: PexelsPhoto) {
    const url = `${photo.src.large2x.split("?")[0]}?auto=compress&cs=tinysrgb&w=1600`;
    await navigator.clipboard.writeText(url);
    setCopied(photo.id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <form onSubmit={search} className="flex gap-2">
        <label htmlFor="pexels-q" className="sr-only">Search Pexels photos</label>
        <input
          id="pexels-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. artificial intelligence, cloud computing…"
          className="field"
        />
        <button type="submit" className="btn-primary !min-h-0 shrink-0 !px-5 !py-2.5" disabled={status === "loading"}>
          {status === "loading" ? "…" : "Search"}
        </button>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>
      )}

      {photos.length > 0 && (
        <ul className="mt-4 grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
          {photos.map((p) => (
            <li key={p.id} className="group relative overflow-hidden rounded-xl border border-white/[0.08]">
              <img src={p.src.medium} alt={p.alt || `Photo by ${p.photographer}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => copyUrl(p)}
                className="absolute inset-0 flex items-end justify-center bg-night-950/0 pb-3 text-xs font-semibold text-transparent transition focus-visible:bg-night-950/70 focus-visible:text-ink group-hover:bg-night-950/70 group-hover:text-ink"
              >
                {copied === p.id ? "✓ URL copied" : "Copy image URL"}
              </button>
            </li>
          ))}
        </ul>
      )}
      {status === "done" && photos.length === 0 && (
        <p className="mt-3 text-sm text-muted">No results for that search.</p>
      )}
    </div>
  );
}

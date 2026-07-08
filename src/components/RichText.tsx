/**
 * Minimal, safe renderer for stored body text.
 * Supports paragraphs (blank-line separated), "## " h2 and "### " h3 headings,
 * and "- " bullet lists. No raw HTML is ever injected.
 */
export function RichText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className="prose-dark max-w-none">
      {blocks.map((block, i) => {
        const b = block.trim();
        if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
        if (b.startsWith("### ")) return <h3 key={i}>{b.slice(4)}</h3>;
        if (b.split("\n").every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i}>
              {b.split("\n").map((l, j) => (
                <li key={j}>{l.trim().slice(2)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{b}</p>;
      })}
    </div>
  );
}

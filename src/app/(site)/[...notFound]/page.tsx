import { notFound } from "next/navigation";

/** Catch-all so unmatched URLs render the 404 page inside the site layout. */
export default function CatchAll() {
  notFound();
}

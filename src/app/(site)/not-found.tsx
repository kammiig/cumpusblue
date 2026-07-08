import Link from "next/link";

export default function SiteNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-20">
      <div className="text-center">
        <p className="font-display text-7xl font-bold">
          <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">404</span>
        </p>
        <h1 className="h-display mt-4 text-2xl">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for may have moved during our redesign. Try the
          homepage or our services overview.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">Back to homepage</Link>
          <Link href="/services" className="btn-ghost">Explore services</Link>
        </div>
      </div>
    </div>
  );
}

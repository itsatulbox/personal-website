import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-5">
      <h2 className="text-4xl font-bold">404</h2>
      <p>This page could not be found.</p>
      <Link href="/" className="underline hover:opacity-80 transition-opacity">
        Go back home
      </Link>
    </div>
  );
}

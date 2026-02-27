"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-5">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-center max-w-md">{error.message}</p>
      <button
        onClick={reset}
        className="bg-offShade px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}

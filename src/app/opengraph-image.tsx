import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Atul Kodla — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <p
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          ATUL KODLA
        </p>
        <p
          style={{
            fontSize: 32,
            color: "#aaaaaa",
            margin: 0,
          }}
        >
          Software Engineer
        </p>
      </div>
    ),
    { ...size }
  );
}

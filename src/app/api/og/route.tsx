import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? "Shuffree"
  const subtitle = searchParams.get("subtitle") ?? "決めごとを、無料で自由に。"
  const mode = searchParams.get("mode") ?? "All Modes"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)",
          color: "#fff",
          padding: "64px",
          fontFamily: "Nunito",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontSize: 32, fontWeight: 700, opacity: 0.8 }}>Shuffree</span>
          <h1 style={{ fontSize: 72, lineHeight: 1.1, fontWeight: 800 }}>{title}</h1>
          <p style={{ fontSize: 28, opacity: 0.85 }}>{subtitle}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>Mode: {mode}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            🎲 Shuffree.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "#c3704c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
            color: "white",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    { ...size }
  );
}

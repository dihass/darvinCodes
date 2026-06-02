import { Font } from "@react-pdf/renderer"

let registered = false

export function registerPdfFonts() {
  if (registered) return
  registered = true
  Font.register({ family: "Urbanist-Light",       src: "/fonts/Urbanist-Light.ttf" })
  Font.register({ family: "Urbanist-Medium",      src: "/fonts/Urbanist-Medium.ttf" })
  Font.register({ family: "Urbanist-SemiBold",    src: "/fonts/Urbanist-SemiBold.ttf" })
  Font.register({ family: "Urbanist-Bold",        src: "/fonts/Urbanist-Bold.ttf" })
  Font.register({ family: "Urbanist-ExtraBold",   src: "/fonts/Urbanist-ExtraBold.ttf" })
  Font.register({ family: "Spectral-LightItalic", src: "/fonts/Spectral-LightItalic.ttf" })
  Font.registerHyphenationCallback((word) => [word])
}

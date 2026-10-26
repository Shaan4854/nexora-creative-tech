import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SoundProvider } from "@/components/audio/SoundSynthesizer";

export const viewport: Viewport = {
  themeColor: "#050608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NEXORA // Atelier of Post-Digital Dimensions",
  description:
    "Boutique creative technology studio engineering next-generation 3D web experiences, WebGPU compute pipelines, spatial interfaces, and bespoke motion systems.",
  keywords: [
    "Creative Technology Studio",
    "Three.js",
    "WebGL",
    "WebGPU",
    "Interactive 3D",
    "Awwwards Site of the Day",
    "Next.js 14",
    "GSAP ScrollTrigger",
  ],
  authors: [{ name: "NEXORA Atelier" }],
  openGraph: {
    title: "NEXORA // Atelier of Post-Digital Dimensions",
    description:
      "Boutique creative technology studio engineering high-performance interactive 3D and spatial web architectures.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void text-white min-h-screen grain-overlay antialiased selection:bg-beam-cyan selection:text-void">
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}

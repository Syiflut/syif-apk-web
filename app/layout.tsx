import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Ganti jadi Judul Web Kamu (muncul di tab browser & preview)
  title: "Syif.apk_16 • Minimalist Journal",

  // Ganti jadi Deskripsi Singkat Web Kamu
  description: "Bukan motivator, hanya merangkai rasa jadi kata",

  // Biar Preview Link-nya Lebih Estetik (Open Graph)
  openGraph: {
    title: "Syif.apk_16 • Minimalist Journal",
    description: "Personal Log & Quotes. Merangkai rasa menjadi kata.",
    // 👉 Ganti URL ini dengan foto profil Instagram kamu atau foto estetik (PNG/JPG)
    images: [
      {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
        width: 600,
        height: 600,
        alt: "Syif.apk_16 Profile",
      },
    ],
    type: "website",
  },

  // Menentukan Favicon (Icon Tab Browser)
  icons: {
    icon: "/favicon.ico", // Jika kamu punya file favicon.ico di folder /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

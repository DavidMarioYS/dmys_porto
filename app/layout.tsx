import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "./portfolio-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "David Mario | AI Engineer & Automation Specialist";
const siteDescription =
  "Portofolio David Mario Yohanes Samosir: AI Engineer & Automation Specialist dengan pengalaman membangun sistem otomasi ERP skala enterprise, Machine Learning, dan Computer Vision. / Portfolio of an AI Engineer & Automation Specialist building enterprise ERP automation, Machine Learning, and Computer Vision systems.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: siteTitle,
    template: "%s | David Mario",
  },
  description: siteDescription,
  keywords: [
    "AI Engineer",
    "Automation Specialist",
    "ERP Automation",
    "Dynamics 365 Business Central",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Python",
    "n8n",
    "Golang",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    siteName: "David Mario Portfolio",
    title: siteTitle,
    description: siteDescription,
    locale: "id_ID",
    alternateLocale: ["en_US"],
    // Idealnya ganti dengan gambar 1200x630 khusus (mis. /og-image.png) agar preview rapi.
    images: [{ url: "/me.jpeg", alt: `${profile.name} - AI Engineer & Automation Specialist` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/me.jpeg"],
  },
  robots: { index: true, follow: true },
  // Ikon dibaca otomatis oleh Next.js dari app/icon.png
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

// Structured data agar mesin pencari memahami profil ini sebagai seorang Person
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: "ERP AI Specialist",
  email: `mailto:${profile.email}`,
  worksFor: { "@type": "Organization", name: "PT Allure Industries" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Pendidikan Ganesha" },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "ERP Automation",
    "Robotic Process Automation",
    "Python",
    "Go",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // JSON-LD statis dari data kita sendiri, aman untuk di-inject.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

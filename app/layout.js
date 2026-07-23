import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ilham Designs | Freelance Graphic Designer",
  description:
    "Bringing ideas to life with creative design — logo design, social media posts, and graphic design by Mohamad Ilham.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-page text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

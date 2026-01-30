import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

export const pretendard = localFont({
  src: [
    {
      path: "../assets/fonts/pretendard/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

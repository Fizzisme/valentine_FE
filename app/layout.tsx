import type { Metadata } from "next";
import {  Playwrite_CA } from "next/font/google";
import "./globals.css";

const playwrite = Playwrite_CA({

});

export const metadata: Metadata = {
    title: "Valentine - for Julie",
    description: "Valentine Chat App",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={`    
          ${playwrite.className} 
          antialiased
        `}
        >
        {children}
        </body>
        </html>
    );
}

"use client";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from "react-redux";
import store from "./redux/store";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.chewy.com/favicon.ico" />
        <title>Pet Food, Products, Supplies at Low Prices - Free Shipping | Chewy.com</title>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

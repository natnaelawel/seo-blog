import "../styles/index.css";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "../context/auth";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const localTheme = localStorage.theme;
    const matched = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (matched) {
      if (localTheme === "dark") {
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
      }
    } else {
      if (localTheme === "dark") {
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.add("dark");
      } else if (localStorage.theme === "light") {
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add("light");
      }
    }
  }, []);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import { IconContext } from "react-icons";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => fetch(url).then(res => res.json()) }}
    >
      <IconContext.Provider
        value={{
          style: { verticalAlign: "middle" },
          className: "react-icons",
        }}
      >
        <ThemeProvider enableSystem={true} attribute="class" clas>
          <Component {...pageProps} />
        </ThemeProvider>
      </IconContext.Provider>
    </SWRConfig>
  );
}

export default MyApp;

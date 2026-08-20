import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        {/*
          Applies the stored theme before the browser paints anything. Without it the
          server's light-mode HTML paints first and useEffect flips it after hydration -
          which reads as a flash on most of the page, but as a genuinely broken render on
          the architecture plates, because their fills come from --plate-* custom
          properties and a plate is a large solid rectangle that inverts. Must stay
          blocking and inline; deferring it defeats the point.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=window.localStorage.getItem('theme');" +
              "var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;" +
              "if(d){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

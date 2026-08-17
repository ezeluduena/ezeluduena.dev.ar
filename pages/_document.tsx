import { Head, Html, Main, NextScript } from 'next/document';

const noFlashScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme) { theme = JSON.parse(theme); }
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    var locale = localStorage.getItem('locale');
    if (locale) { locale = JSON.parse(locale); }
    if (!locale) {
      locale = window.matchMedia('(prefers-language: en)').matches ? 'en' : 'es';
    }
    document.documentElement.lang = locale;
    window.__INITIAL_LOCALE = locale;
  } catch (e) {}
})();
`;

const Document = () => {
  return (
    <Html lang="es" suppressHydrationWarning>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

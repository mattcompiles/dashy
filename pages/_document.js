import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'bumbag-server';
import { InitializeColorMode } from 'bumbag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }
  render() {
    return (
      <html>
        <Head />
        <body>
          <style>{`
          #__next-prerender-indicator {
            display: none;
          }
          `}</style>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

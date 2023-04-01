import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;500;800&display=swap" 
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300&family=Roboto+Slab:wght@200;400;600&display=swap" rel="stylesheet"/>         
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"/>         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument



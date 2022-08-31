import { CssBaseline } from "@mui/material";
import Document, { Html, Head, Main, NextScript } from "next/document";

export class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)

        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />                </Head>
                <body>
                    <CssBaseline/>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
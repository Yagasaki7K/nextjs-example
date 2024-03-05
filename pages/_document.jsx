import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { NextSeo } from 'next-seo';
import { Toaster } from 'sonner';

export default class MyDocument extends Document {

    // Fast refresh with NextJS doesn't broken the CSS
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
    // Finish Here

    render() {
        return (
            <Html lang="pt-br">
                <NextSeo
                    title='Template'
                    description='Description'
                    canonical={`localhost:3000`}
                    openGraph={{
                        url: 'localhost:3000',
                        title: 'Template',
                        description: 'Description',
                        images: [
                            {
                                url: 'https://i.imgur.com/VoOogmx.png',
                                width: 460,
                                height: 460,
                                alt: 'Template',
                                type: 'image/jpeg' || 'image/png',
                            }
                        ],
                        siteName: 'Template',
                    }}
                    twitter={{
                        handle: '@Template',
                        site: '@Template',
                        cardType: 'summary_large_image',
                    }}
                />

                <Toaster richColors position="top-right" />

                <Head>
                    <meta name="keywords" content="" />

                    <meta name="author" content="Anderson 'Yagasaki' Marlon" />
                    <meta name="robots" content="index, follow" />
                    <link rel="shortcut icon" href="/logo.png" />
                    <meta property="og:locale" content="pt_BR" />

                    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

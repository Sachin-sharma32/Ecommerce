import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import store from "../app/store";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Script from "next/script";
import { StyledEngineProvider } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <div>
      <Head>
        <title>Shremz - {pageProps.title}</title>
        <link rel="icon" type="image/jpg" href={`/shremz.png`} />
        <meta name="description" content={`${pageProps.summery}`} />
        <meta name="keywords" content={pageProps.keywords} />
        <meta property="og:title" content={`TBFE - ${pageProps.title}`} />
        <meta property="og:description" content={`${pageProps.summery}`} />
        <meta property="og:type" content={`${pageProps.type}`} />
        <meta property="og:site_name" content="TheBlogForEverything" />
        <meta property="og:image" content={`${pageProps.image}`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image:alt" content={`${pageProps.title}`} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        {pageProps.id ? (
          <meta
            property="og:url"
            content={`https://yasa.vercel.app/post/${pageProps.id}`}
          />
        ) : (
          <meta
            property="og:url"
            content={`https://yasa.vercel.app/${pageProps.parameter}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Shremz" />
        <meta name="twitter:title" content={`${pageProps.title}`} />
        <meta name="twitter:description" content={`${pageProps.summery}`} />
        <meta name="twitter:image" content={`${pageProps.image}`} />
      </Head>
      {router.pathname === "/dashboard" ||
      router.pathname === "/register" ||
      router.pathname === "/signIn" ||
      router.pathname === "/forgotPassword" ||
      router.pathname.startsWith("/resetPasswrod") ? (
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <div className=" text-black tracking-wide overflow-hidden font-satoshi">
                <Navbar />
                <Component {...pageProps} />
              </div>
            </Provider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SessionProvider>
      ) : (
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <div className=" text-black tracking-wide overflow-hidden font-gilroy5">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </div>
            </Provider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SessionProvider>
      )}
    </div>
  );
}

export default MyApp;

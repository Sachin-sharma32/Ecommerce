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

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const queryClient = new QueryClient();
    if (router.pathname === "/dashboard" || router.pathname === '/register' || router.pathname === '/signIn' || router.pathname === '/forgotPassword' || router.pathname.startsWith('/resetPasswrod')) {
        return (
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <div className=" text-gray-600 tracking-wide overflow-hidden">
                            <Navbar />
                            <Component {...pageProps}/>
                        </div>
                    </Provider>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </SessionProvider>
        );
    } else {
        return (
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <div className=" text-gray-600 tracking-wide overflow-hidden">
                            <Navbar />
                            <Component {...pageProps} />
                            <Footer />
                        </div>
                    </Provider>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </SessionProvider>
        );
    }
}

export default MyApp;

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import store from "../app/store";
import { Provider } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const queryClient = new QueryClient();
    if (router.pathname === "/dashboard") {
        return (
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <>
                            <Head>
                                <title>Myntra - shop your dreams</title>
                                <meta
                                    name="description"
                                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                />
                            </Head>
                        </>
                        <>
                            <Navbar />
                            <Component {...pageProps} />
                        </>
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
                        <>
                            <Head>
                                <title>Myntra - shop your dreams</title>
                                <meta
                                    name="description"
                                    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                />
                            </Head>
                        </>
                        <>
                            <Navbar />
                            <Component {...pageProps} />
                            <Footer />
                        </>
                    </Provider>
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </SessionProvider>
        );
    }
}

export default MyApp;

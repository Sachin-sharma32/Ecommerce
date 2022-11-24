import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import store from "../app/store";
import { Provider } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const queryClient = new QueryClient();
    if (router.pathname === "/dashboard") {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Navbar />
                    <Component {...pageProps} />
                </Provider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        );
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </Provider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        );
    }
}

export default MyApp;

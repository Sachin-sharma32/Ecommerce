import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";
import React, { useState } from "react";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/smooth";
import Head from "next/head";
import CategoryBar from "../components/CategoryBar";
import Collections from "../components/Collections";
import Testimonials from "../components/Testimonials";
import Practice from "../components/Practice";

export default function Home() {
    return (
        <Smooth className="min-h-screen home p-2">
            <Head>
                <title>Myntra - shop your dreams</title>
                <link rel="icon" type="image/png" href="https://images.indianexpress.com/2021/01/myntra.png" />
                <meta
                    name="description"
                    content="The only online store you will need to fulfill all your needs"
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Myntra - shop your dreams" />
                <meta name="twitter:description" content="The only online store you will need to fulfill all your needs. Let your dreams come true." />
                <meta name="twitter:image" content="https://images.indianexpress.com/2021/01/myntra.png" />
            </Head>
            <ErrorBoundry>
                <CategoryBar />
            </ErrorBoundry>
            <ErrorBoundry>
                <Header />
            </ErrorBoundry>
            <ErrorBoundry>
                <Collections />
            </ErrorBoundry>
            <ErrorBoundry>
                <Testimonials />
            </ErrorBoundry>
            <ErrorBoundry>
                <Newsletter />
            </ErrorBoundry>
            <Practice />
        </Smooth>
    );
}

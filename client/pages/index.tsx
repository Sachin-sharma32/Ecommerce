import Header from "../components/Header";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";
import { useState } from "react";
import ErrorBoundry from "../utils/ErrorBoundry";

export default function Home() {
    return (
        <div className=" bg-blue-50 min-h-screen overflow-x-hidden home">
            <ErrorBoundry>
                <Header />
            </ErrorBoundry>
            <ErrorBoundry>
                <Categories />
            </ErrorBoundry>
            <ErrorBoundry>
                <ProductList limit={true} />
            </ErrorBoundry>
            <ErrorBoundry>
                <Newsletter />
            </ErrorBoundry>
        </div>
    );
}

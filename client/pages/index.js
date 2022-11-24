import Header from "../components/Header";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";

export default function Home() {
    return (
        <div className=" bg-blue-50 min-h-screen overflow-x-hidden home">
            <Header />
            <Categories />
            <ProductList limit={true} />
            <Newsletter />
        </div>
    );
}

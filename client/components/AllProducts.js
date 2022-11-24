import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Edit from "./Edit";
import { useDeleteProduct, useGetProducts } from "../hooks/useProduct";
import Spinner from "../utils/spinner";
import SuccessModel from "../utils/successModel";
import { NoAdultContentOutlined } from "@mui/icons-material";
import { useGetCart, useRemoveFromCart } from "../hooks/useCart";

const AllProducts = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(NoAdultContentOutlined);

    const user = useSelector((state) => state.auth.user);
    const { data: cart } = useGetCart(user?._id);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 1000);
    }, [show]);

    const { mutate: deleteProduct } = useDeleteProduct();

    const onSuccess = (data) => {
        deleteProduct(data.data.data.product.product);
    };

    const { mutate: removeFromCart, data } = useRemoveFromCart(
        cart?._id,
        onSuccess
    );

    const removeFromCartAndDelete = (productId) => {
        const deletedProduct = cart?.products.filter((item) => {
            return item.product?._id == productId;
        });
        if (deletedProduct?.length === 1) {
            removeFromCart(
                deletedProduct[0].product._id,
                deletedProduct[0].quantity
            );
        } else if (deletedProduct?.length !== 1) {
            deleteProduct(productId);
        }
    };

    const { data: products } = useGetProducts();

    return (
        <div>
            {show && <SuccessModel text={message} />}
            {products ? (
                <div className=" relative mt-10">
                    <table className=" w-full items-center text-center">
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        {products.map((product, index) => (
                            <tr className=" mt-4" key={product._id}>
                                <td>{product.title}</td>
                                <td className=" flex justify-center">
                                    {product.img && (
                                        <img
                                            src={product.img}
                                            width={100}
                                            height={50}
                                        />
                                    )}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        className=" mr-4"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                        }}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() =>
                                            removeFromCartAndDelete(product._id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                    {selectedProduct && (
                        <Edit
                            product={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                        />
                    )}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default AllProducts;

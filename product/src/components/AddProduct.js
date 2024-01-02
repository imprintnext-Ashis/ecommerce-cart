// AddProduct.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/Action';
import ProductList from './ProductList';
import Button from './Button';

export default function AddProduct() {
    const dispatch = useDispatch();
    const [disable,setdisable]=useState(true)
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const[stock,setStock]=useState(1);
    const [Desc,setDesc]=useState("")

    const handleAddProduct = () => {
        if (!productName) {
            alert("enter product name")
        }
        if (!price) {
            alert("enter product price")
        }
        if (!image) {
            alert('Please select an image.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageBase64 = reader.result;
            const newProduct = {
                id: new Date().getTime(),
                name: productName,
                price: parseFloat(price),
                stock:stock,
                description:Desc,
                image: imageBase64,
            };

            dispatch(addProduct(newProduct));
            setProductName('');
            setPrice('');
            setdisable(!disable)
            setImage(null);
        };

        if (image instanceof Blob) {
            reader.readAsDataURL(image);
        } else {
            alert('Invalid image file.');
        }
    };


    const clearbutton = () => {
        setProductName('');
        setPrice('');
        setImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;

        // Check if the input is a valid number (allowing for decimals)
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setPrice(inputValue);
        }
    };
    const stockhandel = (e) => {
        const inputValue = e.target.value;

        // Check if the input is a valid number (allowing for decimals)
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setStock(inputValue);
        }
    };

    return (

        <>

            <div className="d-flex justify-content-center align-items-center">
                <Button
                disable={disable}
                setdisable={setdisable}
                />
            </div>

            {disable ? null : (

            <div className="container mt-4" >
                <h2>Add Product</h2>
                <>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Product Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Enter product Description"
                            value={Desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Enter price"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Stock" className="form-label">Stock</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Stock"
                            placeholder="Enter price"
                            value={stock}
                            onChange={stockhandel}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Image" className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="Image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mr-2m mx-3"
                        onClick={handleAddProduct}
                    >Add</button>
                    <button
                        type="button"
                        className="btn btn-secondary mx-3"
                        onClick={clearbutton}
                    >Clear</button>
                </>
             
            </div>
            )}

            {
                disable?<ProductList />:null
            }
               
        </>
    );
}

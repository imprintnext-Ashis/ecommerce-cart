
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, clearCart, updateCartItemQuantity } from '../store/AddtoCart';
// import { selectAllProducts } from '../store/Action';

const CartList = (props) => {
    const cartItems = useSelector(selectCartItems);
    // const productquantity=useSelector(selectAllProducts);
    const dispatch = useDispatch();
    const { setViewingCart, isViewingCart } = props;

    const removeCartItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleGoBack = () => {
        setViewingCart(!isViewingCart);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    };

    // Calculate total price and total quantity
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="container mt-4">
            <button
                className='btn btn-success'
                onClick={handleClearCart}
            >
                Clear Cart
            </button>
            <h2>Shopping Cart</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.image && typeof item.image === 'string' ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                ) : item.image instanceof Blob ? (
                                    <img
                                        src={URL.createObjectURL(item.image)}
                                        alt={item.image}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                ) : null}
                            </td>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <div className="quantity-input">
                                    <button

                                        className='btn btn-outline-secondary'
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type='text'
                                        className="quantity-value"
                                        style={{
                                            width: '59px',
                                            textAlign: 'center'
                                        }}
                                        value={item.quantity > 1 ? (item.quantity > item.stock ? item.stock : item.qu) : 1}
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value, 10) || 1;
                                            handleQuantityChange(item.id, newQuantity);
                                        }}
                                    />
                                    <button
                                        className='btn btn-outline-secondary'
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        disabled={item.quantity >=item.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => removeCartItem(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan="3"></td>
                        <td>
                            <strong>Total Quantity:</strong>
                        </td>
                        <td>
                            <strong>{totalQuantity}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3"></td>
                        <td>
                            <strong>Total:</strong>
                        </td>
                        <td>
                            <strong>${totalPrice.toFixed(2)}</strong>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <button className='btn btn-warning' onClick={handleGoBack}>
                Back
            </button>
        </div>
    );
};

export default CartList;

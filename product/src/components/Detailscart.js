import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/AddtoCart';
import "../index.css"
const Detailscart = ({ product, onCancel }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const[stock,setstock]=useState()
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        stock
      })
    );
    onCancel(); // Close the popup on successful add to cart
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div className="card">
          <div className="card-header">
            <h2>Add to Cart</h2>
            {/* <button type="button" className="close" onClick={onCancel}>
              &times;
            </button> */}
          </div>
          <div className="card-body">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid mb-3"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
            <p className="card-title">{product.name}</p>
            <p className="card-text">${product.price.toFixed(2)}</p>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const enteredValue = parseInt(e.target.value, 10);
                setQuantity(enteredValue > 0 ? (enteredValue>product.stock?product.stock:enteredValue): 1);
                setstock(product.stock)
              }}
              min="1"
              className="form-control mb-3"
            />

          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailscart;

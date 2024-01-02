import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts, deleteProduct } from '../store/Action';
import Detailscart from './Detailscart';
import CartList from './CartList';
import { selectCartItems } from '../store/AddtoCart';

export default function ProductList() {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const [isViewingCart, setViewingCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cartItems = useSelector(selectCartItems);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleViewCart = () => {
    setViewingCart(true);
  };

  const handleAddToCartConfirm = () => {
    setSelectedProduct(null); 
  };

  const handleAddToCartCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      {isViewingCart ? (
        <CartList isViewingCart={isViewingCart} setViewingCart={setViewingCart} />
      ) : (
        <div>
          {products && Object.keys(products).length > 0 ? (
            <>
                <div className='cart'>


<span className="material-symbols-outlined"

    onClick={handleViewCart}
    disabled={isViewingCart}
>
    <p className='p'>{cartItems.length}</p>
    shopping_cart
</span>

</div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.image && typeof product.image === 'string' ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : product.image instanceof Blob ? (
                          <img
                            src={URL.createObjectURL(product.image)}
                            alt={product.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : null}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price.toFixed(2)}</td>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => handleDelete(product.id)}
                          disabled={isViewingCart}
                        >
                          Delete
                        </button>
                        <button
                          className='btn btn-warning mx-2'
                          onClick={() => handleAddToCart(product)}
                          disabled={isViewingCart}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selectedProduct && (
                <Detailscart
                  product={selectedProduct}
                  onAddToCart={handleAddToCartConfirm}
                  onCancel={handleAddToCartCancel}
                />
              )}
            </>
          ) : (
            <div>No products available.</div>
          )}
        </div>
      )}
    </div>
  );
}

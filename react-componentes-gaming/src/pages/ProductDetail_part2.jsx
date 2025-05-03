import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const allProducts = [
  // Placas base
  {
    id: 'm-1',
    name: 'ASUS A68HM-PLUS',
    price: 40.0,
    images: [
      '/images/A68HM.jpg',
      '/images/A68HM-2.jpg',
      '/images/A68HM-3.jpg',
    ],
    description: 'Affordable motherboard with essential features for budget builds.',
    inStock: true,
  },
  {
    id: 'm-2',
    name: 'Gigabyte H510M H 1200',
    price: 120.0,
    images: [
      '/images/H510M-H_800.jpg',
      '/images/H510M-H_800-2.jpg',
      '/images/H510M-H_800-3.jpg',
    ],
    description: 'Reliable motherboard with good connectivity options.',
    inStock: true,
  },
  {
    id: 'm-3',
    name: 'Gigabyte A320M S2H',
    price: 75.0,
    images: [
      '/images/GA-A320M-S2H_800.jpg',
      '/images/GA-A320M-S2H_800-2.jpg',
      '/images/GA-A320M-S2H_800-3.jpg',
    ],
    description: 'Compact motherboard suitable for small form factor builds.',
    inStock: false,
  },
  {
    id: 'm-4',
    name: 'Asus PRIME B450M',
    price: 110.0,
    images: [
      '/images/Motherboard-Asus-PRIME-B450M-A-II.jpg',
      '/images/Motherboard-Asus-PRIME-B450M-A-II-2.jpg',
      '/images/Motherboard-Asus-PRIME-B450M-A-II-3.jpg',
    ],
    description: 'Feature-rich motherboard with solid build quality.',
    inStock: true,
  },
];

const ProductDetail_part2 = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <section className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </section>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = () => {
    const productWithFirstImageOnly = {
      ...product,
      images: [product.images[0]],
    };
    addToCart(productWithFirstImageOnly);
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="carousel">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} image ${currentImageIndex + 1}`}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <div className="carousel-controls mt-2">
                <button className="btn btn-outline-primary me-2" onClick={handlePrevImage}>
                  {'<'} Anterior
                </button>
                <button className="btn btn-outline-primary" onClick={handleNextImage}>
                  Siguiente {'>'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="fw-bolder">{product.name}</h2>
            <p className="lead">${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <p>
              {product.inStock ? (
                <span className="text-success fw-bold">En stock</span>
              ) : (
                <span className="text-danger fw-bold">Sin stock</span>
              )}
            </p>
            <p className="text-primary fw-semibold">Envío gratis</p>
            <p className="text-primary fw-semibold">Garantía de 12 meses</p>
            <button
              className="btn btn-outline-dark mt-3"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Agregar al carrito
            </button>
            <div className="mt-3">
              <Link to="/cart" className="btn btn-primary">
                Ver carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail_part2;

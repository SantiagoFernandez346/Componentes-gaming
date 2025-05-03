import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/css/productDetail.css';

const allProducts = [
  {
    id: 'v-1',
    name: 'Radeon Rx 580 8gb Gddr5',
    price: 850.0,
    images: [
      '/images/rx580.jpg',
      '/images/rx580-2.jpg',
      '/images/rx580-3.jpg',
    ],
    description: 'A powerful and affordable graphics card for gaming and multimedia.',
    inStock: true,
  },
  {
    id: 'v-2',
    name: 'Asrock Radeon RX 6700 XT 12GB GDDR6 Phantom Gaming D',
    price: 1400.0,
    images: [
      '/images/6700 XT.jpg',
      '/images/6700 XT-2.jpg',
      '/images/6700 XT-3.jpg',
    ],
    description: 'High-end graphics card with excellent performance for modern games.',
    inStock: false,
  },
  {
    id: 'v-3',
    name: 'Zotac GeForce GTX 1650 4GB GDDR6 OC',
    price: 570.0,
    images: [
      '/images/zotac.jpg',
      '/images/zotac-2.jpg',
      '/images/zotac-3.jpg',
    ],
    description: 'Compact and efficient GPU suitable for budget gaming builds.',
    inStock: true,
  },
  {
    id: 'v-4',
    name: 'EVGA GeForce RTX 3060 12GB GDDR6 XC',
    price: 1300.0,
    images: [
      '/images/3060.jpg',
      '/images/3060-2.jpg',
      '/images/3060-3.jpg',
    ],
    description: 'Mid-range GPU with ray tracing support and solid performance.',
    inStock: true,
  },
  {
    id: 'p-1',
    name: 'Intel Core i7-10700F',
    price: 300.0,
    images: [
      '/images/micro-intel-core-i7-10700f-0.jpg',
      '/images/micro-intel-core-i7-10700f-1.jpg',
      '/images/micro-intel-core-i7-10700f-2.jpg',
    ],
    description: '8-core processor with high clock speeds for gaming and productivity.',
    inStock: true,
  },
  {
    id: 'p-2',
    name: 'Intel Core i5',
    price: 200.0,
    images: [
      '/images/inteli5.jpg',
      '/images/inteli5-2.jpg',
      '/images/inteli5-3.jpg',
    ],
    description: 'Balanced mid-range CPU suitable for most users and gamers.',
    inStock: true,
  },
  {
    id: 'p-3',
    name: 'AMD Ryzen 5',
    price: 250.0,
    images: [
      '/images/procesadores-8.jpg',
      '/images/procesadores-8-2.jpg',
      '/images/procesadores-8-3.jpg',
    ],
    description: 'Popular processor with excellent multi-threaded performance.',
    inStock: false,
  },
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

const ProductDetail = () => {
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

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="carousel">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name + ' image ' + (currentImageIndex + 1)}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
              <div className="carousel-controls mt-2">
                <button className="btn btn-outline-primary me-2" onClick={handlePrevImage}>
                  &lt; Anterior
                </button>
                <button className="btn btn-outline-primary" onClick={handleNextImage}>
                  Siguiente{'>'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-detail-info">
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
                className="btn btn-outline-dark mt-3 btn-add-cart"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                Agregar al carrito
              </button>
              <div className="mt-3">
                <Link to="/cart" className="btn btn-primary btn-view-cart">
                  Ver carrito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

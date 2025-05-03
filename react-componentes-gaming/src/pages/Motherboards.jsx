import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const motherboards = [
  {
    id: 'm-1',
    name: 'ASUS A68HM-PLUS',
    price: 40.0,
    image: '/images/A68HM.jpg',
  },
  {
    id: 'm-2',
    name: 'Gigabyte H510M H 1200',
    price: 120.0,
    image: '/images/H510M-H_800.jpg',
    salePrice: 150.0,
  },
  {
    id: 'm-3',
    name: 'Gigabyte A320M S2H',
    price: 75.0,
    image: '/images/GA-A320M-S2H_800.jpg',
    salePrice: 100.0,
  },
  {
    id: 'm-4',
    name: 'Asus PRIME B450M',
    price: 110.0,
    image: '/images/Motherboard-Asus-PRIME-B450M-A-II.jpg',
  },
];

const Motherboards = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (board) => {
    console.log('Add to cart clicked for:', board);
    addToCart(board);
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {motherboards.map((board) => (
            <div className="col mb-5" key={board.id}>
              <div className="card h-100" data-id={board.id} data-name={board.name} data-price={board.price} data-image={board.image}>
                {board.salePrice && (
                  <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                    Oferta
                  </div>
                )}
                <Link to={`/product/${board.id}`}>
                  <img className="card-img-top" src={board.image} alt={board.name} />
                </Link>
                <div className="card-body p-4">
                  <div className="text-center">
                    <Link to={`/product/${board.id}`} className="text-decoration-none text-dark">
                      <h5 className="fw-bolder">{board.name}</h5>
                    </Link>
                    {board.salePrice ? (
                      <>
                        <span className="text-muted text-decoration-line-through">${board.salePrice.toFixed(2)}</span> ${board.price.toFixed(2)}
                      </>
                    ) : (
                      <>${board.price.toFixed(2)}</>
                    )}
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button className="btn btn-outline-dark mt-auto" onClick={() => handleAddToCart(board)}>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Motherboards;

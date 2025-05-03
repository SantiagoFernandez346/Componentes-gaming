import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const videoCards = [
  {
    id: 'v-1',
    name: 'Radeon Rx 580 8gb Gddr5',
    price: 850.0,
    image: '/images/rx580.jpg',
  },
  {
    id: 'v-2',
    name: 'Asrock Radeon RX 6700 XT 12GB GDDR6 Phantom Gaming D',
    price: 1400.0,
    image: '/images/6700 XT.jpg',
    salePrice: 1500.0,
  },
  {
    id: 'v-3',
    name: 'Zotac GeForce GTX 1650 4GB GDDR6 OC',
    price: 570.0,
    image: '/images/zotac.jpg',
    salePrice: 600.0,
  },
  {
    id: 'v-4',
    name: 'EVGA GeForce RTX 3060 12GB GDDR6 XC',
    price: 1300.0,
    image: '/images/3060.jpg',
  },
];

const VideoCards = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {videoCards.map((card) => (
            <div className="col mb-5" key={card.id}>
              <div className="card h-100" data-id={card.id} data-name={card.name} data-price={card.price} data-image={card.image}>
                {card.salePrice && (
                  <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                    Oferta
                  </div>
                )}
                <Link to={`/product/${card.id}`}>
                  <img className="card-img-top" src={card.image} alt={card.name} />
                </Link>
                <div className="card-body p-4">
                  <div className="text-center">
                    <Link to={`/product/${card.id}`} className="text-decoration-none text-dark">
                      <h5 className="fw-bolder">{card.name}</h5>
                    </Link>
                    {card.salePrice ? (
                      <>
                        <span className="text-muted text-decoration-line-through">${card.salePrice.toFixed(2)}</span> ${card.price.toFixed(2)}
                      </>
                    ) : (
                      <>{`$${card.price.toFixed(2)}`}</>
                    )}
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button className="btn btn-outline-dark mt-auto" onClick={() => addToCart(card)}>
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

export default VideoCards;

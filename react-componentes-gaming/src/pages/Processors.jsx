import React from 'react';
import { useCart } from '../context/CartContext';

const processors = [
  {
    id: 'p-1',
    name: 'Intel Core i7-10700F',
    price: 300.0,
    image: '/images/micro-intel-core-i7-10700f-0.jpg',
  },
  {
    id: 'p-2',
    name: 'Intel Core i5',
    price: 200.0,
    image: '/images/inteli5.jpg',
  },
  {
    id: 'p-3',
    name: 'AMD Ryzen 5',
    price: 250.0,
    image: '/images/procesadores-8.jpg',
  },
];

const Processors = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {processors.map((processor) => (
            <div className="col mb-5" key={processor.id}>
              <div className="card h-100" data-id={processor.id} data-name={processor.name} data-price={processor.price} data-image={processor.image}>
                <img className="card-img-top" src={processor.image} alt={processor.name} />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">{processor.name}</h5>
                    <span>${processor.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <button className="btn btn-outline-dark mt-auto" onClick={() => addToCart(processor)}>
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

export default Processors;

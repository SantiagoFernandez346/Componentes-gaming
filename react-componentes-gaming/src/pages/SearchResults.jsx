import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const allProducts = [
  {
    id: 'v-1',
    name: 'Radeon Rx 580 8gb Gddr5',
    price: 850.0,
    images: ['/images/rx580.jpg'],
    description: 'A powerful and affordable graphics card for gaming and multimedia.',
    inStock: true,
  },
  {
    id: 'v-2',
    name: 'Asrock Radeon RX 6700 XT 12GB GDDR6 Phantom Gaming D',
    price: 1400.0,
    images: ['/images/6700 XT.jpg'],
    description: 'High-end graphics card with excellent performance for modern games.',
    inStock: false,
  },
  {
    id: 'v-3',
    name: 'Zotac GeForce GTX 1650 4GB GDDR6 OC',
    price: 570.0,
    images: ['/images/zotac.jpg'],
    description: 'Compact and efficient GPU suitable for budget gaming builds.',
    inStock: true,
  },
  {
    id: 'v-4',
    name: 'EVGA GeForce RTX 3060 12GB GDDR6 XC',
    price: 1300.0,
    images: ['/images/3060.jpg'],
    description: 'Mid-range GPU with ray tracing support and solid performance.',
    inStock: true,
  },
  {
    id: 'p-1',
    name: 'Intel Core i7-10700F',
    price: 300.0,
    images: ['/images/micro-intel-core-i7-10700f-0.jpg'],
    description: '8-core processor with high clock speeds for gaming and productivity.',
    inStock: true,
  },
  {
    id: 'p-2',
    name: 'Intel Core i5',
    price: 200.0,
    images: ['/images/inteli5.jpg'],
    description: 'Balanced mid-range CPU suitable for most users and gamers.',
    inStock: true,
  },
  {
    id: 'p-3',
    name: 'AMD Ryzen 5',
    price: 250.0,
    images: ['/images/procesadores-8.jpg'],
    description: 'Popular processor with excellent multi-threaded performance.',
    inStock: false,
  },
  {
    id: 'm-1',
    name: 'ASUS A68HM-PLUS',
    price: 40.0,
    images: ['/images/A68HM.jpg'],
    description: 'Affordable motherboard with essential features for budget builds.',
    inStock: true,
  },
  {
    id: 'm-2',
    name: 'Gigabyte H510M H 1200',
    price: 120.0,
    images: ['/images/H510M-H_800.jpg'],
    description: 'Reliable motherboard with good connectivity options.',
    inStock: true,
  },
  {
    id: 'm-3',
    name: 'Gigabyte A320M S2H',
    price: 75.0,
    images: ['/images/GA-A320M-S2H_800.jpg'],
    description: 'Compact motherboard suitable for small form factor builds.',
    inStock: false,
  },
  {
    id: 'm-4',
    name: 'Asus PRIME B450M',
    price: 110.0,
    images: ['/images/Motherboard-Asus-PRIME-B450M-A-II.jpg'],
    description: 'Feature-rich motherboard with solid build quality.',
    inStock: true,
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="py-5">
      <div className="container">
        <h2>Resultados de búsqueda para: "{searchTerm}"</h2>
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.images[0]}
                    className="card-img-top"
                    alt={product.name}
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;

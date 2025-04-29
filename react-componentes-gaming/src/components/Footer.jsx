import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-light py-3 mt-auto">
      <div className="footer__content container-fluid">
        <h5 className="paraTransicion">ComponentesGaming</h5>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis ullam expedita minus sed
        </p>
        <ul className="footer__redes list-inline">
          <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
          <li className="list-inline-item"><a href="#"><i className="fab fa-twitter"></i></a></li>
        </ul>
      </div>
      <div className="footer__bottom">
        <p>copyright &copy;2021 ComponentesGaming designed by Santiago Fernandez</p>
      </div>
    </footer>
  );
};

export default Footer;

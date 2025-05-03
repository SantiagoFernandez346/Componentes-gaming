import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-light py-3 mt-auto">
      <div className="footer__content container-fluid">
        <h5 className="paraTransicion">ComponentesGaming</h5>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab reiciendis ullam expedita minus sed
        </p>
        <ul className="footer__redes list-inline">
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__bottom">
        <p>copyright &copy;2021 ComponentesGaming designed by Santiago Fernandez</p>
      </div>
    </footer>
  );
};

export default Footer;

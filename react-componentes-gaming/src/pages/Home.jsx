import React from 'react';

const Home = () => {
  return (
    <>
      <section className="noticias row">
        <aside
          className="noticias__aside col-lg-8 offset-lg-2 p-3 bg-dark rounded shadow-sm"
          role="complementary"
          aria-label="Noticias sobre computacion"
        >
          <h2 className="text-light mb-3">Noticias</h2>
          <p className="news-item text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dignissimos, exercitationem magnam voluptatibus cupiditate sequi iusto esse ipsum eligendi neque. Possimus atque ut sunt eaque tempore dicta vero odio pariatur?
          </p>
          <p className="news-item text-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea ipsa error cumque impedit, quas harum nobis nisi accusantium illum fugit vel dolorem quis facilis delectus beatae vitae recusandae ipsum.
          </p>
          <p className="news-item text-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis mollitia officia sit similique deserunt tempora, omnis, quo reprehenderit dolorem inventore ipsam facere ex veritatis cum repudiandae, deleniti molestiae quis error!
          </p>
        </aside>
      </section>
      <section aria-label="Patrocinadores" className="my-5">
  <div id="carouselExampleIndicators" className="carousel slide rounded shadow-sm" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="false">
    <div className="carousel-inner rounded">
      <div className="carousel-item active">
        <img src="/images/AMD.jpg" className="d-block w-100" alt="Logo de AMD" />
      </div>
      <div className="carousel-item">
        <img src="/images/intel.jpg" className="d-block w-100" alt="Logo de Intel" />
      </div>
      <div className="carousel-item">
        <img src="/images/NVIDIA.jpg" className="d-block w-100" alt="Logo de Nvidia" />
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;


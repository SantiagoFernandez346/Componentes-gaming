import React from 'react';

const Contact = () => {
  return (
    <section className="form">
      <h2>Contactanos</h2>
      <form>
        <div className="form__nombre">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />
        </div>
        <div className="form__experiencia">
          <label htmlFor="experiencia">Experiencia:</label>
          <select id="experiencia" name="experiencia">
            <option value="">Seleccione</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>
        <div className="form__mas">
          <label htmlFor="comentarios">Comentarios:</label>
          <textarea id="comentarios" name="comentarios"></textarea>
        </div>
        <div className="form__terminos">
          <input type="checkbox" id="terminos" name="terminos" />
          <label htmlFor="terminos">Acepto los términos y condiciones</label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Enviar</button>
          <input type="reset" value="Limpiar" className="btn btn-secondary" />
        </div>
      </form>
    </section>
  );
};

export default Contact;

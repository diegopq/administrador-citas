import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //crear el state de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //state de error
  const [error, actualizarError] = useState(false);

  //funcion que se ejecuta cada que el usuario escribe en un input
  const actualizarState = (event) => {
    actualizarCita({
      ...cita,
      [event.target.name]: event.target.value,
    });
  };

  //extraer valores de cita
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //cuando el usuario presiona el boton de reservar cita
  const submitCita = (event) => {
    event.preventDefault(); //evita que los datos se manden por el metodo get que los pone en la url

    //validar el forms
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("algun campo vacio");
      actualizarError(true);
      return;
    }

    //si hay un mensaje de error activo se elimina ya que en este punto se paso la validacion
    if (error) {
      actualizarError(false);
    }

    //asignar un id a la cita
    cita.id = uuidv4();
    //console.log(cita);

    //crear la cita
    crearCita(cita);

    //reiniciar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  //lo que se va a ver por pantalla
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {/* Muestra el mensaje de error en caso de que el estado error sea true */}
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Bruno"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Juan Peréz"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Reservar
        </button>
      </form>
    </Fragment>
  );
};

//documentar el componente indicando los tipos de los parametros que recibe y si hay algun error lo muestra por consola
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;

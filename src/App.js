import React, { Fragment, useState, useEffect } from "react";

import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //obtiene las citas que esten en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    //si no hay citas iniciales inicia como arreglo vacio
    citasIniciales = [];
  }

  //arreglo de citas, state principal
  const [citasArray, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar operaciones cuando el state cambia, se ejecuta cuando el componente esta listo o cuando hay cambios en el componente, para evitar que se ejecute multiples veces se le pasa como segundo parametro un arreglo vacio
  //para que este escuchando algun cambio en algun estado, el estado se le pasa dentro del arreglo del segundo parametro, de esta manera cada que cambie ese estado especifico se ejecuta la funcion
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      //si hay citas iniciales
      localStorage.setItem("citas", JSON.stringify(citasArray));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citasArray]);

  //funcion que obtiene las citas actuales y agrega una nueva
  const crearCita = (cita) => {
    guardarCitas([...citasArray, cita]);
  };

  //funcion para eliminar citas
  const eliminarCita = (id) => {
    const nuevoArray = citasArray.filter((cita) => cita.id !== id);
    guardarCitas(nuevoArray);
  };

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            {citasArray.length === 0 ? (
              <h2>No hay citas</h2>
            ) : (
              <h2>Administra tus citas</h2>
            )}

            {citasArray.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

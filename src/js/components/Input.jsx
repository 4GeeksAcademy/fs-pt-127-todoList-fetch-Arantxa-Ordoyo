import { useState } from "react";
import { FaTimes } from 'react-icons/fa'

export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const [lista, setLista] = useState([]);

  function addNewProduct(valor) {
    setLista((prev) => [...prev, valor]);
    setInputValue("");
  }
  function deleteNewProduct(index) {
    setLista(lista.filter((tarea,i) => i !== index))
  }

  return (
    <>
      <div className="card" style={{ width: '50%' }}>
        <div className="card-body">
          <div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { addNewProduct(e.target.value) } }}></input>
          </div>
          {
            lista.map((lista, index) => {
              return (
                <div key={index} className=" divInput row ">

                  <p className="col-9">{lista}</p>
                  <FaTimes className="col-3 iconX" onClick={(e) => deleteNewProduct(index)} ></FaTimes>

                </div>
              )
            })
          }

          {lista.length === 0 ? <p>No hay tareas, añadir tareas</p> : <p>tenemos {lista.length}</p>}
        </div>
      </div>
    </>
  )
}

/*Usuario escribe → onChange se activa → setInputValue(lo_nuevo) 
→ React re-renderiza → value muestra lo_nuevo */

/*vale "creo" los eventos como onclick onchange y onkeydown siempre necesitan recibir una funcion por
 eso hay que hacerlo con la flechita el setInputValue te actualiza/renderiza la pagina con el valor que tu
  le das en este caso con el valor que estas escribiendo que es e.target.value, y el value es el valor que
   tiene en ese momento es decir al principio es "" y luego sera lo que ponga en el e.targe.value no ? */

/* <input
        type="text"
        value={inputValue} // El valor del input es el estado 'nombre'
        onChange={manejarCambioNombre} // Llama a la función en cada cambio
        placeholder="Escribe tu nombre"
      />
      <p>Hola, {inputValue}!</p> {/* Muestra el nombre en tiempo real 
      
         const manejarCambioNombre = (e) => {
    setInputValue(e.target.value); // Actualiza el estado 'nombre' con lo que se escribe
  };*/
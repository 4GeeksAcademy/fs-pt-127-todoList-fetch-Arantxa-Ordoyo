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
    <div className="container">
      <div className="card" >
        <div className="card-body ">
          <div className="" >
            <input placeholder="What needs to be done?" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { addNewProduct(e.target.value) } }}></input>
          </div>
          {
            lista.map((lista, index) => {
              return (
                <div key={index} className=" divInput row  ">
                  <p className="  col-9">{lista}</p>
                  <FaTimes className="col-3 iconX" onClick={(e) => deleteNewProduct(index)} ></FaTimes>
                </div>
              )
            })
          }
          {lista.length === 0 ? <p>No hay tareas, añadir tareas</p> : <p>{lista.length}  item left</p>}
        </div>
      </div>
      </div>
    </>
  )
}


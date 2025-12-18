import { useState, useEffect } from "react";
import { FaTimes } from 'react-icons/fa'
import tareasServices from '../servicesJs/tareas';


export default function Input() {
  const [inputValue, setInputValue] = useState('');
  const [lista, setLista] = useState([]);

  const [loading, setLoading] = useState(true)
  //El use effect se ejecuta solo una vez cada vez que carga la pagina y llama a la API
  useEffect(() => {
    //El async dice que una funcion es asincrona para luego poder llamar a un await y
    //  poder esperar a que la operacion termine
    async function getTareas() {
      setLoading(true)
      //LLamamos a tareasServicesy getTareas para llamar al metodo 
      const tareasData = await tareasServices.getTareas()
      console.log(tareasData)
      //Le pasamos el array de la api a setlista
      setLista(tareasData.todos)
      setLoading(false)
    }
    //llamamos a la funcion 
    getTareas()
  }, [])


  async function addNewProduct(newTask) {
    //creamos una variable y le decimos el formato que queremos ademas le pasamos el nuevo input
    const newTaskFormated = { 'label': newTask, 'is_done': false }
    //LLamamos al metodo post para añadir una tarea
    const nuevaTarea = await tareasServices.postTareas(newTaskFormated)
    //le decimos que nos añada la nueva tarea en el array y que luego limpie el input
    setLista((prev) => [...prev, nuevaTarea]);
    setInputValue("");
  }

  //para eliminar le mandamos el indice 
  async function deleteNewProduct(index) {
    //LLamamos al metodo delete y le pasamos el indice 
    await tareasServices.deleteTareas(index)
    setLista((prev) => prev.filter((tarea) => tarea.id !== index))
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
              //ponemos el loading por si la pagina tarda en cargar
              loading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  {
                    //Ponemos el lista.lenght para que no recorra una array vacia
                    lista.length > 0 && lista.map((tarea) => (
                      <div key={tarea.id} className="divInput row">
                        <p className="col-9">{tarea.label}</p>
                        <FaTimes
                          className="col-3 iconX"
                          onClick={() => deleteNewProduct(tarea.id)}
                        />
                      </div>
                    ))}
                </>
              )}
            {lista.length === 0 ? <p>No hay tareas, añadir tareas</p> : <p>{lista.length}  item left</p>}
          </div>
        </div>
      </div>
    </>
  )
}


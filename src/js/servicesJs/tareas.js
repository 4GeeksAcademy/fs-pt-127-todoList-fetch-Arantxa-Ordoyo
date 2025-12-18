//Creamos los metodos para llamar a la api, el get coge los datos de usuario y solo le pasamos la url
// En el post le damos el formato de como queremos recibir los datos
// En el delete le pasamos la url y el id que queremos eliminar
async function getTareas() {
    const response = await fetch('https://playground.4geeks.com/todo/users/Arantxa')
    const data = await response.json()
    return data;
}

async function postTareas(newTask) {
    const response = await fetch('https://playground.4geeks.com/todo/todos/Arantxa',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/Json' },
            body: JSON.stringify(newTask)
        })

    const data = await response.json()
    return data;
}
async function deleteTareas(id) {
 const response= await fetch(`https://playground.4geeks.com/todo/todos/${id}`,
        {
            method: 'DELETE'         
        })

 return response
}
//Agrupamos las funciones y luego las exportamos 
const tareasServices = {
    getTareas,
    postTareas,
    deleteTareas
}
export default tareasServices;

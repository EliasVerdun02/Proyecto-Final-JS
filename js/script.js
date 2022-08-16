//Este programa es un siumulador de agenda para poder organizarse con distintas tareas. Indicando el nombre del evento,descripcion , la fecha y la hora.
//Funciones de interaccion:
//crearEvento(): Para crear un nuevo evento.
//eliminarEvento(evento a eliminar): Se le pasa como parametro el evento que deseamos eliminar y lo borra de nuestro array.
//buscarEvento(eventoBuscado): Se le pasa como parametro el evento que estamos buscando y este se mostrará en el dom. Abajo de los demas

const agenda =  []

let dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'] 

let mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] 

class Evento{
    constructor(nombre,descripcion,date){
        this.nombre = nombre
        this.descripcion = descripcion
        this.date = date
        this.fecha = `${dias[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} del ${date.getFullYear()} a las ${date.getHours()}:00 hs`
    }
}

//Dia de hoy
let today = document.querySelector('.date-today')
let date = new Date()
today.innerHTML = `<h1>${dias[date.getDay()]} ${date.getDate()} de ${mes[date.getMonth()]} del ${date.getFullYear()}</h1>`


//Agendo eventos
agenda.push(new Evento('Reunion laboral','Reunion sobre como mejorar el ambiente laboral',new Date(2022,8,12,13)))
agenda.push(new Evento('Salida familiar','Salida al parque',new Date(2022,10,11,16)))
agenda.push(new Evento('Medico','Turno para chequeo',new Date(2022,9,11,7)))
agenda.push(new Evento('Cumpleaños','fecha festiva',new Date(2022,12,27,22)))

//mostrar

const crearEventoHtml =(evento)=>{
    let eventoHtml = `
    <div class="evento">
        <ul>
            <li>${evento.nombre} </li>
            <li>${evento.descripcion} </li>
            <li>${evento.date} </li>
            <li>${evento.fecha} </li>
        </ul>
    </div>`

    return eventoHtml
}

const cargarEventos=()=>{
    let eventos = ''
    for(evento of agenda){
        eventos += crearEventoHtml(evento)
    }

    document.getElementById('eventos').innerHTML = eventos
}

cargarEventos()







//Funciones de interaccion

function crearEvento(){
    let respuesta = true
 
    while(respuesta){
    let date = new Date(prompt('Porfavor seleccione una fecha para el evento. Indicando primero el mes,despues el dia y luego el año. por ej: 8/11/2022)')
    )

    date.setHours(parseInt(prompt('A que horario?. Indicar solo la hora. por ej(14) en vez de 14:00')))

    let nombre = prompt('Nombre del evento')

    let descripcion = prompt('Descripcion')

    agenda.push(new Evento(nombre,descripcion,date))

    cargarEventos()

    respuesta = confirm('Desea agendar otro evento?')
   
}
}

const buscarEvento=(nombre)=>{
    let evento = agenda.find(evento => evento.nombre === nombre)

    let div = document.querySelector('.container-agenda')
    
    div.innerHTML += crearEventoHtml(evento)
    
}

const eliminarEvento=(nombre)=>{
    let index = agenda.findIndex(evento => evento.nombre === nombre)

    agenda.splice(index,1)

    cargarEventos()
}
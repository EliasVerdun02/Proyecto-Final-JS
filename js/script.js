//Simulador tipo Todo App:
//Por los 4 inputs se ingresan los datos del evento que el usario desea agendar. Una vez ingresado los datos , en el ultimo input apretar "Enter" y el evento se mostrara en el DOM.
//Cada evento agendado cuenta con una "X" para poder eliminar el evento si el usuario lo desea. A travez de la funcion eliminarEvento(id), y usando el id del evento para buscarlo.
//Faltan : Estilos, y ordenar el codigo 


const agenda =  []

let dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'] 

let mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] 

class Evento{

    static contadorEventos = 0;

    constructor(nombre,descripcion,date){
        this.nombre = nombre
        this.descripcion = descripcion
        this.date = date
        this.id = ++Evento.contadorEventos;
    }

    fecha(){
        return `${dias[this.date.getDay()]}, ${this.date.getDate()} de ${mes[this.date.getMonth()]} del ${this.date.getFullYear()} a las ${this.date.getHours()}:${(this.date.getMinutes() >= 10) ? this.date.getMinutes() : '0'+this.date.getMinutes()} hs`
    }

}



//Agendo eventos
function agendarEventos(){
    agenda.push(new Evento('Reunion laboral','Reunion sobre como mejorar el ambiente laboral',new Date(2022,8,12,13,12)))
    agenda.push(new Evento('Salida familiar','Salida al parque',new Date(2022,10,11,16)))
    agenda.push(new Evento('Medico','Turno para chequeo',new Date(2022,9,11,7)))
    agenda.push(new Evento('Cumpleaños','fecha festiva',new Date(2022,11,27,22)))
}

agendarEventos()

//Dia de hoy
let today = document.querySelector('.main__today')
let date = new Date()
today.innerHTML = `<h1>${dias[date.getDay()]} ${date.getDate()} de ${mes[date.getMonth()]} del ${date.getFullYear()}</h1>`


//mostrar
const crearEventoHtml =(evento)=>{
    let eventoHtml = `
    <div class="evento">
        <ul>
            <li>${evento.nombre} </li>
            <li>${evento.descripcion} </li>
            <li>${evento.fecha()} </li>
            <li class="eliminar-evento" onclick="eliminarEvento(${evento.id})">X</li>
        </ul>
    </div>`

    return eventoHtml
}

const cargarEventos=()=>{
    let eventos = ''
    for(evento of agenda){
        eventos += crearEventoHtml(evento)
    }

    document.querySelector('.eventos').innerHTML = eventos
}

cargarEventos()

//Tomar valores

let inputTime = document.querySelector(".main__container-input .input-time") 

inputTime.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        crearEvento()
    }
})


//Funciones de interaccion

function crearEvento(){
    let arrayInputs = document.querySelectorAll('.input')

    let fecha = new Date(arrayInputs[2].value)

    let numeroMes = fecha.getDate()
    
    let horario = arrayInputs[3].value
    let hora = parseInt(String(horario.substring(0,2))) 
    let min = parseInt(String(horario.substring(3,5)))
    
    fecha.setDate(numeroMes + 1)//Para indicar bien laa fecha del mes, de lo contrario indica una fecha menos por el horario universal
    fecha.setHours(hora,min)

    agenda.push(new Evento(arrayInputs[0].value,arrayInputs[1].value,fecha))

    cargarEventos()

    arrayInputs.forEach((input)=>{
        input.value = ''
    })
}


const eliminarEvento=(id)=>{
    console.log('probando funcion')
    let index = agenda.findIndex(evento => evento.id == id)

    agenda.splice(index,1)

    cargarEventos()
}


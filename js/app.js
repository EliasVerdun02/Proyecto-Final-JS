//Simulador tipo Todo App:
//Por los 4 inputs se ingresan los datos del evento que el usario desea agendar. Una vez ingresado los datos, en cada input se debe presionar "Enter" y el evento se mostrara en el DOM.
//Este simulador permite buscar el Evento por MES o por su NOMBRE. Tambien se pueden elminar los eventos que desea. Cada cambio realizado ya sea la entrada de un nuevo Evento o el descarte del mismo , se llamara a la funcion "guardarStorage".
//Faltan : Estilos, y mejor experiencia de usuario(notas editables, fecha de creacion, dias restantes para el evento,etc)

const generarEventos =()=>{
    agenda.push(new Evento('Reunion laboral','Reunion sobre como mejorar el ambiente laboral',new Date(2022,8,12,13,12))),
    agenda.push(new Evento('Visita al museo','Museo nacional artistico',new Date(2022,8,20,20,15))),
    agenda.push(new Evento('Salida familiar','Salida al parque',new Date(2022,10,11,16))),
    agenda.push(new Evento('Medico','Turno para chequeo',new Date(2022,9,11,7))),
    agenda.push(new Evento('Cumpleaños','fecha festiva',new Date(2022,11,27,22))),
    agenda.push(new Evento('Juntada con amigos','Plaza mitre',new Date(2022,9,12,22))),
    agenda.push(new Evento('Pool party','Casa de Juan',new Date(2023,0,2,11))),
    agenda.push(new Evento('Comeinzo universidad','CBC UBA',new Date(2023,02,14,13))),
    agenda.push(new Evento('Asado','En lo de Martin',new Date(2022,11,20,21))),
    agenda.push(new Evento('Fiesta de fin de año','Guemes',new Date(2022,11,31,19))),
    agenda.push(new Evento('CoderHouse','2da pre-entrega del proyecto final',new Date(2022,07,25,23,59)))

    guardarStorage("agendaStorage",agenda)
    cargarEventos(agenda)
}

document.querySelector(".eventos-prueba").addEventListener("click", generarEventos)

const cargarApp=()=>{
    recuperarStorage()
    diaDeHoy()
}

//Local Storage
const guardarStorage=(clave,valor)=>{
    localStorage.setItem(clave, JSON.stringify(valor))
}

const recuperarStorage=()=>{
    if(localStorage.getItem("agendaStorage") == null){
        cargarEventos(agenda)
    }else{
        let agendaRecuperada = [...(JSON.parse(localStorage.getItem("agendaStorage")))]

        agendaRecuperada.forEach(evento => {
            agenda.push(new Evento(evento.nombre, evento.descripcion, new Date(evento.date)))
        })
        cargarEventos(agenda)
    }
}


//Dia de hoy
const diaDeHoy=()=>{
    let today = document.querySelector('.main__today')
    today.innerHTML = `<h1>${dias[date.getDay()]} ${date.getDate()} de ${mes[date.getMonth()]} del ${date.getFullYear()}</h1>`
}

const crearEventoHtml =(evento)=>{
    let eventoHtml = `
    <div class="container__evento-nota">
        <ul class="evento-nota">
            <li class="evento-fecha"><span>${evento.fecha()}</span><i class='bx bxs-popsicle'></i></li>
           
            <div class="evento-info">
                <p class="evento-nombre">${evento.nombre} </p>
                <p class="evento-desc">${evento.descripcion} </p>
            </div>
            <li class="evento-time"><i class='bx bx-time'></i><span>${evento.time()}</span></li>
            <li class="eliminar-evento" onclick="eliminarEvento(${evento.id})"><i class='bx bx-trash-alt'></i></li>
        </ul>
    </div>`

    return eventoHtml
}

const cargarEventos=(agenda)=>{
    let eventos = ''
    for(evento of agenda){
        eventos += crearEventoHtml(evento)
    }

    if(eventos){
        document.querySelector('.eventos').innerHTML = eventos
    }else{
        document.querySelector('.eventos').innerHTML = 'No hay eventos agendados en el mes'
    }
}

const ajustarFechaHorario=(arrayInputs)=>{
    let fecha = new Date(arrayInputs[2].value)

    let horario = arrayInputs[3].value
    let numeroMes = fecha.getDate()
    let hora = parseInt(String(horario.substring(0,2))) 
    let min = parseInt(String(horario.substring(3,5)))
    

    fecha.setDate(numeroMes + 1)
    fecha.setHours(hora,min)

    return fecha
}

const verificarDatos=(valor)=>{
    if(valor == '' ){
        return false
    }else{
        return true
}
}
const crearEvento=()=>{
    let arrayInputs = document.querySelectorAll('.input')

    agenda.push(new Evento(arrayInputs[0].value,arrayInputs[1].value,ajustarFechaHorario(arrayInputs)))

    guardarStorage("agendaStorage",agenda)
    cargarEventos(agenda)

    arrayInputs.forEach((input)=>{
        input.value = ''
    })
}


const eliminarEvento=(id)=>{
    let index = agenda.findIndex(evento => evento.id == id)

    agenda.splice(index,1)
    
    cargarEventos(agenda)
    guardarStorage("agendaStorage" ,agenda)
}

document.querySelector(".select-mes").addEventListener("change", () => {
  let mes = document.querySelector(".select-mes").value;
  let inputBusqueda = document.querySelector(".input-busqueda");

  if (mes === "Todos") {
    cargarEventos(agenda);
    agendaMes = [];
    inputBusqueda.removeAttribute("disabled");
  } else {
    let eventos = agenda.filter((evento) => evento.fecha().includes(mes));

    agendaMes = [...eventos];
    cargarEventos(eventos);

    if (agendaMes.length) {
      inputBusqueda.removeAttribute("disabled");
    } else {
      inputBusqueda.setAttribute("disabled", "");
    }
  }
})

document.querySelector('.input-busqueda').addEventListener("keyup",e=>{

    let nombre = e.target.value.toLowerCase()

    if(agendaMes.length){
        
        let eventos = agendaMes.filter((evento)=> evento.nombre.toLowerCase().includes(nombre))

        cargarEventos(eventos)
        
    }else{
        let eventos = agenda.filter((evento)=> evento.nombre.toLowerCase().includes(nombre))
        cargarEventos(eventos)
    }
})

cargarApp()






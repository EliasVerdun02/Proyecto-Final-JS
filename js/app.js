//Simulador tipo Todo App:
//Por los 4 inputs se ingresan los datos del evento que el usario desea agendar. Una vez ingresado los datos, en cada input se debe presionar "Enter" y el evento se mostrara en el DOM.
//Este simulador permite buscar el Evento por MES o por su NOMBRE. Tambien se pueden elminar los eventos que desea. Cada cambio realizado ya sea la entrada de un nuevo Evento o el descarte del mismo , se llamara a la funcion "guardarStorage".
//Faltan : Estilos, y mejor experiencia de usuario(notas editables, fecha de creacion, dias restantes para el evento,etc)

const generarEventos =()=>{
    agenda.push(new Evento('Reunion laboral','Reunion sobre como mejorar el ambiente laboral',new Date(2022,8,12,13,12),1)),
    agenda.push(new Evento('Visita al museo','Museo nacional artistico',new Date(2022,8,20,20,15),2)),
    agenda.push(new Evento('Salida familiar','Salida al parque',new Date(2022,10,11,16),3)),
    agenda.push(new Evento('Medico','Turno para chequeo',new Date(2022,9,11,7),4)),
    agenda.push(new Evento('Cumpleaños','fecha festiva',new Date(2022,11,27,22),5)),
    agenda.push(new Evento('Juntada con amigos','Plaza mitre',new Date(2022,9,12,22),6)),
    agenda.push(new Evento('Pool party','Casa de Juan',new Date(2023,0,2,11),7)),
    agenda.push(new Evento('Comeinzo universidad','CBC UBA',new Date(2023,02,14,13),8)),
    agenda.push(new Evento('Asado','En lo de Martin',new Date(2022,11,20,21),9)),
    agenda.push(new Evento('Fiesta de fin de año','Guemes',new Date(2022,11,31,19),10)),
    agenda.push(new Evento('CoderHouse','2da pre-entrega del proyecto final',new Date(2022,07,25,23,59),11))

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
            agenda.push(new Evento(evento.nombre, evento.descripcion, new Date(evento.date),evento.id))
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
    <div class="container__evento-nota" data-id="${evento.id}">
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

const cargarEventos=(agendaPar)=>{
    let mes = document.querySelector(".select-mes").value;
    if(agendaPar == undefined){
        mes == 'Todos' ? agendaPar = [...agenda] : agendaPar = [...agendaMes]
    }
    let eventos = ''
    for(evento of agendaPar){
        eventos += crearEventoHtml(evento)
    }

    if(eventos){
        document.querySelector('.eventos').innerHTML = eventos
    }else{
        document.querySelector('.eventos').innerHTML = 'No hay eventos agendados en el mes'
    }
}

const ajustarFechaHorario=(dat,time)=>{
    let fecha = new Date(dat.value)

    let horario = time.value
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

const crearId=()=>{
    let numeroId = agenda[agenda.length - 1].id + 1
   
    return numeroId
}

const crearEvento=()=>{
    let arrayInputs = document.querySelectorAll('.input')

    const [name,desc,dat,time] = arrayInputs

    agenda.push(new Evento(name.value,desc.value,ajustarFechaHorario(dat,time),crearId()))

    guardarStorage("agendaStorage",agenda)
    cargarEventos(agenda)
    SortableFuncionesStore()

    arrayInputs.forEach((input)=>{
        input.value = ''
    })
}

const eliminarEvento=(id)=>{
    let index = agenda.findIndex(evento => evento.id == id)
    let index2 = agendaMes.findIndex(evento => evento.id == id)

    agenda.splice(index,1)    
    agendaMes.splice(index2,1)    

    cargarEventos()
    SortableFuncionesStore()
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

//Libreria para mover los eventos y tambien guardar su posicion
const eventos = document.getElementById("eventos")

const SortableFuncionesStore=()=>{
    Sortable.create(eventos, {
        animation: 250,
        chosenClass: "seleccionado",
        ghostClass: "fantasma",
        dragClass: "sortable-drag",
        group: "lista-eventos",

        store: {
            //guardamos el orden
            set: (sortable)=> {
                const orden = sortable.toArray();
                localStorage.setItem(sortable.options.group.name, orden.join('|'))
            },
            //Obtener el orden
            get: (sortable)=>{
                const orden = localStorage.getItem(sortable.options.group.name)
                return orden ? orden.split('|') : []
            }
        }
    })
}

SortableFuncionesStore()








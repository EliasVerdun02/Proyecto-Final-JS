class Evento{

    constructor(nombre,descripcion,date,id){
        this.nombre = nombre
        this.descripcion = descripcion
        this.date = date
        this.id = id
    }

    fecha(){
        return `${dias[this.date.getDay()]}, ${this.date.getDate()} de ${mes[this.date.getMonth()]} del ${this.date.getFullYear()}`
    }

    time(){
        return `${this.date.getHours()}:${(this.date.getMinutes() >= 10) ? this.date.getMinutes() : '0'+this.date.getMinutes()} hs`
    }

}

const agenda =  []

let eventosEliminados = []

let agendaStorage = []

let agendaMes = []

let dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'] 

let mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] 

let date = new Date()

let minDate = `${date.getFullYear()}-${(date.getMonth()+1 )>=10 ? (date.getMonth()+1) : '0'+ (date.getMonth()+1) }-${date.getDate()}`


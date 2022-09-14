let inputNombre = document.querySelector(".main__container-input .input-nombre") 
let inputDesc = document.querySelector(".main__container-input .input-desc") 
let inputDate = document.querySelector(".main__container-input .input-date") 
let inputTime = document.querySelector(".main__container-input .input-time") 

let focusInput = document.querySelector(".focus-input")
let busquedaInput = document.querySelector(".input-busqueda")

inputDate.setAttribute("min", minDate)

inputNombre.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputNombre.value)){
        if(e.key === "Enter"){
            inputDesc.className = 'input input-desc input-desc-desplazar'
            inputDate.className = 'input input-date input-desc-desplazar'
            inputTime.className = 'input input-time input-desc-desplazar'
    
            inputDesc.focus()
            inputNombre.placeholder = 'Nombre del Evento'
        }
    }else{
        inputNombre.placeholder = 'Porfavor ingresar un nombre'
    }
})

inputDesc.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputDesc.value) && verificarDatos(inputNombre.value)){
        if(e.key === "Enter"){
            inputDate.className = 'input input-date input-date-desplazar'
            inputTime.className = 'input input-time input-date-desplazar'
    
            inputDate.focus()
            inputDesc.placeholder = 'Ingrese su descripcion'
        }
    }else{
        inputDesc.placeholder = 'Porfavor ingresar una descripcion'
        inputNombre.placeholder = 'Porfavor ingresar un Nombre'
    }
})

inputDate.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputDate.value) && verificarDatos(inputDesc.value) && verificarDatos(inputNombre.value)){
        if(e.key === "Enter"){
            inputTime.className = 'input input-time input-time-desplazar'
    
            inputTime.focus()
        }
    }else{
        inputDesc.placeholder = 'Porfavor ingresar una descripcion'
        inputNombre.placeholder = 'Porfavor ingresar un Nombre'
    }
})

inputTime.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputTime.value) && verificarDatos(inputDate.value) && verificarDatos(inputDesc.value) && verificarDatos(inputNombre.value)){
        if(e.key === "Enter"){
            inputDesc.className = 'input input-desc'
            inputDate.className = 'input input-date'
            inputTime.className = 'input input-time'
    
            crearEvento()
        }
    }else{
        inputDesc.placeholder = 'Porfavor ingresar una descripcion'
        inputNombre.placeholder = 'Porfavor ingresar un Nombre'
    }
})

focusInput.addEventListener("click", ()=>{
    inputNombre.focus()
})

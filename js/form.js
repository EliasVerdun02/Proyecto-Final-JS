let inputNombre = document.querySelector(".main__container-input .input-nombre") 
let inputDesc = document.querySelector(".main__container-input .input-desc") 
let inputDate = document.querySelector(".main__container-input .input-date") 
let inputTime = document.querySelector(".main__container-input .input-time") 

inputDate.setAttribute("min", minDate)

inputNombre.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputNombre.value)){
        if(e.key === "Enter"){
            inputDesc.className = 'input input-desc input-desc-desplazar'
            inputDate.className = 'input input-date input-desc-desplazar'
            inputTime.className = 'input input-time input-desc-desplazar'
    
            inputDesc.focus()
            inputNombre.placeholder = 'Nombre'
        }
    }else{
        inputNombre.placeholder = 'Porfavor ingresar un nombre'
    }
})

inputDesc.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputDesc.value)){
        if(e.key === "Enter"){
            inputDate.className = 'input input-date input-date-desplazar'
            inputTime.className = 'input input-time input-date-desplazar'
    
            inputDate.focus()
            inputDesc.placeholder = 'Ingrese su descripcion'
        }
    }else{
        inputDesc.placeholder = 'Porfavor ingresar una descripcion'
    }
})

inputDate.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputDate.value)){
        if(e.key === "Enter"){
            inputTime.className = 'input input-time input-time-desplazar'
    
            inputTime.focus()
        }
    }
})

inputTime.addEventListener("keypress",(e)=>{
    if(verificarDatos(inputTime.value)){
        if(e.key === "Enter"){
            inputDesc.className = 'input input-desc'
            inputDate.className = 'input input-date'
            inputTime.className = 'input input-time'
    
            crearEvento()
        }
    }
})
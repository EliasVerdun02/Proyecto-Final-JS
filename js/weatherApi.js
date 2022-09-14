
window.addEventListener('load',()=>{
    let containerApi = document.querySelector(".container__api")

    let container = document.getElementById("temp-box")

    let tempValor = document.getElementById('temp-valor')
    let tempDesc = document.getElementById('temp-desc')

    let ubi = document.getElementById('ubi')
    let icono = document.getElementById('icono-animado')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=2f32b905cba753b940a7c6b474230059`

            const cargarApi = async ()=>{
                await fetch(url)
                    .then( res => res.json())
                    .then(data =>{
                        let temp = Math.round(data.main.temp)
                        tempValor.textContent = `${temp}°C`
            
                        let desc = data.weather[0].description
                        tempDesc.innerText = desc.toUpperCase()
            
                        ubi.textContent = data.name
        
            
                        switch (data.weather[0].main) {
                            case 'Thunderstorm':
                            icono.src='animated/thunder.svg'
                            break;
                            case 'Drizzle':
                            icono.src='animated/rainy-2.svg'
                            break;
                            case 'Rain':
                            icono.src='animated/rainy-7.svg'
                            break;
                            case 'Snow':
                            icono.src='animated/snowy-6.svg'
                            break;                        
                            case 'Clear':
                                icono.src='animated/day.svg'
                            break;
                            case 'Atmosphere':
                            icono.src='animated/weather.svg'
                                break;  
                            case 'Clouds':
                                icono.src='animated/cloudy-day-1.svg'
                                break;  
                            default:
                            icono.src='animated/cloudy-day-1.svg'
                        }
                    })
                    .catch(err => container.innerHTML = 'A ocurrido un error...')
                    .finally(setTimeout(() => {
                        containerApi.className= 'container__api translate-api'
                    }, 500))
            }
            cargarApi()
})

window.addEventListener('load',()=>{
    let tempValor = document.getElementById('temp-valor')
    let tempDesc = document.getElementById('temp-desc')

    let ubi = document.getElementById('ubi')
    let icono = document.getElementById('icono-animado')

    let vientoVeloc = document.getElementById('viento-veloc')

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
            
                        vientoVeloc.textContent = `${data.wind.speed}m/s`
            
                        switch (data.weather[0].main) {
                            case 'Thunderstorm':
                            icono.src='animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                            case 'Drizzle':
                            icono.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                            break;
                            case 'Rain':
                            icono.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                            break;
                            case 'Snow':
                            icono.src='animated/snowy-6.svg'
                                console.log('NIEVE');
                            break;                        
                            case 'Clear':
                                icono.src='animated/day.svg'
                                console.log('LIMPIO');
                            break;
                            case 'Atmosphere':
                            icono.src='animated/weather.svg'
                                console.log('ATMOSFERA');
                                break;  
                            case 'Clouds':
                                icono.src='animated/cloudy-day-1.svg'
                                console.log('NUBES');
                                break;  
                            default:
                            icono.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                        }
                    })
                    .catch(err => console.log(err))
            }
            cargarApi()
})
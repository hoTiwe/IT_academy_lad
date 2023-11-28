//http://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric
const fs = require('fs')

try {
    const readFile = fs.readFileSync('weather-configg.json', 'utf-8');
    const parsedData = JSON.parse(readFile)
    console.log(parsedData)

    getWeather(parsedData.city, parsedData.tocken )

} catch (e) {

    const args = process.argv.slice(2);
    let city = null;
    let tocken = null;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-s') {
            city = args[i + 1];
        } else if (args[i] === '-t') {
            tocken = args[i + 1];
        } else if (args[i] === '-h') {
            console.log('Справка по использованию:');
            console.log('-s <city>: Указать город для вывода информации');
            console.log('-t <token>: Указать токен для доступа к API');
            process.exit(0);
        }
    }

    if(city == null || tocken == null){
        console.log('Конфигурационный файл не найден. Пожалуйста, запустите программу с указанием города и токена.');
    } else {
        console.log(city)
        console.log(tocken)
        console.log()
        getWeather(city, tocken)
    }
}

async function getWeather(city, tocken) {
    const url = `http://api.openweathermap.org/data/2.5/` +
        `weather?q=${city}&lang=ru&appid=${tocken}&units=metric`
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(`Город: ${city}` )
        console.log(`Температура воздуха: ${data.main.temp}`)
        console.log(`Сейчас ${data.weather[0].description}`)
    } catch (e) {
        console.log(e)
    }
}

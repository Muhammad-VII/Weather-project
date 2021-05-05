$("#demo").fadeIn(500);
$("#demo2").fadeIn(500);
$("#demo3").fadeIn(500);
$("#demo4").fadeIn(1000);

async function getTemps(keyWord) {
    // Start date area
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date();
    document.getElementById("today").innerHTML = dayNames[d.getDay()]
    document.getElementById("dayDate").innerHTML = d.getDate() + month[d.getMonth()]
    document.getElementById("nextDay").innerHTML = dayNames[d.getDay()+1]
    document.getElementById("dayAfter").innerHTML = dayNames[d.getDay()+2]
    // End of date area

    // Ajax start
    let tempsRespo = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a62b8c0df5ed46f8a1f123311210205&q=${keyWord}&days=3&aqi=no&alerts=no`);
    let myRespo = await tempsRespo.json();
    console.log(myRespo)
    document.getElementById("foreCastIcon").innerHTML = `<img src = "http:${myRespo.current.condition.icon}" alt="icon" class"foreCastIcon">`
    document.getElementById("condition").innerHTML = myRespo.current.condition.text
    document.getElementById("humidity").innerHTML = ` ${myRespo.current.humidity}%`
    document.getElementById("airCon").innerHTML = ` ${Math.floor(myRespo.current.wind_kph)} km/h`
    document.getElementById("windDir").innerHTML = ` ${myRespo.current.wind_dir}`
    document.getElementById("nextDayMaxTemp").innerHTML = `${myRespo.forecast.forecastday[1].day.maxtemp_c}&#8451;`
    document.getElementById("nextDayMinTemp").innerHTML = `${myRespo.forecast.forecastday[1].day.mintemp_c}&#8451;`
    document.getElementById("dayAfterMaxTemp").innerHTML = `${myRespo.forecast.forecastday[2].day.maxtemp_c}&#8451;`
    document.getElementById("dayAfterMinTemp").innerHTML = `${myRespo.forecast.forecastday[2].day.mintemp_c}&#8451;`
    document.getElementById("dayAfterIcon").innerHTML = `<img src = "http:${myRespo.forecast.forecastday[2].day.condition.icon}" alt="icon">`
    document.getElementById("nextDayIcon").innerHTML = `<img src = "http:${myRespo.forecast.forecastday[1].day.condition.icon}" alt="icon">`
    document.getElementById("nextDayCon").innerHTML = myRespo.forecast.forecastday[1].day.condition.text;
    document.getElementById("dayAfterCon").innerHTML = myRespo.forecast.forecastday[2].day.condition.text;
    document.getElementById("Capital").innerHTML = myRespo.location.name
    document.getElementById("todayTemp").innerHTML = `${myRespo.current.temp_c}&#8451;`
    // Ajax end
}
getTemps('Cairo');
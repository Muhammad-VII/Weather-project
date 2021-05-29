$("#demo, #demo2, #demo3, #demo4").fadeIn(500);

async function getTemps(keyWord) {
  // Start date area
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Spet",
    "Oct",
    "Nov",
    "Dec",
  ];

  let d = new Date();
  document.getElementById("today").innerHTML = d.toLocaleDateString("en", {
    weekday: "long",
  });
  document.getElementById("dayDate").innerHTML =
    d.toLocaleDateString("en", { day: "2-digit" }) +
    ` ` +
    d.toLocaleDateString("en", { month: "long" });

  document.getElementById("dayAfter").innerHTML = dayNames[d.getDay() + 2];
  // End of date area

  // Ajax start
  let tempsRespo = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a62b8c0df5ed46f8a1f123311210205&q=${keyWord}&days=3&aqi=no&alerts=no`
  );
  let myRespo = await tempsRespo.json();
  $("#foreCastIcon").html(
    `<img src = "http:${myRespo.current.condition.icon}" alt="icon" class"foreCastIcon">`
  );
  $("#condition").html(myRespo.current.condition.text);
  $("#humidity").html(` ${myRespo.current.humidity}%`);
  $("#airCon").html(` ${Math.floor(myRespo.current.wind_kph)} km/h`);
  $("#windDir").html(` ${myRespo.current.wind_dir}`);
  $("#nextDayMaxTemp").html(
    `${myRespo.forecast.forecastday[1].day.maxtemp_c}&#8451;`
  );
  $("#nextDayMinTemp").html(
    `${myRespo.forecast.forecastday[1].day.mintemp_c}&#8451;`
  );
  $("#dayAfterMaxTemp").html(
    `${myRespo.forecast.forecastday[2].day.maxtemp_c}&#8451;`
  );
  $("#dayAfterMinTemp").html(
    `${myRespo.forecast.forecastday[2].day.mintemp_c}&#8451;`
  );
  $("#dayAfterIcon").html(
    `<img src = "http:${myRespo.forecast.forecastday[2].day.condition.icon}" alt="icon">`
  );
  $("#nextDayIcon").html(
    `<img src = "http:${myRespo.forecast.forecastday[1].day.condition.icon}" alt="icon">`
  );
  $("#nextDayCon").html(myRespo.forecast.forecastday[1].day.condition.text);
  $("#dayAfterCon").html(myRespo.forecast.forecastday[2].day.condition.text);
  $("#Capital").html(myRespo.location.name);
  $("#todayTemp").html(`${myRespo.current.temp_c}&#8451;`);
  function getNextDayMonth(nextDateApi) {
    let m = new Date(nextDateApi);
    return m && monthName[m.getMonth()];
  }
  let nextDateApi = myRespo.forecast.forecastday[1].date;
  let nextDate_components = nextDateApi.split("-");
  let next_day = nextDate_components[2];
  document.getElementById("nextDay").innerHTML = `${next_day} ${getNextDayMonth(
    nextDateApi
  )}`;
  document.getElementById("dayAfter").innerHTML = `${
    Number(next_day) + 1
  } ${getNextDayMonth(nextDateApi)}`;
  // Ajax end
}
getTemps("Cairo");

(function () {
  $(".header-navs li").on("click", "a", function () {
    $(this).addClass("active");
  });
})();

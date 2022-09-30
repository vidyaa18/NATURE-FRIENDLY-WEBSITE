import { getSearchData } from './AQsearch.js';


//key for api...
//updated api
globalThis.api_key = "eabcb417-9399-4813-84d3-645fd0e82865";

//fuction to get Day name....
function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

//function to get current time...
function currentTime(timex) {
    let time = new Date(timex);
    return time.toLocaleTimeString('en-US');
}

//using async-await here...
async function getdata() {
    const response = await fetch("https://api.airvisual.com/v2/nearest_city?key=" + api_key);
    const json = await response.json();
    const aqi = json.data.current.pollution.aqius;
    //aqi[0]['aqius'];
    console.log(aqi);
    const city = json.data.city;
    const UpdatedTime = new Date(json.data.current.weather.ts);
    const uptime = UpdatedTime.toLocaleTimeString('en-US');
    const temp = json.data.current.weather.tp;
    const wind = json.data.current.weather.ws;

    //using this to categorize data to respective class...
    const getCategorisedData = aqi => {
        let className = 'unknown';
        let impact = 'unknown';

        if (aqi >= 0 && aqi <= 50) {
            impact = 'Good';
            className = 'good';
        } else if (aqi >= 51 && aqi <= 100) {
            impact = 'Moderate';
            className = 'moderate';
        } else if (aqi >= 101 && aqi <= 150) {
            impact = 'Unhealthy for Sensitive Groups';
            className = 'unhealthy-sentitive';
        } else if (aqi >= 151 && aqi <= 200) {
            impact = 'Unhealthy';
            className = 'unhealthy';
        } else if (aqi >= 201 && aqi <= 300) {
            impact = 'Very Unhealthy';
            className = 'very-unhealthy';
        } else if (aqi >= 301) {
            impact = 'Hazardous';
            className = 'hazardous';
        } else if (aqi == '') {
            impact = 'Unknown(No Results Found)';
            className = 'Unknown';
        }

        let catagorized = {};
        catagorized['impact'] = impact;
        catagorized['className'] = className;

        return catagorized;
    };
    let html = `<div class="${getCategorisedData(aqi).className}">
                    <div class="header">
                        <h1 class="aqi_index"> ${aqi} </h1>
                        <p class="aqiImpact">${getCategorisedData(aqi).impact}</p>
                    </div>
                    <div class="cont">
                        <p class="city">  ${city} </p>
                        <p> Updated On : ${uptime} </p>
                        <p> Current Time : ${getDayName(Date(), "en-US")},${currentTime(Date())} </p>
                        <p> Temperature : ${parseFloat(temp).toFixed(1)}</p>
                        <p> Wind Speed : ${parseFloat(wind).toFixed(2)}</p>
                    </div>
                </div>`

    const def = document.querySelector("#content");
    def.innerHTML = html;

};

const newElement = document.querySelector("#btn1");
newElement.addEventListener('click', getdata, false);





globalThis.api_key_two = "db9c36870967334b792cbdecc9527b5b4c834a90";
export async function getSearchData() {
    const element = document.querySelector("#getInput").value;
    console.log(element);
    const url = await fetch("https://api.waqi.info/search/?token=" + api_key_two + "&keyword=" + element);
    const search = await url.json();
    const aqis = search.data;


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
    let html = "";
    if (aqis.length != 0) {
        aqis.map(element => {
            const aqi = element.aqi;
            const sTime = new Date((element.time.stime).replace(/-/g, '/'));
            const sTimeup = sTime.toLocaleTimeString('en-US');
            html += `<div class="${getCategorisedData(aqi).className}">
                                <div class="header">
                                    <h1 class="aqi_index"> ${aqi} </h1>
                                    <p class="aqiImpact">${getCategorisedData(aqi).impact}</p>
                                </div>
                                <div class="cont">
                                    <p class="city">  ${element.station.name} </p>
                                    <p> Updated On : ${sTimeup} </p>
                                </div>
                            </div>` })
    }
    else {
        html = ` <div class="header">
                        <h1> No Result Found</h1>
                    </div>`
    }

    const def = document.querySelector("#content");
    def.innerHTML = html;

};

const showData = document.querySelector("#btn2");
showData.addEventListener('click', getSearchData, false);

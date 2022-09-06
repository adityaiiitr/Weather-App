let weather = {
    apiKey: "a1ed776c682bd59fc0fc2fd844fca289",
    fetchWeather: 
    function(city){
        // https://api.openweathermap.org/data/2.5/weather?q=allahabad&appid=a1ed776c682bd59fc0fc2fd844fca289
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+
        this.apiKey).then((response)=>{
            if(!response.ok){
            alert("No Weather Found.");
            throw new Error("No Weather Found");
        }
        return response.json();
        })
        .then((data)=> this.displaWeather(data));
    },
    displaWeather: function(data){
        const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // const degree="adi"
    const {deg} = data.wind;
    var degree="-";
    if(deg>=20 && deg<= 60)
        degree = "North-East";
    else if(deg>=60 && deg<= 100)
        degree = "East";
    else if(deg>=100 && deg<= 140)
        degree = "South-East";
    else if(deg>=140 && deg<= 180)
        degree = "South-East";
    else if(deg>=180 && deg<= 220)
        degree = "South-West";
    else if(deg>=220 && deg<= 260)
        degree = "South-West";
    else if(deg>=260 && deg<= 300)
        degree = "West";
    else if(deg>=300 && deg<= 340)
        degree = "North-West";
    else
        degree = "North";

    const lat =data.coord.lat;
    const lon= data.coord.lon;
    var lat_dir=lon_dir="";
    if(lat>0)
    lat_dir="N"
    else
    lat_dir="S"

    if(lon>0)
    lon_dir="E"
    else
    lon_dir="W"

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " m/s " + degree;
    document.querySelector(".lat-lon").innerText = lat+"° "+ lat_dir + " - " +lon+"° "+ lon_dir ;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
};
document.querySelector(".search button").addEventListener("click",function(){weather.search();
});

//Searches When Enter key is clicked keyup if pressed keydown
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Allahabad")
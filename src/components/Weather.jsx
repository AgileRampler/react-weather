import React, { useEffect, useState , useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/video/sun.mp4'
import cloud_icon from '../assets/video/clouds.mp4'
import drizzle_icon from '../assets/video/drizzle.mp4'
import rain_icon from '../assets/video/rain.mp4'
import snow_icon from '../assets/video/snow.mp4'
import wind_icon from '../assets/video/wind.mp4'
import humidity_icon from '../assets/video/humidity.mp4'
import loading_icon from '../assets/video/loading.gif'

function Weather() {

    const inputRef=useRef()
    
    const [weatherData, setWeatherData] = useState({
                    humidity:null,
                    windSpeed:null,
                    temprature: null,
                    location:"",
                    icon: null,

    });
    const [isLoading, setIsLoading] = useState(false);
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon
        
    }
   
    

        const search = async (city)=>{
            // if(city==""){
               
            //     alert("Enter a city")
            // }
            setIsLoading(true);
          
        
            try {
                const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

                const response = await fetch(url);
                const data = await response.json();
                setTimeout(() => {
                    setIsLoading(false); // Stop loading after 2 seconds
                  }, 1000);

                if(!response.ok){
                    alert(data.message)
                    setTimeout(() => {
                        setIsLoading(false); // Stop loading after 2 seconds
                      }, 1000);; 
                    
                }

                console.log(data);
                const icon =allIcons[data.weather[0].icon] || clear_icon
                setWeatherData({
                    humidity:data.main.humidity,
                    windSpeed:data.wind.speed,
                    temprature: Math.floor(data.main.temp ),                  
                    location:data.name,
                    icon: icon  ,
                })
               
                
                
            } catch (error) {
                setWeatherData(false)
                setTimeout(() => {
                    setIsLoading(false); // Stop loading after 2 seconds
                  }, 1000);; 
                
                console.error("Unable to fetch weather data");
                
                
            }
        }
        console.log(weatherData.icon);
        
       

        useEffect(()=>{
            search("");
        },[])
  return (
    <div className='weather'>

        <div className="searchbar" >
            <input ref={inputRef} type="text" placeholder='Enter a city'  />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>

{/* Loader */}
{isLoading && (
        <div className="loading-container">
          <img src={loading_icon} alt="Loading..." className="loading-icon" />
        </div>
      )}




        {/* Main Data */}
  
    {!isLoading && weatherData ? (<>

<video width="100" height="150" autoPlay  loop>
    <source src={weatherData.icon} type="video/mp4" />
</video>

<p className='temprature'>{weatherData.temprature}°c</p>

<p className='location'>{weatherData.location}</p> 


<div className="weahterData">
    <div className="col">
        <img src={humidity_icon} alt="" />
        <video width="60" height="80"  autoPlay muted  loop  >
        <source src={humidity_icon} type="video/mp4" /></video>
        
        <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
        </div>
    </div>
    <div className="col">
        <img src={wind_icon} alt="" />

        <video width="60" height="80"  autoPlay   loop  >
        <source src={wind_icon} type="video/mp4" /></video>

        <div>
            <p>{weatherData.windSpeed}</p>
            <span>WindSpeed</span>
        </div>
    </div>
</div>
</> ):<></>
    
}
    


    </div>
  )
}

export default Weather

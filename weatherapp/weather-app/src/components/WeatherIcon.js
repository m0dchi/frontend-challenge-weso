import React from 'react'

const WeatherIcon = ({ icon }) => {
  return (
    <div>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
    </div>
  )
}

export default WeatherIcon

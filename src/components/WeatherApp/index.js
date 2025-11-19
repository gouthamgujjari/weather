import React, { useState, useEffect } from "react";
import { Sun, Moon, Navigation } from "lucide-react";
import { getBackgroundImage } from "../../utils/backgroundImages";
import WeatherForm from "../WeatherForm";
import WeatherInfo from "../WeatherInfo";
import Loader from "../Loader";
import { AppContainer, GlassCard, Header, ToggleButton, ErrorText } from "./styled";

const API_KEY = "395de1d2561205e8467c42300d9f5d18";

function WeatherApp({ isDark, setIsDark }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // DEFAULT CITY = HYDERABAD
  // ---------------------------
  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();
      if (weatherData.cod !== 200) throw new Error(weatherData.message);

    
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();
      

      const chartData = forecastData.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).getHours() + ":00",
        temp: Math.round(item.main.temp),
      }));

      setWeather(weatherData);
      setForecast(chartData);

    } catch (err) {
      setError(err.message || "City not found");
    } finally {
      setLoading(false);
    }
  };

  const isNight = weather
    ? Date.now() / 1000 > weather.sys.sunset ||
      Date.now() / 1000 < weather.sys.sunrise
    : false;

  return (
    <AppContainer bg={getBackgroundImage(weather?.weather[0]?.main, isNight)}>
      <GlassCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Navigation size={20} />
            <span style={{ fontWeight: "bold" }}>WeatherView</span>
          </div>

          <ToggleButton onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ToggleButton>
        </Header>

        <WeatherForm fetchWeather={fetchWeather} />

        {loading && <Loader />}
        {error && <ErrorText>{error}</ErrorText>}

        {!loading && weather && (
          <WeatherInfo weather={weather} forecast={forecast} />
        )}
      </GlassCard>
    </AppContainer>
  );
}

export default WeatherApp;

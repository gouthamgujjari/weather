import React from "react";
import { useTheme } from "styled-components";
import {
  Wind,
  Droplets,
  Thermometer,
  Sunrise,
  Sunset,
  MapPin
} from "lucide-react";

import { getWeatherIcon } from "../../utils/weatherIcons";

import {
  InfoContainer,
  MainSection,
  TempDisplay,
  IconWrapper,
  GridContainer,
  StatCard,
  TodayWrapper,
  HourCard,
  HourIconImg
} from "./styled";

function WeatherInfo({ weather, forecast }) {
  const theme = useTheme();

  // Detect Night
  const isNight =
    Date.now() / 1000 > weather.sys.sunset ||
    Date.now() / 1000 < weather.sys.sunrise;

  const formatTime = (ts) =>
    new Date(ts * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <InfoContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* MAIN WEATHER SECTION */}
      <MainSection>
        <TempDisplay>
          <h2>
            <MapPin size={24} /> {weather.name}, {weather.sys.country}
          </h2>
          <h1>{Math.round(weather.main.temp)}°</h1>
          <p>
            {weather.weather[0].description} • H:
            {Math.round(weather.main.temp_max)}° L:
            {Math.round(weather.main.temp_min)}°
          </p>
        </TempDisplay>

        <IconWrapper>
          {getWeatherIcon(weather.weather[0].main, isNight)}
        </IconWrapper>
      </MainSection>

      {/* WEATHER STATS */}
      <GridContainer>
        <StatCard>
          <Wind size={34} color={theme.accent} />
          <span>Wind</span>
          <strong>{weather.wind.speed} m/s</strong>
        </StatCard>

        <StatCard>
          <Droplets size={34} color={theme.accent} />
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </StatCard>

        <StatCard>
          <Thermometer size={34} color={theme.accent} />
          <span>Feels Like</span>
          <strong>{Math.round(weather.main.feels_like)}°</strong>
        </StatCard>

        <StatCard>
          <Sunrise size={34} color="#ffbd59" />
          <span>Sunrise</span>
          <strong>{formatTime(weather.sys.sunrise)}</strong>
        </StatCard>

        <StatCard>
          <Sunset size={34} color="#ffbd59" />
          <span>Sunset</span>
          <strong>{formatTime(weather.sys.sunset)}</strong>
        </StatCard>
      </GridContainer>

      {/* TODAY HOURLY FORECAST */}
      {forecast && (
        <TodayWrapper>
          <h3>Today</h3>

          <div className="hourList">
            {forecast.map((item, idx) => (
              <HourCard key={idx}>
                <span className="hour">{item.time}</span>

                <HourIconImg>
                  {getWeatherIcon(weather.weather[0].main, isNight)}
                </HourIconImg>

                <span className="temp">{item.temp}°</span>
              </HourCard>
            ))}
          </div>
        </TodayWrapper>
      )}
    </InfoContainer>
  );
}

export default WeatherInfo;

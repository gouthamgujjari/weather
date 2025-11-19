import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog
} from "react-icons/wi";

export const getWeatherIcon = (condition = "", isNight = false) => {
  const key = condition.toLowerCase();

  if (key.includes("clear") && isNight)
    return <WiNightClear />;

  if (key.includes("clear"))
    return <WiDaySunny />;

  if (key.includes("cloud"))
    return <WiCloud />;

  if (key.includes("rain"))
    return <WiRain />;

  if (key.includes("storm") || key.includes("thunder"))
    return <WiThunderstorm />;

  if (key.includes("snow"))
    return <WiSnow />;

  if (key.includes("mist") || key.includes("fog") || key.includes("haze"))
    return <WiFog />;

  return <WiCloud />;
};

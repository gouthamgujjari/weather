export interface WeatherCodeInfo {
  description: string;
  iconName: string;
  gradient: string;
  bgType: 'clear-day' | 'clear-night' | 'cloudy' | 'rain' | 'thunderstorm' | 'snow' | 'fog';
}

export function getWeatherCodeInfo(code: number, isDay: boolean = true): WeatherCodeInfo {
  switch (code) {
    case 0:
      return {
        description: 'Clear sky',
        iconName: isDay ? 'Sun' : 'Moon',
        gradient: isDay
          ? 'from-zinc-900 via-neutral-900 to-black'
          : 'from-black via-zinc-950 to-black',
        bgType: isDay ? 'clear-day' : 'clear-night',
      };
    case 1:
      return {
        description: 'Mainly clear',
        iconName: isDay ? 'SunMedium' : 'MoonStar',
        gradient: isDay
          ? 'from-zinc-900 via-zinc-950 to-black'
          : 'from-black via-zinc-950 to-black',
        bgType: isDay ? 'clear-day' : 'clear-night',
      };
    case 2:
      return {
        description: 'Partly cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        gradient: 'from-zinc-950 via-zinc-900 to-black',
        bgType: 'cloudy',
      };
    case 3:
      return {
        description: 'Overcast',
        iconName: 'Cloud',
        gradient: 'from-zinc-900 via-zinc-950 to-black',
        bgType: 'cloudy',
      };
    case 45:
    case 48:
      return {
        description: 'Foggy & Depositing rime fog',
        iconName: 'CloudFog',
        gradient: 'from-zinc-900 via-neutral-900 to-black',
        bgType: 'fog',
      };
    case 51:
    case 53:
    case 55:
      return {
        description: 'Drizzle',
        iconName: 'CloudDrizzle',
        gradient: 'from-black via-zinc-900 to-zinc-950',
        bgType: 'rain',
      };
    case 61:
    case 63:
    case 65:
      return {
        description: 'Rain',
        iconName: 'CloudRain',
        gradient: 'from-black via-zinc-950 to-black',
        bgType: 'rain',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        description: 'Snow fall',
        iconName: 'CloudSnow',
        gradient: 'from-zinc-950 via-zinc-900 to-black',
        bgType: 'snow',
      };
    case 80:
    case 81:
    case 82:
      return {
        description: 'Rain showers',
        iconName: 'CloudRainWind',
        gradient: 'from-black via-zinc-950 to-zinc-900',
        bgType: 'rain',
      };
    case 85:
    case 86:
      return {
        description: 'Snow showers',
        iconName: 'Snowflake',
        gradient: 'from-zinc-950 via-black to-zinc-900',
        bgType: 'snow',
      };
    case 95:
    case 96:
    case 99:
      return {
        description: 'Thunderstorm',
        iconName: 'CloudLightning',
        gradient: 'from-black via-neutral-950 to-black',
        bgType: 'thunderstorm',
      };
    default:
      return {
        description: 'Clear',
        iconName: isDay ? 'Sun' : 'Moon',
        gradient: isDay ? 'from-zinc-900 to-black' : 'from-black to-zinc-950',
        bgType: isDay ? 'clear-day' : 'clear-night',
      };
  }
}

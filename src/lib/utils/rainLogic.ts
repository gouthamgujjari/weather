import { HourlyForecastItem, PrecipitationStatus } from '../types/weather';

export function calculatePrecipitationStatus(hourly: HourlyForecastItem[]): PrecipitationStatus {
  if (!hourly || hourly.length === 0) {
    return {
      hasPrecipitation: false,
      summary: 'No precipitation expected today.',
      type: 'none',
    };
  }

  // Look at next 12 hours
  const upcomingHours = hourly.slice(0, 12);
  const currentRain = upcomingHours[0]?.pop >= 40 || upcomingHours[0]?.precipitation > 0.1;
  const firstRainIndex = upcomingHours.findIndex((h) => h.pop >= 40 || h.precipitation > 0.1);

  if (currentRain) {
    // Rain is ongoing right now
    const maxPrecip = Math.max(...upcomingHours.slice(0, 3).map((h) => h.precipitation));
    let intensity: PrecipitationStatus['intensity'] = 'light';
    if (maxPrecip > 4) intensity = 'heavy';
    else if (maxPrecip > 1.5) intensity = 'moderate';

    return {
      hasPrecipitation: true,
      summary: `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} precipitation occurring now. Expected for next few hours.`,
      type: 'ongoing',
      intensity,
    };
  }

  if (firstRainIndex > 0) {
    const rainHour = upcomingHours[firstRainIndex];
    const minutesAway = firstRainIndex * 60;
    const timeLabel = new Date(rainHour.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    let intensity: PrecipitationStatus['intensity'] = 'light';
    if (rainHour.precipitation > 4) intensity = 'heavy';
    else if (rainHour.precipitation > 1.5) intensity = 'moderate';

    return {
      hasPrecipitation: true,
      summary: `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} rain expected around ${timeLabel} (${rainHour.pop}% chance).`,
      type: 'starting',
      minutesUntilStart: minutesAway,
      intensity,
    };
  }

  return {
    hasPrecipitation: false,
    summary: 'No rain expected over the next 12 hours.',
    type: 'none',
  };
}

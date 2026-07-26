import { describe, it, expect } from 'vitest';
import { formatTemp, formatSpeed, getWindDirectionLabel, getUVLevel } from './lib/utils/temp';
import { calculateAQICategory, getAQIColor } from './lib/utils/aqi';
import { calculatePrecipitationStatus } from './lib/utils/rainLogic';
import { HourlyForecastItem } from './lib/types/weather';

describe('Weather Utility Functions', () => {
  it('converts temperature correctly', () => {
    expect(formatTemp(20, 'C')).toBe('20°');
    expect(formatTemp(20, 'F')).toBe('68°');
    expect(formatTemp(0, 'F')).toBe('32°');
  });

  it('converts wind speed correctly', () => {
    expect(formatSpeed(10, 'kmh')).toBe('10 km/h');
    expect(formatSpeed(10, 'mph')).toBe('6 mph');
    expect(formatSpeed(36, 'ms')).toBe('10 m/s');
  });

  it('computes wind direction label', () => {
    expect(getWindDirectionLabel(0)).toBe('N');
    expect(getWindDirectionLabel(90)).toBe('E');
    expect(getWindDirectionLabel(180)).toBe('S');
    expect(getWindDirectionLabel(270)).toBe('W');
  });

  it('categorizes UV index accurately', () => {
    expect(getUVLevel(1).label).toBe('Low');
    expect(getUVLevel(4).label).toBe('Moderate');
    expect(getUVLevel(6).label).toBe('High');
    expect(getUVLevel(9).label).toBe('Very High');
    expect(getUVLevel(11).label).toBe('Extreme');
  });

  it('evaluates AQI levels', () => {
    expect(calculateAQICategory(30)).toBe('Good');
    expect(calculateAQICategory(80)).toBe('Moderate');
    expect(calculateAQICategory(120)).toBe('Unhealthy for Sensitive Groups');
    expect(calculateAQICategory(180)).toBe('Unhealthy');
    expect(getAQIColor(30)).toBe('#10b981');
  });

  it('generates rain indicator status', () => {
    const noRainHourly: HourlyForecastItem[] = [
      {
        time: '2026-07-22T20:00',
        timestamp: Date.now(),
        temp: 22,
        feelsLike: 22,
        humidity: 50,
        pop: 10,
        precipitation: 0,
        weatherCode: 0,
        weatherDescription: 'Clear sky',
        isDay: false,
        windSpeed: 5,
        uvIndex: 0,
      },
    ];
    const status = calculatePrecipitationStatus(noRainHourly);
    expect(status.hasPrecipitation).toBe(false);
    expect(status.summary).toContain('No rain expected');
  });
});

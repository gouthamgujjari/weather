export function formatHourTime(timestamp: number, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(new Date(timestamp));
  } catch {
    return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
}

export function formatDayName(dateStr: string, timezone: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: timezone,
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function getSunProgress(sunriseIso: string, sunsetIso: string): { progress: number; isDay: boolean } {
  try {
    const now = Date.now();
    const sunrise = new Date(sunriseIso).getTime();
    const sunset = new Date(sunsetIso).getTime();

    if (now < sunrise || now > sunset) {
      return { progress: 0, isDay: false };
    }

    const totalDaylight = sunset - sunrise;
    const elapsed = now - sunrise;
    const progress = Math.min(Math.max((elapsed / totalDaylight) * 100, 0), 100);

    return { progress, isDay: true };
  } catch {
    return { progress: 50, isDay: true };
  }
}

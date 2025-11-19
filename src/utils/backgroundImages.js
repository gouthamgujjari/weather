export const getBackgroundImage = (condition, isNight) => {
  if (isNight) return "[https://images.unsplash.com/photo-1472552944129-b035e9ea8f07?q=80&w=1920&auto=format&fit=crop](https://images.unsplash.com/photo-1472552944129-b035e9ea8f07?q=80&w=1920&auto=format&fit=crop)"; // Night
  
  switch (condition?.toLowerCase()) {
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      return "[https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1920&auto=format&fit=crop](https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1920&auto=format&fit=crop)"; 
    case 'snow':
      return "[https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=1920&auto=format&fit=crop](https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=1920&auto=format&fit=crop)"; 
    case 'clouds':
    case 'mist':
    case 'haze':
    case 'fog':
      return "[https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920&auto=format&fit=crop](https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1920&auto=format&fit=crop)"; 
    case 'clear':
    default:
      return "[https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop](https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1920&auto=format&fit=crop)"; 
  }
};

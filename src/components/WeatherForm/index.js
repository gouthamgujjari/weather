import React, { useState } from "react";
import { Search } from "lucide-react";
import { SearchContainer, Input } from "./styled";

function WeatherForm({ fetchWeather }) {
  const [city, setCity] = useState("Hyderabad");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeather(city);
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <Search size={20} style={{ opacity: 0.6 }} />
      <Input
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </SearchContainer>
  );
}

export default WeatherForm;
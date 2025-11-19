import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/themes";
import GlobalStyles from "./theme/GlobalStyles";
import WeatherApp from "./components/WeatherApp";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <WeatherApp isDark={isDark} setIsDark={setIsDark} />
    </ThemeProvider>
  );
}

export default App;
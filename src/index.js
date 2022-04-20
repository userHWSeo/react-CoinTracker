import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "111",
  backgroundColor: "#whitesmoke",
};

function themeSwitch() {
  let date = new Date();
  let hours = date.getHours();
  console.log(hours);
  if (hours < 18) {
    return lightTheme;
  } else {
    return darkTheme;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeSwitch()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles/index.scss";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "blue",
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>
);

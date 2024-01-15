import React from "react";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import CustomDataGrid from "./components/DataGrid/DataGrid";

const colors = {
  primary: "#1976D2",
  secondary: "#DC004E",
  textPrimary: "#000",
  textSecondary: "#666666",
};

const fontSizes = {
  headlineLg: "2rem",
  headlineMd: "1.5rem",
  headlineSm: "1.2rem",
  bodyXl: "1.5rem",
  bodyLg: "1.2rem",
  bodyMd: "1rem",
  bodySm: "0.8rem",
  bodyXs: "0.6rem",
};

function App() {
  const rows = [
    { id: 1, firstName: "John", lastName: "Doe", age: 25 },
    { id: 2, firstName: "John", lastName: "Doe", age: 25 },
    { id: 3, firstName: "John", lastName: "Doe", age: 25 },
    { id: 4, firstName: "John", lastName: "Doe", age: 25 },
    { id: 5, firstName: "John", lastName: "Doe", age: 25 },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "age", headerName: "Age", type: "number", width: 70 },
  ];

  return (
    <ThemeProvider colors={colors} fontSizes={fontSizes}>
      <CustomDataGrid rows={rows} columns={columns} />
    </ThemeProvider>
  );
}

export default App;

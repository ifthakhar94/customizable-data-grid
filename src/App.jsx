import React, { useState } from "react";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import CustomDataGrid from "./components/DataGrid/DataGrid";
import clipboardCopy from "clipboard-copy";

const App = () => {
  const [gridRows, setGridRows] = useState([
    { id: 1, firstName: "John", lastName: "Doe", age: 25 },
    { id: 2, firstName: "John", lastName: "Doe", age: 25 },
    { id: 3, firstName: "John", lastName: "Doe", age: 25 },
    { id: 4, firstName: "John", lastName: "Doe", age: 25 },
    { id: 5, firstName: "John", lastName: "Doe", age: 25 },
  ]);
  const colors = {
    primary: "#1976D2",
    secondary: "#DC004E",
    textPrimary: "#FF0000",
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

  const [gridColumns, setGridColumns] = useState([
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "age", headerName: "Age", type: "number", width: 70 },
  ]);

  const [selectionModel, setSelectionModel] = useState([]); // Add selectionModel state

  const handleCellEdit = ({ id, field, value }) => {
    const updatedRows = gridRows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setGridRows(updatedRows);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    // Handle other logic related to selection model change if needed
  };

  const handlePaste = async () => {
    if (!selectionModel.length) {
      // If no cells are selected, return early
      return;
    }
    try {
      const clipboardData = await clipboardCopy(); // Get data from clipboard
      console.log("clipboardData", clipboardData);
      const updatedRows = gridRows.map((row) => {
        const updatedRow = { ...row };
        selectionModel.forEach((selectedCell) => {
          const { colField, rowId } = selectedCell;
          if (
            rowId === row.id &&
            gridColumns.find((col) => col.field === colField)
          ) {
            updatedRow[colField] = clipboardData;
          }
        });
        return updatedRow;
      });

      // Update the rows with the pasted data
      setGridRows(updatedRows);
    } catch (error) {
      console.error("Error reading clipboard data:", error);
    }
  };

  const handleAddColumn = () => {
    const newColumnName = prompt("Enter a new column name:");
    if (newColumnName) {
      const newColumn = {
        field: newColumnName,
        headerName: newColumnName,
        width: 150,
      };
      setGridColumns([...gridColumns, newColumn]);
      setGridRows((prevRows) =>
        prevRows.map((row) => ({ ...row, [newColumnName]: "" }))
      );
    }
  };

  return (
    <ThemeProvider colors={colors} fontSizes={fontSizes}>
      <CustomDataGrid
        rows={gridRows}
        columns={gridColumns}
        rowHeight={32}
        border={true}
        onCellEdit={handleCellEdit}
        onSelectionModelChange={handleSelectionModelChange}
        onPaste={handlePaste} // Pass down handlePaste function
        customColumnWidths={{
          firstName: 200,
          lastName: 200,
        }}
        onAddColumn={handleAddColumn}
      />
    </ThemeProvider>
  );
};

export default App;

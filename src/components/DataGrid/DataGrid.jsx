import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "../Typography/Typography";
import clipboardCopy from "clipboard-copy";
import "./CustomDataGrid.css";

const CustomDataGrid = ({
  rows: initialRows,
  columns,
  rowHeight,
  border,
  onCellEdit,
  onSelectionModelChange,
  customColumnWidths,
  onAddColumn,
  onPaste, // Add onPaste prop
}) => {
  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelectionModel) => {
    console.log("New Selection Model:", newSelectionModel);
    setSelectionModel(newSelectionModel);
    if (onSelectionModelChange) {
      onSelectionModelChange(newSelectionModel);
    }
  };

  const handleCellEditCommit = ({ id, field, value }) => {
    if (onCellEdit) {
      onCellEdit({ id, field, value });
    }
  };

  const handlePaste = async () => {
    if (!selectionModel.length) {
      // If no cells are selected, return early
      return;
    }

    try {
      const clipboardData = await clipboardCopy(); // Get data from clipboard
      console.log("clipboardData", clipboardData);
      const updatedRows = rows.map((row) => {
        const updatedRow = { ...row };
        selectionModel.forEach((selectedCell) => {
          const { colField, rowId } = selectedCell;
          if (
            rowId === row.id &&
            columns.find((col) => col.field === colField)
          ) {
            updatedRow[colField] = clipboardData;
          }
        });
        return updatedRow;
      });

      // Update the rows with the pasted data
      setRows(updatedRows);
    } catch (error) {
      console.error("Error reading clipboard data:", error);
    }
  };
  return (
    <div className="custom-data-grid-container">
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          width: customColumnWidths[column.field] || column.width,
          headerRender: (props) => (
            <Typography variant="body2">{props.title}</Typography>
          ),
        }))}
        rowHeight={rowHeight}
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
        onCellEditCommit={handleCellEditCommit}
        {...(border && {
          showCellRightBorder: true,
          showCellBottomBorder: true,
        })}
      />
      <div className="buttons-container">
        <button className="button" onClick={onAddColumn}>
          Add Column
        </button>
        <button className="button" onClick={onPaste}>
          Paste
        </button>
      </div>
    </div>
  );
};

export default CustomDataGrid;

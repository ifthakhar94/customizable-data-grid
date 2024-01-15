import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "../Typography/Typography";
import clipboardCopy from "clipboard-copy";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import styled from "@emotion/styled";
import "./CustomDataGrid.css";

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const StyledEditButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CustomDataGridContainer = styled.div`
  padding: 16px;
`;

const DataGridContainer = styled(DataGrid)`
  margin-bottom: 16px;
  .MuiDataGrid-row {
    margin-bottom: 8px; /* Adjust the margin as needed */
  }

  .MuiDataGrid-cellIcon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const EditButton = styled(Button)`
  width: 80px; /* Adjust width as needed */
`;

const CopyButton = styled(Button)`
  width: 80px; /* Adjust width as needed */
`;

const CustomDataGrid = ({
  rows: initialRows,
  columns,
  rowHeight,
  border,
  onCellEdit,
  onSelectionModelChange,
  customColumnWidths,
  onAddColumn,
}) => {
  const [rows, setRows] = useState(initialRows);
  const [selectionModel, setSelectionModel] = useState([]);
  const [editRowId, setEditRowId] = useState(null);

  const handleSelectionModelChange = (newSelectionModel) => {
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

  const handleEditClick = (rowId) => {
    setEditRowId(rowId);
  };

  const handleEditSave = () => {
    setEditRowId(null);
  };

  const handleEditCancel = () => {
    setEditRowId(null);
  };

  const handleCopyClick = async (rowData) => {
    try {
      const dataToCopy = Object.values(rowData).join(" ");
      await clipboardCopy(dataToCopy);
      alert("Data copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="custom-data-grid-container">
      <DataGridContainer
        autoHeight
        rows={rows}
        columns={[
          ...columns.map((column) => ({
            ...column,
            width: customColumnWidths[column.field] || column.width,
            headerRender: (props) => (
              <Typography variant="body2">{props.title}</Typography>
            ),
            renderCell: (params) => {
              if (editRowId === params.row.id) {
                // Display input field for editing
                return (
                  <StyledInput
                    type="text"
                    value={params.row[column.field]}
                    onChange={(e) =>
                      setRows((prevRows) =>
                        prevRows.map((row) =>
                          row.id === params.row.id
                            ? { ...row, [column.field]: e.target.value }
                            : row
                        )
                      )
                    }
                  />
                );
              }
              // Display plain text if not in edit mode
              return <div>{params.value}</div>;
            },
          })),
          // Add a new column for the "Edit" button
          {
            field: "edit",
            headerName: "Edit",
            width: 300, // Adjust width as needed
            renderCell: (params) => (
              <StyledEditButtons>
                {editRowId !== params.row.id ? (
                  <EditButton onClick={() => handleEditClick(params.row.id)}>
                    Edit
                  </EditButton>
                ) : (
                  <>
                    <EditButton onClick={() => handleEditSave(params.row.id)}>
                      Save
                    </EditButton>
                    <Button onClick={() => handleEditCancel(params.row.id)}>
                      Cancel
                    </Button>
                  </>
                )}
              </StyledEditButtons>
            ),
          },
          // Add a new column for the "Copy" button
          {
            field: "copy",
            headerName: "Copy",
            width: 80,
            renderCell: (params) => (
              <div className="MuiDataGrid-cellIcon copy-button">
                <CopyButton onClick={() => handleCopyClick(params.row)}>
                  <FileCopyIcon />
                </CopyButton>
              </div>
            ),
          },
        ]}
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
      <ButtonsContainer>
        <Button onClick={onAddColumn}>Add Column</Button>
      </ButtonsContainer>
    </div>
  );
};

export default CustomDataGrid;

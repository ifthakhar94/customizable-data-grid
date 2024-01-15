import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "../Typography/Typography";

const CustomDataGrid = ({ rows, columns }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        components={{
          Typography: Typography,
        }}
      />
    </div>
  );
};

export default CustomDataGrid;

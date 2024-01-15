import React from "react";
import { Typography as MuiTypography } from "@mui/material";

const Typography = ({ variant, children, ...rest }) => {
  return (
    <MuiTypography variant={variant} {...rest}>
      {children}
    </MuiTypography>
  );
};

export default Typography;

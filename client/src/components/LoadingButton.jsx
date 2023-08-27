import React from "react";

import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ size='medium', sx, fullWidth=false, color='primary' }) => {
  return (
    <Button sx={sx} fullWidth={fullWidth} variant="outlined" size={size} color={color}>
      <CircularProgress size={24} color={color} />
    </Button>
  );
};

export default LoadingButton;

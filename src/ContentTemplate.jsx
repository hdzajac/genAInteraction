import { Typography, Grid } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

const ContentTemplate = ({ page, children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box style={{ flexGrow: 1 }}>
          <Typography variant="h1">{page}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box style={{ flexGrow: 1 }}>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default ContentTemplate;

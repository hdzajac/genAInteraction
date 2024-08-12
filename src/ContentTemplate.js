import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

const ContentTemplate = ({page, children}) => {
  return (
    <Box>
    <Typography variant="h1">{page}</Typography>
    {children}
    </Box>
  );
};

export default ContentTemplate;
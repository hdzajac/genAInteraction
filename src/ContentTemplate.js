import { Typography } from '@mui/material';
import React from 'react';

const ContentTemplate = ({page, children}) => {
  return (
    <div>
    <Typography variant="h1">{page}</Typography>
    {children}
    </div>
  );
};

export default ContentTemplate;
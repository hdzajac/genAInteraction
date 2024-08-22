import React from "react";
import useFetchData from "../Services/useFetchData";
import { Button, Box } from "@mui/material";

const AboutPageContent = () => {
  const { data, loading, error, fetchData } =
    useFetchData("/api/data-endpoint"); // Replace with your API endpoint

  return (
    <Box>
      <Button onClick={fetchData}>Let's chat</Button>

      {error && <Box style={{ color: "red" }}>{error}</Box>}

      {data && (
        <Box>
          <h1>Oracle:</h1>
          <pre>{data}</pre>
        </Box>
      )}
    </Box>
  );
};

export default AboutPageContent;

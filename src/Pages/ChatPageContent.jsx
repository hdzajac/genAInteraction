import React from "react";
import useFetchData from "../Services/useFetchData";
import { Button, Box, Grid, TextField } from "@mui/material";

const ChatPageContent = () => {
  const [interactionVersion, setInteractionVersion] = React.useState("v1");
  const { data, loading, error, fetchData } =
    useFetchData("/api/data-endpoint"); // Replace with your API endpoint
  console.log("loading:", loading);
  return (
    <Grid container padding={{ xs: "0.25rem 0.5rem", md: "1rem 2rem" }}>
      <Grid item xs={12} md={9} className={loading ? "loading" : ""}>
        {data ? (
          <Box>
            <h1>Report:</h1>
            <pre>{data}</pre>
          </Box>
        ) : (
          <Box>
            <h1>Chat with the Oracle</h1>
            <p>
              Ask the Oracle a question and it will provide you with an answer.
            </p>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={3} alignContent="center">
        <Button variant="outlined" onClick={fetchData}>
          Generate report
        </Button>
        {error && <Box style={{ color: "red" }}>{error}</Box>}
      </Grid>
    </Grid>
  );
};

export default ChatPageContent;

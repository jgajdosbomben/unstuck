import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import { supabase, useAuth } from "../Providers/AuthProvider";

const StepHeader = ({ activeStep }) => {
  const [sherpa, setSherpa] = useState("");
  const [fetchError, setFetchError] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, userDetails, user } = useAuth();

  const steps = {
    1: { primary: "Post A Stuck", secondary: "Describe your Stuck in detail" },
    2: { primary: "Select a Stuck", secondary: "Choose a Stuck to work on that inspires you" },
    3: {
      primary: "Problem Statement",
      secondary: "Write your problem statement out in one to two sentences, being as clear and concise as possible",
    },
    4: { primary: "Expand", secondary: "Expand on your problem statement, providing more detail and context" },
    5: { primary: "Example", secondary: "Provide an example of your problem statement that happens in the real world" },
    6: { primary: "Illustration secondary: Provide an illustration of your problem statement, like a metaphor or analogy" },
  };
  return (
    <>
      {activeStep >= 0 && (
        <Box
          sx={{
            mt: "30px",
            display: "flex",
            flexDirection: "row",
          }}>
          <Container
            sx={
              {
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
                // alignContent: "baseline",
              }
            }>
            <Typography
              variant="h2"
              mr="10px">
              Step: {steps[activeStep + 1].primary}
            </Typography>
            <Typography
              variant="h4"
              mr="10px">
              {steps[activeStep + 1].secondary}
            </Typography>
            {/* <Typography variant="p">This is the topic for the current class, which you will use to base you Stuck on.</Typography> */}
          </Container>
        </Box>
      )}
    </>
  );
};

export default StepHeader;
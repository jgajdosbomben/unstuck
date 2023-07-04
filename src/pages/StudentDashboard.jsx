import React from "react";
import { useEffect, useState } from "react";
//auth context
import { useAuth } from "../Providers/AuthProvider";
//mock data
import { mockTransactions } from "../data/mockData";
//theme
import { tokens } from "../theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/material";
//components
import ProgressStepper from "../components/ProgressStepper";
import TopicHeader from "../components/TopicHeader";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";
//ui elements
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

const StudentDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = useAuth();
  const user = auth.user();
  const [fetchError, setFetchError] = useState(null);
  const [topics, setTopics] = useState(null);
  return (
    <Box
      className="student-dashboard"
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        alignContent: "center",
      }}>
      <ProgressStepper />
      {fetchError && <p>{fetchError}</p>}
      <TopicHeader
        topics={topics}
        setTopics={setTopics}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}>
            <AddCircleOutlineIcon sx={{ mr: "10px" }} />
            Add Unstuck
          </Button>
        </Box>
      </Box>
      {/* Form for odding new Unstuck to the Topic */}
      <Box></Box>
    </Box>
  );
};

export default StudentDashboard;

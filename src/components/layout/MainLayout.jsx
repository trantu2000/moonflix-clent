import React from "react";
import { Box } from "@mui/material";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";

const MainLayout = () => {
  return (
    <>
      {/* login modal */}
      <AuthModal />
      {/* login modal */}
      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}
      </Box>
    </>
  );
};

export default MainLayout;

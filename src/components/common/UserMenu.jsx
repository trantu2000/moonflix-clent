import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);
  return (
    <>
      <Typography
        variant="h6"
        sx={{ cursor: "pointer", userSelect: "none" }}
        onClick={toggleMenu}
      >
        {user.displayName}
      </Typography>
    </>
  );
};

export default UserMenu;

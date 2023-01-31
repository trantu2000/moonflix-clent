import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
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
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { padding: 0 } }}
      >
        {menuConfigs.user.map((item, index) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={index}
            onClick={() => setAnchorEl(null)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
        <ListItemButton
          sx={{ borderRadius: "10px" }}
          onClick={() => dispatch(setUser(null))}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">sign out</Typography>
            }
          />
        </ListItemButton>
      </Menu>
    </>
  );
};

export default UserMenu;

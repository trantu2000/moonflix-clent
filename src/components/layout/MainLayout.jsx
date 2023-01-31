import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);
  return (
    <>
      {/* globalLoading */}
      <GlobalLoading />
      {/* globalLoading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;

import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";

const SigninForm = ({ switchAuthState }) => {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  return (
    <Box component="form">
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          color="success"
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          color="success"
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign in
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>
    </Box>
  );
};

export default SigninForm;

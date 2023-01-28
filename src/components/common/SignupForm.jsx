import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const SignupForm = ({switchAuthState}) => {
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
          type="text"
          placeholder="display name"
          name="displayName"
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
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
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
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

     
    </Box>
  );
};

export default SignupForm;

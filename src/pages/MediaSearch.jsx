import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import React, { useState } from "react";
const mediaTypes = ["movie", "tv", "people"];

const MediaSearch = () => {
  const [medias, setMedias] = useState([]);
  return (
    <>
      <Toolbar />;
      <Box>
        <Stack>
          {mediaTypes.map((item, index) => (
            <Button>{item}</Button>
          ))}
        </Stack>
        <TextField
          color="success"
          placeholder="Search MoonFlix"
          sx={{ width: "100%" }}
          autoFocus
        />

        {medias.length > 0 && <LoadingButton>load more</LoadingButton>}
      </Box>
    </>
  );
};

export default MediaSearch;

import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const [movies, setMovies] = useState([]);
  return (
    <Box>
      <Swiper>
        {movies.map((movie, index) => (
          <SwiperSlide>
            <Box>
                <Box>
                    <Box>
                        <Box>
                            <Stack>
                                <Typography>
                                    
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;

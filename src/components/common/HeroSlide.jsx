import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import genreApi from "../../api/modules/genre.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  console.log(movies);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box>
      <Swiper>
        {movies?.map((movie, index) => (
          <SwiperSlide>
            <Box>
              <Box>
                <Box>
                  <Box>
                    <Stack>
                      <Typography></Typography>
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

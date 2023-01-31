import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import TextAvatar from "./TextAvatar";
import Container from "./Container";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const ReviewItem = ({ review, onRemoved }) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        // opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user.displayName} />
        {/* avatar */}

        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user.displayName}
            </Typography>
            <Typography>
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const [listReviews, setListReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  // console.log(listReviews);
  const { user } = useSelector((state) => state.user);

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setReviewCount(reviews.length);
    setFilteredReviews([...reviews].splice(0, skip));
  }, [reviews]);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };
  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack>
          {filteredReviews.map((item) => (
            <Box>
              <ReviewItem review={item} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}

          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              {/* <TextAvatar text={user?.displayName} /> */}
              <TextAvatar text={"tu"} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {/* {user.displayName} */}
                  Tran Thanh Tu
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;

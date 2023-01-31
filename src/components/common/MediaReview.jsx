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
import reviewApi from "../../api/modules/review.api";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);
  };
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
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              remove
            </LoadingButton>
          )}
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
  const [content, setContent] = useState("");
  const [onRequest, setOnRequest] = useState(false);

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
  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };
    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review success");
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review success");
  };
  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack>
          {filteredReviews.map((item) => (
            <Box>
              <ReviewItem review={item} onRemoved={onRemoved} />
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
              <TextAvatar text={user?.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
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

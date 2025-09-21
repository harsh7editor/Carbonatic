import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../store/slices/placesSlice';
import { createReview } from '../store/slices/reviewsSlice';
import toast from 'react-hot-toast';

const Reviews = () => {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.places);
  const { isLoading } = useSelector((state) => state.reviews);

  const [reviewData, setReviewData] = useState({
    placeId: '',
    content: '',
    rating: 5,
  });

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData({
      ...reviewData,
      rating: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!reviewData.placeId) {
      toast.error('Please select a place');
      return;
    }

    if (!reviewData.content.trim()) {
      toast.error('Please write a review');
      return;
    }

    dispatch(createReview(reviewData));
    toast.success('Review submitted successfully!');
    
    // Reset form
    setReviewData({
      placeId: '',
      content: '',
      rating: 5,
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Write a Review
        </Typography>

        <Card sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Place</InputLabel>
              <Select
                value={reviewData.placeId}
                label="Select Place"
                name="placeId"
                onChange={handleInputChange}
              >
                {places.map((place) => (
                  <MenuItem key={place.id} value={place.id}>
                    {place.name} - {place.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={reviewData.rating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>

            <TextField
              fullWidth
              label="Your Review"
              name="content"
              value={reviewData.content}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              placeholder="Share your experience..."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Reviews;

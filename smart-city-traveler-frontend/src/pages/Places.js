import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces, searchPlaces, getPlacesByCategory } from '../store/slices/placesSlice';

const Places = () => {
  const dispatch = useDispatch();
  const { places, isLoading } = useSelector((state) => state.places);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchPlaces(searchQuery));
    } else {
      dispatch(getPlaces());
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      dispatch(getPlacesByCategory(category));
    } else {
      dispatch(getPlaces());
    }
  };

  const categories = [
    'RESTAURANT',
    'HOTEL',
    'ATTRACTION',
    'SHOPPING',
    'TRANSPORT',
    'ENTERTAINMENT',
    'CULTURE',
    'NATURE',
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Discover Places
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ minWidth: 300 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSearch} disabled={isLoading}>
            Search
          </Button>
        </Box>

        {isLoading ? (
          <Typography align="center">Loading places...</Typography>
        ) : (
          <Grid container spacing={3}>
            {places && places.length > 0 ? (
              places.map((place) => (
                <Grid item xs={12} sm={6} md={4} key={place.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s',
                      },
                    }}
                  >
                    {place.imageUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={place.imageUrl}
                        alt={place.name}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {place.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {place.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={place.category} size="small" />
                        {place.city && <Chip label={place.city} size="small" variant="outlined" />}
                        {place.averageRating > 0 && (
                          <Chip label={`⭐ ${place.averageRating}`} size="small" color="primary" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
                  No places found
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Places;

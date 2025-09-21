import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlaces } from '../store/slices/placesSlice';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { places, isLoading } = useSelector((state) => state.places);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchPlaces(searchQuery));
    }
  };

  const categories = [
    { name: 'Restaurants', icon: '🍽️', category: 'RESTAURANT' },
    { name: 'Hotels', icon: '🏨', category: 'HOTEL' },
    { name: 'Attractions', icon: '🎯', category: 'ATTRACTION' },
    { name: 'Shopping', icon: '🛍️', category: 'SHOPPING' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Smart City Traveler
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Discover amazing places and plan your perfect city adventure
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4, mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for places, cities, or attractions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ maxWidth: 500 }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </Button>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 6, mb: 4 }}>
          Explore by Category
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.category}>
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
                onClick={() => navigate(`/places?category=${category.category}`)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {places && places.length > 0 && (
          <>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 6, mb: 4 }}>
              Search Results
            </Typography>
            <Grid container spacing={3}>
              {places.slice(0, 6).map((place) => (
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
                    onClick={() => navigate(`/places/${place.id}`)}
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
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;

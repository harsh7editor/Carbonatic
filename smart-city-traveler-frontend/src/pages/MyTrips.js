import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,

  Chip,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips, deleteTrip } from '../store/slices/tripsSlice';
import toast from 'react-hot-toast';

const MyTrips = () => {
  const dispatch = useDispatch();
  const { trips, isLoading } = useSelector((state) => state.trips);

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  const handleDeleteTrip = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      dispatch(deleteTrip(tripId));
      toast.success('Trip deleted successfully');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLANNING': return 'default';
      case 'CONFIRMED': return 'primary';
      case 'IN_PROGRESS': return 'warning';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          My Trips
        </Typography>

        {isLoading ? (
          <Typography align="center">Loading trips...</Typography>
        ) : trips && trips.length > 0 ? (
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} md={6} lg={4} key={trip.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {trip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {trip.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={trip.status}
                        color={getStatusColor(trip.status)}
                        size="small"
                      />
                    </Box>

                    {trip.startDate && (
                      <Typography variant="body2" color="text.secondary">
                        Start: {new Date(trip.startDate).toLocaleDateString()}
                      </Typography>
                    )}
                    {trip.endDate && (
                      <Typography variant="body2" color="text.secondary">
                        End: {new Date(trip.endDate).toLocaleDateString()}
                      </Typography>
                    )}

                    {trip.places && trip.places.length > 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {trip.places.length} place(s) planned
                      </Typography>
                    )}

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Created: {new Date(trip.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  
                  <Box sx={{ p: 2, pt: 0 }}>
                    <IconButton color="primary" size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No trips found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Start planning your first trip!
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MyTrips;

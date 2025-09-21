import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,

  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../store/slices/placesSlice';
import { createTrip } from '../store/slices/tripsSlice';
import toast from 'react-hot-toast';

const TripPlanner = () => {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.places);
  const { isLoading } = useSelector((state) => state.trips);

  const [tripData, setTripData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const addPlace = (place) => {
    if (!selectedPlaces.find(p => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const removePlace = (placeId) => {
    setSelectedPlaces(selectedPlaces.filter(p => p.id !== placeId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!tripData.title.trim()) {
      toast.error('Please enter a trip title');
      return;
    }

    if (selectedPlaces.length === 0) {
      toast.error('Please add at least one place to your trip');
      return;
    }

    const trip = {
      ...tripData,
      places: selectedPlaces,
    };

    dispatch(createTrip(trip));
    toast.success('Trip created successfully!');
    
    // Reset form
    setTripData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    });
    setSelectedPlaces([]);
  };

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Trip Planner
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Trip Details
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Trip Title"
                  name="title"
                  value={tripData.title}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={tripData.description}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={tripData.startDate}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={tripData.endDate}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Trip...' : 'Create Trip'}
                </Button>
              </Box>
            </Card>

            <Card sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Selected Places ({selectedPlaces.length})
              </Typography>
              {selectedPlaces.length > 0 ? (
                <List>
                  {selectedPlaces.map((place) => (
                    <ListItem
                      key={place.id}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => removePlace(place.id)}>
                          <Remove />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={place.name}
                        secondary={place.category}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No places selected yet
                </Typography>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Available Places
              </Typography>
              <TextField
                fullWidth
                label="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                margin="normal"
              />
              <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
                {filteredPlaces.map((place) => (
                  <Card
                    key={place.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={() => addPlace(place)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6">{place.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {place.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip label={place.category} size="small" />
                          {place.city && <Chip label={place.city} size="small" variant="outlined" sx={{ ml: 1 }} />}
                        </Box>
                      </Box>
                      <IconButton>
                        <Add />
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TripPlanner;

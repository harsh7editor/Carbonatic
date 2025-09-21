package com.smartcity.traveler.service;

import com.smartcity.traveler.model.Trip;
import com.smartcity.traveler.model.User;
import com.smartcity.traveler.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getTripsByUser(User user) {
        return tripRepository.findByUser(user);
    }

    public Page<Trip> getTripsByUser(User user, Pageable pageable) {
        return tripRepository.findByUser(user, pageable);
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip saveTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }

    public boolean isTripOwner(Long tripId, User user) {
        Optional<Trip> trip = tripRepository.findById(tripId);
        return trip.isPresent() && trip.get().getUser().getId().equals(user.getId());
    }
}

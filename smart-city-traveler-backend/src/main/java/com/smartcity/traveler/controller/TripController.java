package com.smartcity.traveler.controller;

import com.smartcity.traveler.model.Trip;
import com.smartcity.traveler.model.User;
import com.smartcity.traveler.security.UserPrincipal;
import com.smartcity.traveler.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripService tripService;

    @GetMapping
    public ResponseEntity<List<Trip>> getUserTrips(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = new User();
        user.setId(userPrincipal.getId());
        user.setUsername(userPrincipal.getUsername());
        
        List<Trip> trips = tripService.getTripsByUser(user);
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Trip>> getUserTripsPaged(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = new User();
        user.setId(userPrincipal.getId());
        user.setUsername(userPrincipal.getUsername());
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Trip> trips = tripService.getTripsByUser(user, pageable);
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<Trip> trip = tripService.getTripById(id);
        if (trip.isPresent() && tripService.isTripOwner(id, userPrincipal)) {
            return ResponseEntity.ok(trip.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = new User();
        user.setId(userPrincipal.getId());
        user.setUsername(userPrincipal.getUsername());
        
        trip.setUser(user);
        Trip savedTrip = tripService.saveTrip(trip);
        return ResponseEntity.ok(savedTrip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip trip, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (!tripService.isTripOwner(id, userPrincipal)) {
            return ResponseEntity.forbidden().build();
        }
        
        trip.setId(id);
        Trip updatedTrip = tripService.saveTrip(trip);
        return ResponseEntity.ok(updatedTrip);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long id, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (!tripService.isTripOwner(id, userPrincipal)) {
            return ResponseEntity.forbidden().build();
        }
        
        tripService.deleteTrip(id);
        return ResponseEntity.ok("Trip deleted successfully");
    }
}

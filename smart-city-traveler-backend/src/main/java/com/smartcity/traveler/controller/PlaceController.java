package com.smartcity.traveler.controller;

import com.smartcity.traveler.model.Place;
import com.smartcity.traveler.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/places")
public class PlaceController {
    @Autowired
    private PlaceService placeService;

    @GetMapping
    public ResponseEntity<Page<Place>> getAllPlaces(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<Place> places = placeService.getAllPlaces(pageable);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Optional<Place> place = placeService.getPlaceById(id);
        return place.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Page<Place>> getPlacesByCategory(
            @PathVariable Place.PlaceCategory category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Place> places = placeService.getPlacesByCategory(category, pageable);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<Place>> getNearbyPlaces(
            @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal longitude) {
        List<Place> places = placeService.getNearbyPlaces(latitude, longitude);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Place>> searchPlaces(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Place> places = placeService.searchPlaces(query, pageable);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Place>> getPlacesByCity(@PathVariable String city) {
        List<Place> places = placeService.getPlacesByCity(city);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/top-rated")
    public ResponseEntity<Page<Place>> getTopRatedPlaces(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Place> places = placeService.getTopRatedPlaces(pageable);
        return ResponseEntity.ok(places);
    }
}

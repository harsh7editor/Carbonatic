package com.smartcity.traveler.service;

import com.smartcity.traveler.model.Place;
import com.smartcity.traveler.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    public Page<Place> getAllPlaces(Pageable pageable) {
        return placeRepository.findAll(pageable);
    }

    public Optional<Place> getPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public Page<Place> getPlacesByCategory(Place.PlaceCategory category, Pageable pageable) {
        return placeRepository.findByCategory(category, pageable);
    }

    public List<Place> getNearbyPlaces(BigDecimal latitude, BigDecimal longitude) {
        return placeRepository.findNearbyPlaces(latitude, longitude);
    }

    public Page<Place> searchPlaces(String query, Pageable pageable) {
        return placeRepository.searchPlaces(query, pageable);
    }

    public List<Place> getPlacesByCity(String city) {
        return placeRepository.findByCityIgnoreCase(city);
    }

    public Page<Place> getTopRatedPlaces(Pageable pageable) {
        return placeRepository.findTopRatedPlaces(pageable);
    }

    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }
}

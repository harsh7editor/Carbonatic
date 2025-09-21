package com.smartcity.traveler.repository;

import com.smartcity.traveler.model.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    
    Page<Place> findByCategory(Place.PlaceCategory category, Pageable pageable);
    
    @Query("SELECT p FROM Place p WHERE " +
           "(:latitude - 0.1) <= p.latitude AND p.latitude <= (:latitude + 0.1) AND " +
           "(:longitude - 0.1) <= p.longitude AND p.longitude <= (:longitude + 0.1)")
    List<Place> findNearbyPlaces(@Param("latitude") BigDecimal latitude, 
                                @Param("longitude") BigDecimal longitude);
    
    @Query("SELECT p FROM Place p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.city) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Place> searchPlaces(@Param("query") String query, Pageable pageable);
    
    List<Place> findByCityIgnoreCase(String city);
    
    @Query("SELECT p FROM Place p ORDER BY p.averageRating DESC")
    Page<Place> findTopRatedPlaces(Pageable pageable);
}

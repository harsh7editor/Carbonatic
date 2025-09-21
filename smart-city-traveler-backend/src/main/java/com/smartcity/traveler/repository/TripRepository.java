package com.smartcity.traveler.repository;

import com.smartcity.traveler.model.Trip;
import com.smartcity.traveler.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUser(User user);
    Page<Trip> findByUser(User user, Pageable pageable);
    List<Trip> findByUserId(Long userId);
    Page<Trip> findByUserId(Long userId, Pageable pageable);
}

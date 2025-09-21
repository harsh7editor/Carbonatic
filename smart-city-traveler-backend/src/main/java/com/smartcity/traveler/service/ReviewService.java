package com.smartcity.traveler.service;

import com.smartcity.traveler.model.Place;
import com.smartcity.traveler.model.Review;
import com.smartcity.traveler.model.User;
import com.smartcity.traveler.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByPlace(Place place) {
        return reviewRepository.findByPlace(place);
    }

    public Page<Review> getReviewsByPlace(Place place, Pageable pageable) {
        return reviewRepository.findByPlace(place, pageable);
    }

    public List<Review> getReviewsByUser(User user) {
        return reviewRepository.findByUser(user);
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Optional<Review> getReviewByUserAndPlace(User user, Place place) {
        return reviewRepository.findByUserAndPlace(user, place);
    }

    public Review saveReview(Review review) {
        Review savedReview = reviewRepository.save(review);
        updatePlaceRating(review.getPlace());
        return savedReview;
    }

    public void deleteReview(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isPresent()) {
            Place place = review.get().getPlace();
            reviewRepository.deleteById(id);
            updatePlaceRating(place);
        }
    }

    private void updatePlaceRating(Place place) {
        List<Review> reviews = reviewRepository.findByPlace(place);
        if (!reviews.isEmpty()) {
            double averageRating = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            
            place.setAverageRating(BigDecimal.valueOf(averageRating).setScale(2, RoundingMode.HALF_UP));
            place.setTotalReviews(reviews.size());
        } else {
            place.setAverageRating(BigDecimal.ZERO);
            place.setTotalReviews(0);
        }
    }

    public boolean isReviewOwner(Long reviewId, User user) {
        Optional<Review> review = reviewRepository.findById(reviewId);
        return review.isPresent() && review.get().getUser().getId().equals(user.getId());
    }

    public List<Review> getReviewsByPlaceId(Long placeId) {
        return reviewRepository.findByPlaceId(placeId);
    }

    public Page<Review> getReviewsByPlacePaged(Long placeId, Pageable pageable) {
        Place place = new Place();
        place.setId(placeId);
        return reviewRepository.findByPlace(place, pageable);
    }
}

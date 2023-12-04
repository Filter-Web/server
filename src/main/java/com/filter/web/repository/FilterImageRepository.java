package com.filter.web.repository;

import com.filter.web.entity.FilterImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilterImageRepository extends JpaRepository<FilterImage, Long> {
    Optional<FilterImage> findById(Long id);
}

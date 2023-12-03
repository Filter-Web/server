package com.filter.web.controller;

import com.filter.web.entity.FilterImage;
import com.filter.web.repository.FilterImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filterImage")
public class FilterImageController {
    private final FilterImageRepository filterImageRepository;
    @GetMapping("/image")
    public void saveImage(@RequestBody FilterImage image) {
        filterImageRepository.save(image);
    }
}

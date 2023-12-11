package com.filter.web.controller;

import com.filter.web.entity.FilterImage;
import com.filter.web.repository.FilterImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
@RequestMapping("/filterImage")
public class FilterImageController {
    private final FilterImageRepository filterImageRepository;
    @GetMapping("/image")
    @ResponseBody
    public List<String> getFilteredImages() {
        File imageDirectory = new File("src/main/resources/static/images/filter");
        String[] imageFiles = Objects.requireNonNull(imageDirectory.list());

        return Arrays.asList(imageFiles);
    }
//    @GetMapping("/image")
//    public void saveImage(@RequestBody FilterImage image) {
//        filterImageRepository.save(image);
//    }

}

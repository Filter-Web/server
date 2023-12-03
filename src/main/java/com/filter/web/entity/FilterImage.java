package com.filter.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "filter_image")
public class FilterImage {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="file_name", nullable = false)
    private String fileName;

    @Column(name="origin_name", nullable = false)
    private String originName;

    @Column(name="uri", nullable = false)
    private String uri;


}

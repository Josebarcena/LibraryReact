package com.library.catalogue.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private LocalDate publicationDate;

    private String category;

    private String isbn;

    private Integer rating;

    private Boolean visible;

    private Integer stock;

    private Double price;

    public void setId(Long id) {
        this.id = id;
    }
}

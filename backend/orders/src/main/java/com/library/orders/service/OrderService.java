package com.library.orders.service;

import com.library.orders.dto.BookResponse;
import com.library.orders.dto.CreateOrderRequest;
import com.library.orders.entity.Order;
import com.library.orders.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final WebClient.Builder webClientBuilder;

    public OrderService(OrderRepository repository, WebClient.Builder webClientBuilder) {
        this.repository = repository;
        this.webClientBuilder = webClientBuilder;
    }

    public Order createOrder(CreateOrderRequest request) {

        BookResponse book = webClientBuilder.build()
                .get()
                .uri("lb://catalogue/api/books/{id}", request.getBookId())
                .retrieve()
                .bodyToMono(BookResponse.class)
                .block();

        if (book == null) {
            throw new RuntimeException("Book not found");
        }

        if (!Boolean.TRUE.equals(book.getVisible())) {
            throw new RuntimeException("Book is hidden");
        }

        if (book.getStock() == null || book.getStock() < request.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        Order order = Order.builder()
                .userId(request.getUserId())
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .quantity(request.getQuantity())
                .unitPrice(book.getPrice())
                .totalPrice(book.getPrice() * request.getQuantity())
                .createdAt(LocalDateTime.now())
                .build();

        return repository.save(order);
    }

    public List<Order> getRecentOrdersByUser(Long userId) {
        return repository.findTop10ByUserIdOrderByCreatedAtDesc(userId);
    }
}
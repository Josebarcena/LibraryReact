package com.library.orders.service;

import com.library.orders.dto.BookResponse;
import com.library.orders.dto.CreateOrderRequest;
import com.library.orders.entity.Order;
import com.library.orders.exception.InsufficientStockException;
import com.library.orders.repository.OrderRepository;
import com.library.orders.exception.BookHiddenException;
import com.library.orders.exception.BookNotFoundException;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
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
                .onStatus(
                        HttpStatusCode::is4xxClientError,
                        response -> Mono.error(new BookNotFoundException("Book not found"))
                )
                .bodyToMono(BookResponse.class)
                .block();

        if (book == null) {
            throw new BookNotFoundException("Book not found");
        }

        if (!Boolean.TRUE.equals(book.getVisible())) {
            throw new BookHiddenException("Book is hidden");
        }

        if (book.getStock() == null || book.getStock() < request.getQuantity()) {
            throw new InsufficientStockException("Not enough stock");
        }

        Integer newStock = book.getStock() - request.getQuantity();

        webClientBuilder.build()
                .patch()
                .uri("lb://catalogue/api/books/{id}", book.getId())
                .bodyValue(Map.of("stock", newStock))
                .retrieve()
                .bodyToMono(Void.class)
                .block();

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
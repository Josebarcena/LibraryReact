package com.library.orders.controller;

import com.library.orders.dto.CreateOrderRequest;
import com.library.orders.entity.Order;
import com.library.orders.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public Order createOrder(@RequestBody CreateOrderRequest request) {
        return service.createOrder(request);
    }

    @GetMapping("/users/{userId}/recent")
    public List<Order> getRecentOrdersByUser(@PathVariable Long userId) {
        return service.getRecentOrdersByUser(userId);
    }
}
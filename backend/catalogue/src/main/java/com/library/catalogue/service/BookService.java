package com.library.catalogue.service;

import com.library.catalogue.entity.Book;
import com.library.catalogue.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return repository.findById(id);
    }

    public Book createBook(Book book) {
        return repository.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        updatedBook.setId(id);
        return repository.save(updatedBook);
    }

    public void deleteBook(Long id) {
        repository.deleteById(id);
    }
}

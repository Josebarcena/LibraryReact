import { books } from "../data/books"

export function getBooks() {
    return Promise.resolve(books)
}

export function getBookById(id) {
    return books.find((book) => String(book.id) === String(id))
}
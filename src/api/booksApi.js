import { books } from "../data/books"

export const getBooks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books)
        }, 500)
    })
}
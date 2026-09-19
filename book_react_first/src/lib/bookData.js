export const EMPTY_FORM = {
    title: "",
    author: "",
    isbn: "",
    price: "",
    publishDate: "",
    description: "",
    language: "",
    pageCount: "",
    publisher: "",
    coverImageUrl: "",
    edition: "",
}

export function toRequest(form) {
    return {
        title: form.title.trim() || null,
        author: form.author.trim() || null,
        isbn: form.isbn.trim() || null,
        price: toNumberOrNull(form.price.trim() || null),
        publishDate: form.publishDate || null,
        bookDetail: {
            description: form.description.trim(),
            language: form.language.trim(),
            pageCount: toNumberOrNull(form.pageCount.trim()),
            publisher: form.publisher.trim(),
            coverImageUrl: form.coverImageUrl.trim(),
            edition: form.edition.trim(),
        },
    };
}

export function toFormValues(book) {
    const detail = book.bookDetail;

    return {
        title: book.title ?? "",
        author: book.author ?? "",
        isbn: book.isbn ?? "",
        price: book.price != null ? String(book.price) : "",
        publishDate: book.publishDate ?? "",
        description: detail?.description ?? "",
        language: detail?.language ?? "",
        pageCount: detail?.pageCount != null ? String(detail.pageCount) : "",
        publisher: detail?.publisher ?? "",
        coverImageUrl: detail?.coverImageUrl ?? "",
        edition: detail?.edition ?? "",
    }
}

function toNumberOrNull(value) {
    // trim() 으로 공백만 든 칸도 빈 칸으로 본다.
    // if (!value || !value.trim()) return null;
    if (value == null || String(value).trim() === "") return null;
    return Number(value);
}
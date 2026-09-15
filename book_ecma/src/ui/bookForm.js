export const bookForm = document.getElementById("bookForm");
export const cancelButton = document.getElementById("cancelButton");
export const submitButton = bookForm.querySelector('button[type="submit"]');

export function collectBookData() {
    const formData = new FormData(bookForm);

    return {
        title: formData.get('title').trim(),
        author: formData.get('author').trim(),
        isbn: formData.get('isbn').trim(),
        price: formData.get('price') ? parseInt(formData.get('price')) : null,
        publishDate: formData.get('publishDate') || null,
        bookDetail: {
            description: formData.get('description').trim(),
            language: formData.get('language').trim(),
            pageCount: formData.get('pageCount') ? parseInt(formData.get('pageCount')) : null,
            publisher: formData.get('publisher').trim(),
            coverImageUrl: formData.get('coverImageUrl').trim(),
            edition: formData.get('edition').trim()
        }
    };
}

export function fillForm(book) {
    const { title, author, isbn, price, publishDate, bookDetail = {} } = book;
    const { description, language, pageCount, publisher, coverImageUrl, edition } = bookDetail;

    bookForm.title.value = title ?? "";
    bookForm.author.value = author ?? "";
    bookForm.isbn.value = isbn ?? "";
    bookForm.price.value = price ?? "";
    bookForm.publishDate.value = publishDate ?? "";

    bookForm.description.value = description ?? "";
    bookForm.language.value = language ?? "";
    bookForm.pageCount.value = pageCount ?? "";
    bookForm.publisher.value = publisher ?? "";
    bookForm.coverImageUrl.value = coverImageUrl ?? "";
    bookForm.edition.value = edition ?? "";
}

export function setEditMode(isEditing = false) {
    submitButton.textContent = isEditing ? "도서 수정" : "도서 등록";
    cancelButton.style.display = isEditing ? "inline-block" : "none";
}

export function resetForm() {
    bookForm.reset();
    setEditMode(false);
}

export function scrollToForm() {
    bookForm.scrollIntoView({ behavior: "smooth"});
}
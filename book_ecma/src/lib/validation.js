
const ISBN_PATTERN = /^[0-9X-]+$/;

export function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export function validateBook(book) {
    const { title, author, isbn, price, bookDetail = {} } = book;
    const { pageCount, coverImageUrl } = bookDetail;

    if (!title) return "제목을 입력해주세요.";

    if (!author) return "저자를 입력해주세요.";

    if (!isbn || !ISBN_PATTERN.test(isbn)) {
        return "ISBN을 입력하지 않거나 올바른 형식이 아닙니다. (숫자와 X, - 만 허용)";
    }

    if (price === null || price === undefined || price === "" || price < 0) {
        return "가격은 0 이상이어야 합니다.";
    }

    if (pageCount === null || pageCount === undefined || pageCount === "" || pageCount < 0) {
        return "페이지 수는 0 이상이어야 합니다.";
    }

    if (!coverImageUrl) {
        return "표지 이미지 URL을 입력해주세요.";
    } else if (!isValidUrl(coverImageUrl)) {
        return "올바른 이미지 URL 형식이 아닙니다.";
    }

    return null;
}
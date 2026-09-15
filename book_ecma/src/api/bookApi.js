import { BOOKS_URL, JSON_HEADERS } from '../config';

const DEFAULT_MESSAGES = {
    400: "입력한 값이 올바르지 않습니다.",
    404: "존재하지 않는 도서입니다.",
    409: "이미 등록된 ISBN입니다.",
    500: "서버에서 오류가 발생했습니다.",
};

async function request(url, options = {}) {
    const response = await fetch(url, options);

    // response.ok 는 상태 코드가 200~299 일 때만 true 다.
    // fetch 는 404 나 500 을 받아도 오류를 내지 않으므로 직접 확인해야 한다.
    if (!response.ok) {
        // 서버가 JSON 이 아닌 오류 페이지를 줄 수도 있다.
        // 그때 json() 이 실패하므로 catch 로 빈 객체를 대신 쓴다.
        const errorData = await response.json().catch(() => ({}));

        // ?? 를 이어 쓰면 앞에서부터 값이 있는 것을 고른다.
        //   서버 메시지 → 상태 코드별 기본 문구 → 마지막 안전망
        const message =
            errorData.message ??
            DEFAULT_MESSAGES[response.status] ??
            `요청에 실패했습니다. (${response.status})`;

        // throw 로 던지면 이 함수를 부른 쪽의 try / catch 가 받는다.
        throw new Error(message);
    }

    // 204 No Content 는 돌려줄 본문이 없다(삭제 성공 등).
    // 여기서 response.json() 을 부르면 "Unexpected end of JSON input" 이 난다.
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// 도서 목록 조회
export const fetchBooks = () => request(BOOKS_URL);
// 도서 ID 개별 조회
export const fetchBook = (id) => request(`${BOOKS_URL}/${id}`);

// 도서 등록
export const createBook = (book) =>
    request(BOOKS_URL, {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify(book),   // 객체를 JSON 문자열로 바꾼다
    });

// 도서 수정
export const updateBook = (id, book) =>
    request(`${BOOKS_URL}/${id}`, {
        method: "PUT",
        headers: JSON_HEADERS,
        body: JSON.stringify(book),
    });

// 도서 삭제    
export const deleteBook = (id) =>
    request(`${BOOKS_URL}/${id}`, {
        method: "DELETE",
    });


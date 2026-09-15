export const bookTableBody = document.getElementById("bookTableBody");

const COLUMN_COUNT = 7;

function createMessageRow(message, className = "empty-row") {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = COLUMN_COUNT;   // 한 칸이 7칸 너비를 차지하게 한다
    cell.className = className;
    cell.textContent = message;
    row.appendChild(cell);         // <tr> 안에 <td> 를 넣는다

    return row;
}

function addCell(row, value) {
    const cell = document.createElement("td");

    cell.textContent = value;      // 태그가 섞여 있어도 글자로만 보인다
    row.appendChild(cell);
}

function createActionButton(action, label, className, id) {
    const button = document.createElement("button");

    // type 을 안 주면 폼 안의 버튼은 submit 으로 동작한다.
    button.type = "button";
    button.className = className;
    button.textContent = label;

    // dataset.action 에 넣으면 HTML 에는 data-action="edit" 로 나온다.
    // data- 로 시작하는 속성은 우리가 마음대로 붙여 쓸 수 있다.
    button.dataset.action = action;
    button.dataset.id = id;

    return button;
}

function createBookRow(book) {
    // 필요한 값 네 개만 이름 그대로 꺼낸다(구조 분해).
    const { id, title, author, isbn, price, publishDate, bookDetail = {} } = book;
    const row = document.createElement("tr");

    addCell(row, title);
    addCell(row, author);
    addCell(row, isbn);
    addCell(row, price !== null && price !== undefined ? price : "-");
    addCell(row, publishDate || "-");
    addCell(row, bookDetail?.publisher ?? "-");

    // 마지막 칸에는 버튼 두 개를 넣는다.
    const actionCell = document.createElement("td");

    actionCell.appendChild(createActionButton("edit", "수정", "edit-btn", id));
    actionCell.appendChild(createActionButton("delete", "삭제", "delete-btn", id));
    actionCell.appendChild(createActionButton("detail", "상세", "detail-btn", id));

    row.appendChild(actionCell);
    return row;
}

export function renderBookTable(books = []) {
    bookTableBody.textContent = "";

    if (books.length === 0) {
        bookTableBody.appendChild(createMessageRow("등록된 도서가 없습니다."));
        return;
    }

    books.forEach((book) => {
        bookTableBody.appendChild(createBookRow(book));
    });
}

export function renderTableError(message = "오류: 데이터를 불러올 수 없습니다.") {
    bookTableBody.textContent = "";
    bookTableBody.appendChild(createMessageRow(message, "error-row"));
}
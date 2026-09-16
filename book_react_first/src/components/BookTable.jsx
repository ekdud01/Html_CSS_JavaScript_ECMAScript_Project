const COLUMN_COUNT = 7;

function BookTable({ books, loading, error, onEdit, onDelete, onDetail }) {
    let rows;

    if (error) {
        rows = (
            <tr>
                <td colSpan={COLUMN_COUNT} className="error-row">{error}</td>"
            </tr>
        );
    } else if (books.length === 0 & !loading) {
        rows = (
            <tr>
                <td colSpan={COLUMN_COUNT} className="empty-row">등록된 학생이 없습니다.</td>
            </tr>
        );
    } else {
        rows = books.map((book) => (
            <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.price}</td>
                <td>{book.publicDate ?? "-"}</td>
                <td>{book.bookDetail?.publisher ?? "-"}</td>
                <td>
                    <button type="button" className="edit-btn"
                            onClick={() => onEdit(book.id)}>수정</button>
                    <button type="button" className="delete-btn"
                            onClick={() => onDelete(book.id)}>삭제</button>
                    <button type="button" className="detail-btn"
                            onClick={() => onDetail(book.id)}>상세</button>
                </td>
            </tr>
        ));
    }
}
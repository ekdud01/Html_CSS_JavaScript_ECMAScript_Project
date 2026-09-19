function BookDetail({ book, onClose, detailRef }) {
    if (!book) {
        return null;
    }
    const { title, author, isbn, price, publishDate, bookDetail } = book;

    return (
        <div className="book-detail-container" ref={detailRef}>
            <h2>도서 상세 정보</h2>

            <div className="book-detail-box">
                <table>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>{title ?? "-"}</td>
                        </tr>
                        <tr>
                            <th>저자</th>
                            <td>{author ?? "-"}</td>
                        </tr>
                        <tr>
                            <th>ISBN</th>
                            <td>{isbn ?? "-"}</td>
                        </tr>
                        <tr>
                            <th>가격</th>
                            <td>{price == null ? "-" : `₩${price.toLocaleString()}`}</td>
                        </tr>
                        <tr>
                            <th>출판일</th>
                            <td>{publishDate ?? "-"}</td>
                        </tr>

                        <tr>
                            <th>언어</th>
                            <td>{bookDetail?.language || "-"}</td>
                        </tr>
                        <tr>
                            <th>페이지 수</th>
                            <td>{bookDetail?.pageCount ?? "-"}</td>
                        </tr>
                        <tr>
                            <th>출판사</th>
                            <td>{bookDetail?.publisher || "-"}</td>
                        </tr>
                        <tr>
                            <th>표지 이미지</th>
                            <td>{bookDetail?.coverImageUrl || "-"}</td>
                        </tr>
                        <tr>
                            <th>에디션</th>
                            <td>{bookDetail?.edition || "-"}</td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td>{bookDetail?.description || "-"}</td>
                        </tr>
                    </tbody>
                </table>


                <button type="button" onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

export default BookDetail;
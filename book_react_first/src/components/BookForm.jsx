import MessageBox from "./MessageBox.jsx";

function BookForm({
    form,
    isEditing,
    message,
    onChange,
    onSubmit,
    onCancel,
    containerRef, 
}) {
    let containerClass = "form-container";
    if (isEditing) {
        containerClass = "form-container editing";
    }

    // 등록 모드와 수정 모드에서 글자만 달라진다.
    let actionLabel = "등록";
    if (isEditing) {
        actionLabel = "수정";
    }

    return (
        <div className={containerClass} ref={containerRef}>
            <h2>도서 {actionLabel}</h2>

            <form onSubmit={onSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={form.title}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">저자</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            required
                            value={form.author}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            required
                            value={form.isbn}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">가격</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publishDate">출판일</label>
                        <input
                            id="publishDate"
                            name="publishDate"
                            type="date"
                            value={form.publishDate}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <input
                            id="description"
                            name="description"
                            type="textarea"
                            value={form.description}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="language">언어</label>
                        <input
                            id="language"
                            name="language"
                            type="text"
                            value={form.language}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pageCount">페이지 수</label>
                        <input
                            id="pageCount"
                            name="pageCount"
                            type="number"
                            value={form.pageCount}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="publisher">출판사</label>
                        <input
                            id="publisher"
                            name="publisher"
                            type="text"
                            value={form.publisher}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverImageUrl">표지 이미지 URL</label>
                        <input
                            id="coverImageUrl"
                            name="coverImageUrl"
                            type="url"
                            value={form.coverImageUrl}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edition">에디션</label>
                        <input
                            id="edition"
                            name="edition"
                            type="text"
                            value={form.edition}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit">도서 {actionLabel}</button>
                    {isEditing && (
                        <button type="button" className="cancel-btn" onClick={onCancel}>
                            취소
                        </button>
                    )}
                    
                    <MessageBox message={message} />
                </div>

            </form>
        </div>
    );
}

export default BookForm;
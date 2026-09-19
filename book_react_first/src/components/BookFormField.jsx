import MessageBox from "./MessageBox.jsx";

function Field({ name, label, type, required, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

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

                    <Field name="title" label="제목" type="text" required
                        value={form.title} onChange={onChange} />
                    <Field name="author" label="저자" type="text" required
                        value={form.author} onChange={onChange} />
                    <Field name="isbn" label="ISBN" type="text" required
                        value={form.isbn} onChange={onChange} />
                    <Field name="price" label="가격" type="number"
                        value={form.price} onChange={onChange} />
                    <Field name="publishDate" label="출판일" type="date"
                        value={form.publishDate} onChange={onChange} />

                    <Field name="language" label="언어" type="text"
                        value={form.language} onChange={onChange} />
                    <Field name="pageCount" label="페이지 수" type="number"
                        value={form.pageCount} onChange={onChange} />
                    <Field name="publisher" label="출판사" type="text"
                        value={form.publisher} onChange={onChange} />
                    <Field name="coverImageUrl" label="표지 이미지 URL" type="url"
                        value={form.coverImageUrl} onChange={onChange} />
                    <Field name="edition" label="에디션" type="text"
                        value={form.edition} onChange={onChange} />
                        
                    {/* 방법 1) textarea는 Field와 묶지 않고 그대로 둔다. 
                        이유: 기존 코드의 반복되는 input을 Field로 리팩토링하는 것이 목적이고,
                            textarea는 input과 HTML 요소 자체가 다르기 때문이다.
                            이 방법이 가장 직관적이고, 설명(textarea)는 현재 하나만 존재하기 때문이다. 
                    */}
                    <div className="form-group">
                        <label htmlFor="description">설명</label>
                        <textarea id="description" name="description"
                            value={form.description} onChange={onChange} />
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
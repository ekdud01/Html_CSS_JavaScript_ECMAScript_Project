import { useState, useEffect, useRef } from 'react'

import './style.css'
import { createBook, deleteBook, fetchBook, fetchBooks, updateBook } from './api/bookApi';
import BookTable from './components/BookTable.jsx'
// import BookForm from './components/BookForm.jsx';
import BookForm from "./components/BookFormField.jsx";
import { EMPTY_FORM, toFormValues, toRequest } from './lib/bookData.js';
import { useCallback } from 'react';
import { validateBook } from './lib/validation.js';
import BookDetail from './components/BookDetail.jsx';
import { APP_MODE } from './config.js';

const MESSAGE_TIMEOUT = 3000;

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [message, setMessage] = useState(null);
  const [detailBook, setDetailBook] = useState(null);

  const formRef = useRef(null);
  const detailRef = useRef(null);
  const isEditing = editingId !== null;

  const loadBooks = useCallback(async () => {
    setLoading(true);

    // try 안에서 오류가 나면 곧바로 catch 로 넘어간다.
    // finally 는 성공하든 실패하든 마지막에 반드시 실행된다.
    try {
      // await 은 서버 응답이 올 때까지 기다린다.
      // form10.js 의 fetch().then().then() 사슬이 두 줄이 되었다.
      const books = await fetchBooks();
      setBooks(books);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);    // bookApi 가 던진 메시지
      setListError();
    } finally {
      // 여기에 두면 성공 경로와 실패 경로에 두 번 적지 않아도 된다.
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 처음 한 번 목록을 불러오는 것은 의도된 동작입니다
    loadBooks();
  }, [loadBooks])

  useEffect(() => {
    if (!message) {
      return;
    }

    // 오류 메시지는 사용자가 고칠 때까지 남겨 둔다.
    if (message.type !== "success") {
      return;
    }

    const timer = setTimeout(() => setMessage(null), MESSAGE_TIMEOUT);

    // 정리 함수 — 다음 번 실행 직전과 화면에서 사라질 때 불린다.
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (detailBook && detailRef.current) {
      detailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [detailBook]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const next = { ...form };

    next[name] = value;

    setForm(next);
  }

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);

    const bookData = toRequest(form);

    const errorMessage = validateBook(bookData);
    if (errorMessage) {
      setMessage({ text: errorMessage, type: "error" });
      return;
    }

    try {
      if (isEditing) {
        await updateBook(editingId, bookData);
        setMessage({ text: "도서 정보가 성공적으로 수정되었습니다.", type: "success" });
      } else {
        await createBook(bookData);
        setMessage({ text: "도서가 성공적으로 등록되었습니다.", type: "success" });
      }

      resetForm();
      await loadBooks();
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: error.message, type: "error" });
    }
  }

  const handleEdit = useCallback(async (bookId) => {
    setMessage(null);

    try {
      const book = await fetchBook(bookId);

      setForm(toFormValues(book));
      setEditingId(bookId);

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: error.message, type: "error" });
    }
  }, []);

  const handleDelete = useCallback(async (bookId) => {
    if (!confirm("정말로 이 도서를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteBook(bookId);
      setMessage({ text: "도서가 성공적으로 삭제되었습니다.", type: "success" });

      if (editingId === bookId) {
        resetForm();
      }

      await loadBooks();
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: error.message, type: "error" });
    }
  }, [editingId, resetForm, loadBooks]);

  const handleDetail = useCallback(async (bookId) => {
    setMessage(null);

    try {
      const book = await fetchBook(bookId);

      setDetailBook(book);
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: error.message, type: "error" });
    }
  }, []);

  let modeClass = "app-mode test";
  if (APP_MODE === "PROD") {
    modeClass = "app-mode prod";
  }

  return (
    <>
      <h1>도서 관리 시스템 <span className={modeClass}>{APP_MODE}</span></h1>

      <BookForm
        form={form}
        isEditing={isEditing}
        message={message}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        containerRef={formRef}
      />

      <BookTable
        books={books}
        loading={loading}
        error={listError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={handleDetail}
      />

      <BookDetail
        book={detailBook}
        onClose={() => setDetailBook(null)}
        detailRef={detailRef}
      />
    </>
  );
}

export default App

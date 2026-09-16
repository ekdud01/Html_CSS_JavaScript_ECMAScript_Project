import { useState } from 'react'
import './style.css'
import { useEffect } from 'react';
import { fetchBooks } from './api/bookApi';

function App() {
  const [books, setBooks] = useState([]);
  //const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [message, setMessage] = useState(null);
  const [detailBook, setDetailBook] = useState(null);

  async function loadBooks() {
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
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 처음 한 번 목록을 불러오는 것은 의도된 동작입니다
    loadBooks();
  }, [])

  return (
    <>
      <h1>도서 관리 시스템</h1>
    </>
  )
}

export default App

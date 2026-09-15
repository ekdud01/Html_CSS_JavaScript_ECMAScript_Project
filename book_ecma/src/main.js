import './style.css'
import {
  createBook,
  updateBook,
  deleteBook,
  fetchBook,
  fetchBooks,
} from './api/bookApi';
import { collectBookData, fillForm, resetForm, scrollToForm, setEditMode } from './ui/bookForm.js';
import { validateBook } from './lib/validation.js';
import { clearMessages, setLoading, showError, showSuccess } from './ui/message.js';
import { formatBookDetail } from './ui/bookDetail.js';
import { renderBookTable, renderTableError } from './ui/bookTable.js';

// 전역 변수
let editingBookId = null; // 현재 수정 중인 도서 ID

// 폼 제출 이벤트 핸들러
bookForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const bookData = collectBookData();

    const validationError = validateBook(bookData);
    if (validationError) {
      showError(validationError); 
      return;
    }

    if (editingBookId) {
      await updateBook(editingBookId, bookData);
      showSuccess('도서가 수정되었습니다.');
    } else {
      await createBook(bookData);
      showSuccess('도서가 등록되었습니다.');
    }
    resetForm();
    await loadBooks();
  } catch (error) {
    console.error('Error:', error);
    showError('도서 처리에 실패했습니다.');
  }
});

cancelButton.addEventListener("click", () => {
  editingBookId = null;
  resetForm();
  clearMessages();
});

// 도서 목록 로드 함수
async function loadBooks() {
  setLoading(true);

  try {
    const data = await fetchBooks();
    renderBookTable(data);
  } catch (error) {
    console.error('Error:', error);
    showError('도서 목록을 불러오는데 실패했습니다.');
    renderTableError();
  } finally {
    setLoading(false);
  }
}

bookTableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "edit") startEdit(id);
  if (action === "delete") removeBook(id);
  if (action === "detail") showDetail(id);

});

// 도서 삭제 함수
async function removeBook(bookId) {
  if (!confirm('정말로 이 도서를 삭제하시겠습니까?')) {
    return;
  }

  try {
    await deleteBook(bookId);
    showSuccess('도서가 성공적으로 삭제되었습니다.');

    if (editingBookId === bookId) {
      editingBookId = null;
      resetForm();
    }
    await loadBooks();
  } catch (error) {
    console.error('Error:', error);
    showError('도서 삭제에 실패했습니다.');
  };
}

// 도서 수정 함수
async function startEdit(bookId) {
  clearMessages();

  try {
    const book = await fetchBook(bookId);

    fillForm(book);
    editingBookId = bookId;
    setEditMode(true);
    scrollToForm();
  } catch (error) {
    console.error('Error:', error);
    showError('도서 정보를 불러오는데 실패했습니다.');
  }
}

// 도서 상세보기 함수
async function showDetail(bookId) {
  try {
    const book = await fetchBook(bookId);
    const bookDetailText = formatBookDetail(book);
    alert(bookDetailText);
  } catch (error) {
    console.error('Error:', error);
    showError('도서 정보를 불러오는데 실패했습니다.');
  };
}

loadBooks();

const checkoutFormHandler = async (event) => {
  event.preventDefault();

  const bookId = document.querySelector('#book-id').value.trim();
  const borrowerName = document.querySelector('#borrower-name').value.trim();

  if (bookId && borrowerName) {
    try {
      const response = await axios.post(`/api/book/${bookId}/checkout`, { borrowerName });

      if (response.status === 200) {
        document.location.replace('/');
      } else {
        alert('Failed to check out book');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to check out book');
    }
  }
};

// document.querySelector('#checkout').addEventListener('submit', checkoutFormHandler);

const checkoutFormHandler = async (event) => {
    event.preventDefault();
  
    const bookId = document.querySelector('#book-id').value.trim();
    const borrowerName = document.querySelector('#borrower-name').value.trim();
  
    if (bookId && borrowerName) {
      const response = await fetch(`/api/books/${bookId}/checkout`, {
        method: 'POST',
        body: JSON.stringify({ borrowerName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/checked-out');
      } else {
        alert('Failed to check out book');
      }
    }
  };
  
  document
    .querySelector('.checkout-form')
    .addEventListener('submit', checkoutFormHandler);
  
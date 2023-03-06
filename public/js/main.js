const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#book-title').value.trim();
    const author = document.querySelector('#book-author').value.trim();
    // const description = document.querySelector('#book-description').value.trim();
  
    if (title || author) {
      const response = await fetch(`/api/books`, {
        method: 'POST',
        body: JSON.stringify({ title, author, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/books');
      } else {
        alert('Failed to find book');
      }
    }
  };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/books/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/books');
//       } else {
//         alert('Failed to delete book');
//       }
//     }
//   };
  
  // document
  //   .querySelector('.new-book-form')
  //   // change the id 'submit'/search if needed 
  //   .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.book-list')
//     .addEventListener('click', delButtonHandler);

document.querySelector('.search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('#search-input').value.trim();

  if(input){
    const response = await fetch(`/search/${input}`, {
      method: 'GET'
    });

    if(response.ok){

    }
  }else if(input === ''){
    document.location.replace('/search');
  }


});
  
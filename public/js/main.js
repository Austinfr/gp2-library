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
  

let searchForms = document.querySelectorAll('.search-form');
for(let searchElement of searchForms){
  searchElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = event.target.querySelector(`.search-input`).value.trim();

    if(input){
      event.target.querySelector('.search-input').value = '';
      
      const response = await fetch(`/search/${input}`, {
        method: 'GET'
      });

      if(response.ok){
        //some logic will go here I can't think of atm
      }
    }else if(input === ''){
      document.location.replace('/search');
    }


  });
}
const loginFormHandler = async (event) => {
    event.preventDefault();

    // change the the id of the email is not matching in the html
    const email = document.querySelector('#email-login').value.trim();
    // change the id if the id of the password is not matching in the html
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // if succesful, will direct the browser to the main page. 
            document.location.replace('/main');
        }
        else {
            alert('response.statusText');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    //make sure the id is matched
    const name = document.querySelector('#name-signup').value.trim();
     
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      // if succesful, will direct the browser to the main page. 
          if (response.ok) {
            document.location.replace('/main');
          } else {
            alert(response.statusText);
          }
    }

};

//addEventListener for submit login form and 1 for signup form

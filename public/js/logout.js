const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

//addEventlistener for logout 
// change #logout if needed
document.querySelector('#logout').addEventListener('click', logout);


//temp done
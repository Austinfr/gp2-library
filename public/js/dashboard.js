// const checkoutBook = async (id) => {
//    const res = await fetch(`/api/book/${id}/checkout`, {
//         method: 'POST'
//     })
//     if (res.status.ok) {
//         window.location.replace("/account")
//     }
// }

document.querySelector('#checkout').addEventListener('click', () => {
    window.location.replace("/account")
// const id = event.target.dataset.bookId;
// checkoutBook (id)
})
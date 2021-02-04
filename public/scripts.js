const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for(item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active');
    };
};


/* DELETE CONFIRMATION */
/* 
const formDelete = document.querySelector('#form-delete');
formDelete.addEventListener('submit', (event) => {
    const confirmation = confirm('Deseja deletar??'); // vai gerar um boolear - true(deletar) false(não deletar)

    if (!confirmation) {
        event.preventDefault()                    
    }

}) */
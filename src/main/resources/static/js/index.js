const table = document.getElementById('table')

fetch('http://localhost:8080/api/users')
    .then(res => res.json())
    .then(data => {
            console.log(data);
        }
    )

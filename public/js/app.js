const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(!data.error){
            message1.textContent = 'Location: '+data.location
            message2.textContent = 'The temperature is '+data.forecast.temperature+' degree celsius. It feels like '+data.forecast.feelslike+' degree celsius.'
        }
        else{
            message1.textContent = data.error
        }
    })
})
})
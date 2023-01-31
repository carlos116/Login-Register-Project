
const loginLink = document.querySelector('.login-link')
const registerLink = document.querySelector('.register-link')
const loginText = document.querySelector('.login-text')
const registerText = document.querySelector('.register-text')
const form = document.querySelector('.form')
const formTitle = document.querySelector('.form-title')
const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')
const passwordInput = document.querySelector('.password-input')
const card= document.querySelector('.card')
const welcomeText = document.querySelector('.welcome-text')
const profileSection = document.querySelector('.profile-section')
const signoutBtn = document.querySelector('.signout-btn')
const alert = document.querySelector('.alert')

let loginActive = true

const clearInputs = () => {
    nameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''
}

const showAlert = (msg) => {
    alert.innerHTML = msg
    setTimeout(() => {
        alert.innerHTML = ''
    }, 3500)
}

const setLoginPage = () => {
    loginActive = true
    registerText.style.display = 'block'
    loginText.style.display = 'none'
    nameInput.style.display = 'none'
    formTitle.innerHTML = 'Login User'
    clearInputs()
}

loginLink.addEventListener('click', (e) => {
    setLoginPage()
})


registerLink.addEventListener('click', (e) => { 
    loginActive = false
    loginText.style.display = 'block'
    registerText.style.display = 'none'
    nameInput.style.display = 'block'
    formTitle.innerHTML = 'Register User'
    clearInputs()
})

signoutBtn.addEventListener('click', () => {
    setLoginPage()
    card.style.display = 'flex'
    profileSection.style.display = 'none'
    alert.style.color = 'rgb(0, 82, 0)'
    alert.style.backgroundColor = 'rgb(147, 190, 147)'
    showAlert('Logged out')
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    if(loginActive) {
        try {
            const { data } = await axios.post('/login', { email, password })
            card.style.display = 'none'
            const userName = data.user.name
            profileSection.style.display = 'flex'
            welcomeText.innerHTML = `Welcome to your profile ${userName} 👋`
        } catch (error) {
            const errorMessage = error.response.data.msg
            alert.style.color = 'rgb(136, 0, 0)'
            alert.style.backgroundColor = 'rgb(255, 181, 181)'
            showAlert(errorMessage)
        }
    } else {
        try {
            const { data } = await axios.post('/register', {name, email, password})
            clearInputs()
            setLoginPage()
            alert.style.color = 'rgb(0, 82, 0)'
            alert.style.backgroundColor = 'rgb(147, 190, 147)'
            showAlert(`User ${data.user.name} created, please login`)
        } catch (error) {
            const errorMessage = error.response.data.msg
            alert.style.color = 'rgb(136, 0, 0)'
            alert.style.backgroundColor = 'rgb(255, 181, 181)'
            showAlert(errorMessage)
        }
    }
})

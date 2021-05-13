window.addEventListener('load', () => {
    const userToken = localStorage.getItem('USER_TOKEN')
    console.log(userToken);

    if (userToken) {
        document.getElementById('login-menu-text').textContent = 'Logged in';
    }
    else {
        window.location.href = '../../pages/login/login.html';
    }
})

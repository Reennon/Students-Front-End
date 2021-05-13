window.addEventListener('load', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.onsubmit = function (event) {
        event.preventDefault();
        const request = new XMLHttpRequest();
        const requestURL = new URL('http://127.0.0.1:5000/login');
        const email = encodeURIComponent(document.getElementById('email').value);
        const password = encodeURIComponent(document.getElementById('password').value);

        //requestURL.searchParams.append('email', email);
        //requestURL.searchParams.append('password', password);

        const requestBody = JSON.stringify({
            username: email,
            password: password,
        });

        request.open('POST', requestURL.toString() , false);
        request.setRequestHeader('Content-Type', 'application/json')
        request.send(requestBody);

        console.log(request.response);
        console.log(request.status);

        const data = request.response.toString().substring(1, request.response.toString().length-2);

        switch (request.status){
            case 200:
                console.log('success');
                localStorage.setItem('USER_TOKEN', `Bearer ${data}`)
                window.location.href = '../../../index.html';
                break;
            default:
                console.log('bad');
        }
    };
})

/*
function login() {
    const nameValue = document.getElementById('email').value;
    const passValue = document.getElementById('password').value;
    let accessToken = '';
    console.log(nameValue + ' ' + passValue)
    const data = JSON.stringify({
        username: nameValue,
        password: passValue,
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // eslint-disable-next-line func-names
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            const result = JSON.parse(this.responseText);
            accessToken = result.token;
            // eslint-disable-next-line no-console
            console.log(accessToken);
            sessionStorage.setItem('token', `Bearer ${accessToken}`);
            localStorage.setItem('test', 1);
            // document.getElementById('signup-form').submit();
            console.log(accessToken);
            if(accessToken!==''){
                alert(`hello ${data.username}`);
            }
            else{
                alert('wrong data, try again');
            }
        }
    });


    xhr.open('POST', 'http://127.0.0.1:5000/login');
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(data);
}
*/

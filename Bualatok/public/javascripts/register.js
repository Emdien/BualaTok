function check() {
    if (document.getElementById('inputPassword').value ==
        document.getElementById('inputRPassword').value) {
            
        document.getElementById('inputRPassword').style.borderColor = 'green';
        document.getElementById('inputPassword').style.borderColor = 'green';
    } else {
        document.getElementById('inputPassword').style.borderColor = 'red';
        document.getElementById('inputRPassword').style.borderColor = 'red';
    }
}

function passwordValidation() {
    var password = document.getElementById('inputPassword').value;
    var rpassword = document.getElementById('inputRPassword').value;

    var credito = document.getElementById('inputCredits');

    if (credito.value == ''){
        credito.value = 0;
    }

    if (password != rpassword) {
        console.log('ERROR!!!!')
        document.getElementById('error-msg').innerHTML = 'Las contraseñas no coinciden';
        return false;
    }

    return true;
}


window.onload = function() {
    var inputPassword = document.getElementById('inputPassword');
    var inputRPassword = document.getElementById('inputRPassword');
    
    document.getElementById('registerform').onsubmit = passwordValidation;

    inputPassword.addEventListener('keyup', check);
    inputRPassword.addEventListener('keyup', check);

    
}

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

function validation() {
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

function creditValidation() {
    var credito = document.getElementById('inputCredits');

    if (credito.value == ''){
        credito.value = 0;
    }
}



window.onload = function() {
    var inputPassword = document.getElementById('inputPassword');
    var inputRPassword = document.getElementById('inputRPassword');
    var registerForm = document.getElementById('registerform');
    var passwordForm = document.getElementById('form-password');
    var creditForm = document.getElementById('form-credito');
    
    if (registerForm != null || registerForm != undefined){
        
        registerForm.onsubmit = validation;     
        
    }

    if (passwordForm != null || passwordForm != undefined){
        
        passwordForm.onsubmit = validation;     
        
    }
    
    if (creditForm != null || creditForm != undefined){
        
        creditForm.onsubmit = creditValidation;     
        
    }
    inputPassword.addEventListener('keyup', check);
    inputRPassword.addEventListener('keyup', check);

    
}

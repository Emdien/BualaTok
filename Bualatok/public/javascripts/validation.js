var peticion_http = null;
var current_pwd = false;

function checkCurrentPassword() {
    peticion_http = new XMLHttpRequest();
    peticion_http.onreadystatechange = comparePasswords;
    peticion_http.open("GET", "/settings/checkCurrentPassword", true);
    peticion_http.send();
}

function comparePasswords() {
    if (peticion_http.readyState == 4){
        if (peticion_http.status == 200) {
            var response = peticion_http.responseText;
            var resjson = JSON.parse(response);

            console.log(resjson);

            var cpassword = document.getElementById('inputCurrentPassword').value;

            if (resjson.password != cpassword) {
                document.getElementById('inputCurrentPassword').style.borderColor = 'red';
                current_pwd = false;
                document.getElementById('pwd_button').disabled = true;
            }

            else {
                document.getElementById('inputCurrentPassword').style.borderColor = 'green';
                current_pwd = true;
                document.getElementById('pwd_button').disabled = false;
            }

           
        }
    }
}

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

    if (!current_pwd) return false;
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
    var inputCPassword = document.getElementById('inputCurrentPassword')
    var registerForm = document.getElementById('registerform');
    var passwordForm = document.getElementById('form-password');
    var creditForm = document.getElementById('form-credito');
    
    if (registerForm != null || registerForm != undefined){
        
        registerForm.onsubmit = validation;     
        
    }

    if (passwordForm != null || passwordForm != undefined){
        
        passwordForm.onsubmit = validation;  
        inputCPassword.addEventListener('focusout', checkCurrentPassword);    
        
    }
    
    if (creditForm != null || creditForm != undefined){
        
        creditForm.onsubmit = creditValidation;     
        
    }
    inputPassword.addEventListener('keyup', check);
    inputRPassword.addEventListener('keyup', check);

    document.getElementById('pwd_button').disabled = true;

    
}

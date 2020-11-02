const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2= document.getElementById('password2');

// show input error massage 
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className= 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// show success outline
function showSucces(input) {
    const formcControl = input.parentElement;
    formcControl.className= 'form-control success';
}
// Check email with regex 
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSucces(input);
    } else { 
        showError(input, 'Email is not valid');
    }
}

// check required field
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim()=== '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSucces(input);
        }

    });
}

// check input Length
function checkLength(input, min , max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} Must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSucces(input);
    }
}

// check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords dont match');
    }
}

// get fieldname
function getFieldName(input) {
    // 1. letter uppercase - upper 0 field, join started with 1 to make 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if(!checkRequired([username,email,password, password2])){

        checkLength(username, 4, 27);
        checkLength(password, 6, 33);
        checkEmail(email);
        checkPasswordsMatch(password,password2);
    }
});



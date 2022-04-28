const ele = document.getElementById("resetbutton");

ele.addEventListener('click', resetPassword);

function resetPassword(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    // let oldPassword = document.getElementById('oldPassword').value;
    let newPassword = document.getElementById('confirmPassword').value;
    let newConfirmPassword = document.getElementById('newConfirmPassword').value;
    let uniqueCode = document.getElementById('uniqueCode').value;
    
    let data = {
        user_email: email,
        // user_password: oldPassword,
        new_user_password: newPassword,
        confirm_new_user_password: newConfirmPassword,
        unique_code: uniqueCode
    }
    fetch('https://p8zobxufy0.execute-api.us-east-1.amazonaws.com/default/user-reset_password', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        if (data.status === 200) {
            localStorage.setItem('user_email', email);
            window.location.replace("index.html");
        } else if (data.status === 422) {
            console.log(data.body);
            let errors = data.body;
            let output = "";
            errors.forEach(element => {
                output += `
                <div class="error_signup">
                    <li>${element}</li>
                </div>
                `
            });
            document.getElementById('errors').innerHTML = output;

            // console.log(data.statusText);
        }
    })
}
// JavaScript (app.js)

// for sign up to store the data

let signup = document.querySelector("#signup").addEventListener("click" ,sign)

function sign(){
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confPassword").value;
      
        if (password === confirmPassword && password !== "") {
          // Get existing users from localStorage or create an empty array
          let users = JSON.parse(localStorage.getItem("users")) || [];
    
            // Check if the user already exists
            let userExists = users.find(user => user.email === userName);
    
            if (userExists) {
                alert("This email address already exists in our database");
            } else {
                // Add the new user to the array
                users.push({ email: userName, password: password });
    
                // Save the updated array back to localStorage
                localStorage.setItem("users", JSON.stringify(users));
    
                alert("Your data has been stored in our database");
                document.getElementById("password").value = "";
                document.getElementById("confPassword").value = "";
                document.getElementById("userName").value = "";
            }
        } else {
            alert("Password is mismatched or empty. Please enter the correct password.");
        }
  
    
}

//---  now for login ---user eneter on login then go the user page.html

document.querySelector("#login").addEventListener("click",()=>{
//  var x =   localStorage.users
//  console.log(x)

    let LoginName = document.getElementById("loginName").value
    let LoginPassword = document.getElementById("LoginPassword").value
    console.log(LoginName)

    
    let arrayData = JSON.parse(localStorage.getItem("users"));

    let isLoggedIn = false;

    arrayData.forEach(element => {
        if (element.email === LoginName && element.password === LoginPassword) {
            isLoggedIn = true;
            window.open(`user page.html?user=${LoginName}`, "_self"); 
            LoginName.value = ""            
            LoginPassword.value = ""            
        }
    });

    if (!isLoggedIn) {
        alert("Email or Password Wrong");
    
    }
})

///// =============>>>>user login page end<<<<==================////










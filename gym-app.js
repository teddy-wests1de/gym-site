'use strict'
// Link html elements
const navMenu = document.querySelector('.nav');
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu');
const loginMenu = document.querySelector('.login-menu');
const btnLogin = document.querySelector('.btn-login');
const loginForm = document.querySelector('.login-form');
const login = document.querySelectorAll('.login');
const adminMenu = document.querySelector('.admin-menu')
const accountLogin = document.querySelector('.account-login');
const accountRegister = document.querySelector('.account-register')
const btnProfile = document.querySelector('.btn-profile');
const welcomeText = document.querySelector('.welcome-text');
const sections = document.querySelectorAll('section');
const profileInfo = document.querySelector('.profile-info');

// Login
const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const screenLogin = document.querySelector('.screen-login');


// Register Users
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const newPassword = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');
const btnRegister = document.querySelector('.btn-register');
const registerForm = document.querySelector('.register-form');
const screenRegister = document.querySelector('.screen-register');

class User {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isLoggedIn = false;
    }

    // Method to log in
    login() {
        this.isLoggedIn = true;
        console.log(`${this.username} is now logged in.`);
    }
    
    // Method to log out
    logout() {
    this.isLoggedIn = false;
    console.log(`${this.username} has been logged out.`);
  }

    // Get status
    getStatus() {
        const status = this.isLoggedIn ? 'Logged In' : 'Logged Out';
        return `${this.firstName} is currently ${status}`;
    }
}

// const elrico = new User('Elrico', 'Landrew', '8109015183081')
// console.log(elrico._getFullName());

class Member extends User {
    constructor(firstName, lastName) {
        super(firstName, lastName);
        // this.memberID = memberID
    }

}

// class Blog {
//     id = (Date.now() + '').slice(-10);
//     blogs = [];
//     constructor(name, description){
//         this.name = name;
//         this.description = description;
//         console.log(this.id, this.name);
//     }
// }

class Trainer extends User {
    #password;
    constructor(firstName, lastName, password, trainerID) {
        super(firstName, lastName);
        this.trainerID = trainerID;
        this.#password = password;
    }
}

// Main App
class App {
    // #loggedIn = false;
    #users = [];
    #currentUser;
    constructor() {
        // navMenu.addEventListener('click')
        mobileBtn.addEventListener('click', this._toggleMenu.bind(this));
        menu.addEventListener('click', this._menuOptions.bind(this));
    
        // Register & Login form Submit events
        registerForm.addEventListener('submit', this._showSuccess.bind(this));
        loginForm.addEventListener('submit', this._checkLogin.bind(this));
        
        this._logout();

        // Toggle Admin/Profle menu
        btnProfile.addEventListener('click', this._adminOptions.bind(this))
        adminMenu.addEventListener('click', this._adminOptions.bind(this));
        btnRegister.addEventListener('click', this._registerUser.bind(this));
     
        screenRegister.addEventListener('click', this._screenRegister.bind(this));
    }

    _toggleMenu(e) {
        e.preventDefault();
        const clicked = e.target;
        // Toggle Main mobile menu
        if(clicked.dataset.type !== 'login') {
            menu.classList.toggle('hidden');
        }
        
    }

    _menuOptions(e) {
        e.preventDefault();
        const clicked = e.target;
        // Guard clause for login menu
        if(clicked.classList.contains('profile')) {
            this._adminOptions(e);
        }

        if(clicked.dataset.action === 'logout') {
            // this.#loggedIn = false;
            this._logout();
            adminMenu.classList.add('hidden');
            // this._checkLogin();
        }

        // Hide main menu on item clicked
        if(!clicked.classList.contains('btn-profile')) {
            // console.log(clicked)
            menu.classList.add('hidden');
        }
    }

    _adminOptions(e) {
        if(e.target.dataset.type === 'login') { // Toggle Admin Menu
            adminMenu.classList.toggle('hidden');
        }
        if(e.target.dataset.type !== 'login') {
            adminMenu.classList.add('hidden');
            // console.log(adminMenu)
            document.querySelector(`.screen-${e.target.dataset.action}`).classList.remove('hidden');
        }
        console.log(e.target);
    }

    _validateForm (...inputs) {
        const allCompleted = Array.from(inputs).every(input => input.value.trim() !== '');

        if(allCompleted) {
            return true;
        } else {
            return false
        }
     }

    _registerUser(e) { // Register Button on Register Form
        e.preventDefault();
        if(this._validateForm(firstName, lastName, newPassword, confirmPassword)) {
            // Register the user
            const user = new User(firstName.value, lastName.value);
            this.#users.push(user)
            this._createUserNames(this.#users);
            screenRegister.classList.add('hidden');
            // this._showSuccess();
            console.log(`Form Completed Successfully...!`)
        } else {
            console.log(`Incomplete Form...!`)
        }
    }

    _createUserNames(users) {
        users.forEach(user => {
            user.userName = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`;
            console.log('User created successfully...!!! 👍')
        })
    }

    _listUsers () {
        // console.log(this.#users);
    }
    _checkLogin(e) {
        e.preventDefault();
        if(this._validateForm(userName, password)) {
            this.#currentUser = this.#users.find(user => user.userName === userName.value);
            this.#currentUser.isLoggedIn = true;
            this._showProfile(this.#currentUser);
            console.log(this.#currentUser);
            screenLogin.classList.add('hidden');
        } else {
            console.log('Please Enter your username and password to login...!');
        }
    }
    
    _getAdminMenu() {
        adminMenu.innerHTML = '';
        const html = `
        <div class="logout-menu">
            <div class="account profile" data-action="profile">Profile</div>
            <div class="account profile" data-action="profile">Workouts</div>
            <div class="account profile" data-action="users">Users</div>
            <div class="account profile" data-action="blogs">Blogs</div>
            <div class="account profile logout" data-action="logout">Logout</div>
        </div>
        `
        adminMenu.insertAdjacentHTML('beforeend', html);
    }

    _logout() {
        adminMenu.innerHTML = '';
        const html = `
        <div class="login-menu">
            <div class="account-login profile" data-action="login">Login</div>
            <div class="account-register profile" data-action="register">Register</div>
        </div>
        `
        adminMenu.insertAdjacentHTML('beforeend', html);
        this._hideProfile();
    }


    _showProfile(user) {
        // Display Logged in User Information
        const sectionList = Array.from(sections)
        sectionList.forEach(sl => sl.style.display = 'none');
        sectionList[0].style.display = 'block';
        sectionList[sectionList.length -1].style.display = 'block';
        document.querySelector('.welcome-text').textContent = `Welcome, ${user.firstName}`;
        console.log(user.firstName, user.lastName);
        profileInfo.textContent = `This is the profile page for ${user.firstName} ${user.lastName}`

        // Call function to display user Training Info
        
    }

    _hideProfile() {
        const sectionList = Array.from(sections);
        sectionList.forEach(sl => sl.style.display = 'block');
        sectionList[sectionList.length -1].style.display = 'none';
    }
    _screenRegister(e) {
        e.preventDefault();
        const closeWindow = e.target;
        if(e.target.classList.contains('screen-register')){
            this._displayRegisterForm();
            screenRegister.classList.add('hidden');
        }
    }
    _displayRegisterForm() {
        screenRegister.innerHTML = '';
        const html = `
        <form action="" class="form register-form">
            <h2>Register</h2>
            <div class="form-field"><input type="text" name="first-name" id="first-name" placeholder="ex._John"></div>
            <div class="form-field"><input type="text" name="last-name" id="last-name" placeholder="ex._Doe"></div>
            <div class="form-field"><input type="password" name="new-password" id="new-password" placeholder="New Password"></div>
            <div class="form-field"><input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password"></div>
            <div class="form-field"><button type="submit" class="btn-account btn-register">Register</button></div>
        </form>
        `
        screenRegister.insertAdjacentHTML('afterbegin', html);
    }
    _showSuccess() {
        screenRegister.innerHTML = '';
        const html = `
        <div class="success-screen">
            <div class="success-icon"><i class="fa-solid fa-circle-check" style="color: #18b630;"></i></div>
            <div class="success-message">
                <h3 class="success">User registered successfully...!</h3>
            </div>
        </div>
        `
        screenRegister.insertAdjacentHTML("afterbegin", html);
    }
}

const app = new App();
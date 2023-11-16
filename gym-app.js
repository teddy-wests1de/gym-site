'use strict'
// Link html elements
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu');
const loginMenu = document.querySelector('.login-menu');
const btnLogin = document.querySelector('.btn-login');
const form = document.querySelectorAll('.form');
const login = document.querySelectorAll('.login');
const adminMenu = document.querySelector('.admin-menu')
const accountLogin = document.querySelector('.account-login');
const accountRegister = document.querySelector('.account-register')
const btnProfile = document.querySelector('.btn-profile');
const welcomeText = document.querySelector('.welcome-text');
const sections = document.querySelectorAll('section');
const profileInfo = document.querySelector('.profile-info');

// Register Users
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const newPassword = document.querySelector('#new-password');
const confirmPassword = document.querySelector('#confirm-password');
const btnRegister = document.querySelector('.btn-register');
const registerForm = document.querySelector('.register-form');
const screenRegister = document.querySelector('.screen-register');

class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        // this.id = id;
    }

    _getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// const elrico = new User('Elrico', 'Landrew', '8109015183081')
// console.log(elrico._getFullName());

class Member extends User {
    constructor(firstName, lastName, id, memberID) {
        super(firstName, lastName, id);
        this.memberID = memberID
    }

    _getBlogs(blogs) {

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
    #loggedIn = false;
    #users = [];
    constructor() {
        mobileBtn.addEventListener('click', this._toggleMenu.bind(this));
        menu.addEventListener('click', this._menuOptions.bind(this));
    
        // Register & Login form Submit events
        form.forEach(frm => frm.addEventListener('submit', this._checkLogin.bind(this)));
        this._logout();
        
        // Toggle Admin/Profle menu
        btnProfile.addEventListener('click', this._adminOptions.bind(this))
        adminMenu.addEventListener('click', this._adminOptions.bind(this));
        btnRegister.addEventListener('click', this._registerUser.bind(this));
     
        screenRegister.addEventListener('click', this._screenRegister.bind(this));
        registerForm.addEventListener('submit', this._showSuccess.bind(this));
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

        if(clicked.dataset.action === 'login') {
            this.#loggedIn = true;
            this._getAdminMenu();
            adminMenu.classList.add('hidden');
            this._checkLogin();
        }
        if(clicked.dataset.action === 'logout') {
            this.#loggedIn = false;
            this._logout();
            adminMenu.classList.add('hidden');
            this._checkLogin();
        }

        // Hide main menu on item clicked
        if(!clicked.classList.contains('btn-profile')) {
            // console.log(clicked)
            menu.classList.add('hidden');
        }
    }

    _adminOptions(e) {
        if(e.target.dataset.type === 'login') {
            adminMenu.classList.toggle('hidden');
        }
        if(e.target.dataset.type !== 'login') {
            adminMenu.classList.add('hidden');
            // console.log(adminMenu)
        }

        if(e.target.dataset.action === 'register') {
            document.querySelector(`.screen-${e.target.dataset.action}`).classList.remove('hidden');
        }
    }
    _validate (...inputs) {
        // console.log(Array.from(inputs));
        Array.from(inputs).forEach(i => {
            if(i !== '') {
                // console.log('True');
            }
        })

     }

    _registerUser(e) {
        e.preventDefault();
        this._displayRegisterForm();
        // if(this._validate(firstName.value, lastName.value, newPassword.value)) {
        const user = new Trainer(firstName.value, lastName.value, newPassword.value, 111);
        this.#users.push(user);
        this._listUsers();
        this._validate(firstName.value, lastName.value, newPassword.value);
        
        this._showSuccess();
        console.log(e.target);
    }

    _listUsers () {
        // console.log(this.#users);
    }
    _checkLogin(e) {
        // e.preventDefault();
        login.forEach(l =>  l.classList.add('hidden'));
        if(this.#loggedIn === true) {
            welcomeText.textContent = `Welcome ${this.#users[0].firstName}`;
            this._showProfile(this.#users[0]);
            this.#loggedIn = false;
        } else {
            welcomeText.textContent = 'Successfully Logged out...!';
            this.#loggedIn = true;
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
        const sectionList = Array.from(sections)
        sectionList.forEach(sl => sl.style.display = 'none');
        sectionList[0].style.display = 'block';
        sectionList[sectionList.length -1].style.display = 'block';

        profileInfo.textContent = `This is the profile page for ${user._getFullName()}`
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
        screenRegister.classList.add('hidden');
        
        }
    }
    _displayRegisterForm() {
        screenRegister.innerHTML = '';
        // const html = `
        // <form action="" class="form register-form">
        //     <h2>Register</h2>
        //     <div class="form-field"><input type="text" name="first-name" id="first-name" placeholder="ex._John"></div>
        //     <div class="form-field"><input type="text" name="last-name" id="last-name" placeholder="ex._Doe"></div>
        //     <div class="form-field"><input type="password" name="new-password" id="new-password" placeholder="New Password"></div>
        //     <div class="form-field"><input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password"></div>
        //     <div class="form-field"><button type="submit" class="btn-account btn-register">Register</button></div>
        // </form>
        // `
        // screenRegister.insertAdjacentHTML('afterbegin', html);
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
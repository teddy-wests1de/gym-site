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
    constructor(firstName, lastName, memberID, trainerID) {
        super(firstName, lastName);
        this.memberID = memberID;
        this.trainerID = trainerID;
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

        // const blog = new Blog('Test', 'Testing Blog');
        this._registerUser();
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
            console.log(clicked)
            menu.classList.add('hidden');
        }

    }

    _adminOptions(e) {
        if(e.target.dataset.type === 'login') {
            adminMenu.classList.toggle('hidden');
        }
        if(e.target.dataset.type !== 'login') {
            adminMenu.classList.add('hidden');
            console.log(adminMenu)
        }
    }

    _registerUser(user) {
        const trainer1 = new Trainer('Riccardo', 'Rosseau', 123, 111);
        this.#users.push(trainer1);
        this._listUsers();
    }

    _listUsers () {
        console.log(this.#users);
    }
    _checkLogin(e) {
        // e.preventDefault();
        login.forEach(l =>  l.classList.add('hidden'));
        if(this.#loggedIn === true) {
            welcomeText.textContent = `Welcome ${this.#users[0].firstName}`
        } else {
            welcomeText.textContent = 'Successfully Logged out...!';
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
    }


    _showProfile(user) {
        
    }
}

const app = new App();
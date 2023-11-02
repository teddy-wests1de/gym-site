'use strict'
// Link html elements
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu');
const loginMenu = document.querySelector('.login-menu');
const btnLogin = document.querySelector('.btn-login');
const form = document.querySelectorAll('.form');
const login = document.querySelectorAll('.login');
// const screen = document.querySelectorAll('.screen')
const accountLogin = document.querySelector('.account-login');
const accountRegister = document.querySelector('.account-register')
// const loginMenu = document.querySelector('.admin-menu');
// Create Classes
class User {
    constructor(firstName, lastName, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }

    _getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

// const elrico = new User('Elrico', 'Landrew', '8109015183081')
// console.log(elrico._getFullName());

class Member extends User {
    constructor(firstName, lastName, id, memberID) {
        
    }
}

// Main App
class App {
    #loggedIn = false;
    #users = [];
    constructor() {
        mobileBtn.addEventListener('click', this._toggleMenu.bind(this));
        menu.addEventListener('click', this._toggleMenu.bind(this));
    
        form.forEach(frm => frm.addEventListener('submit', this._checkLogin.bind(this)));
        console.log(this.#loggedIn)
        // this._checkLogin();
    }

    _toggleMenu(e) {
        e.preventDefault();
        const clicked = e.target;

        // Toggle Profile Login menu
        if(clicked.dataset.type === 'login') {
            loginMenu.classList.toggle('hidden')
            console.log(clicked)
        }

        // Toggle Main mobile menu
        if(clicked.dataset.type !== 'login') {
            menu.classList.toggle('hidden');
            // this.#loggedIn = true;
            // this._checkLogin()
        }
        // console.log(`.screen-${clicked.dataset.action}`)
        
        if(!clicked.classList.contains('profile')) return;
        document.querySelector(`.screen-${clicked.dataset.action}`).classList.remove('hidden')
        // console.log(this.#loggedIn);
        if(clicked.classList.contains('profile')) {
            loginMenu.classList.add('hidden');
        
        }
    }

    _registerUser(user) {

    }

    _checkLogin(e) {
        e.preventDefault();
        login.forEach(l =>  l.classList.add('hidden'));
        this.#loggedIn = true;
        console.log(this.#loggedIn);
        this._getAdminMenu();
    }
    
    _getAdminMenu() {

        const html = `
        <div class="logout-menu">
        <div class="account profile" data-action="profile">Profile</div>
        <div class="account profile" data-action="users">Users</div>
        <div class="account profile" data-action="blogs">Blogs</div>
        <div class="account-logout profile" data-action="logout">Logout</div>
        </div>
        `

        loginMenu.insertAdjacentHTML('afterend', html);
    }
}

const app = new App();
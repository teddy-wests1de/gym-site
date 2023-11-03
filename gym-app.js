'use strict'
// Link html elements
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu');
const loginMenu = document.querySelector('.login-menu');
const btnLogin = document.querySelector('.btn-login');
const form = document.querySelectorAll('.form');
const login = document.querySelectorAll('.login');
// const screen = document.querySelectorAll('.screen')
const adminMenu = document.querySelector('.admin-menu')
const accountLogin = document.querySelector('.account-login');
const accountRegister = document.querySelector('.account-register')
const btnProfile = document.querySelector('.btn-profile');

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
        menu.addEventListener('click', this._menuOptions.bind(this));
    
        // Register & Login form Submit events
        form.forEach(frm => frm.addEventListener('submit', this._checkLogin.bind(this)));
        this._logout();
        
        // Toggle Admin/Profle menu
        btnProfile.addEventListener('click', this._adminOptions.bind(this))
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
        if(!clicked.classList.contains('profile')) return;

        if(clicked.dataset.action === 'login') {
            this.#loggedIn = true;
            this._getAdminMenu();
            adminMenu.classList.add('hidden');
        }
        if(clicked.dataset.action === 'logout') {
            this.#loggedIn = false;
            this._logout();
            adminMenu.classList.add('hidden');
        }

        console.log(clicked.dataset.action)

    }

    _adminOptions() {
        adminMenu.classList.toggle('hidden');
    }
    _registerUser(user) {

    }

    _checkLogin(e) {
        // e.preventDefault();
        login.forEach(l =>  l.classList.add('hidden'));
        // this.#loggedIn = true;
        // console.log(this.#loggedIn);
        // this._getAdminMenu();
    }
    
    _getAdminMenu() {
        adminMenu.innerHTML = '';
        const html = `
        <div class="logout-menu">
            <div class="account profile" data-action="profile">Profile</div>
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

}

const app = new App();
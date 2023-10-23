'use strict'
// Link html elements
const mobileBtn = document.querySelector('.mobile-btn');
const menu = document.querySelector('.menu');
const loginMenu = document.querySelector('.login-menu');
const btnLogin = document.querySelector('.btn-login');
const form = document.querySelectorAll('.form');
const login = document.querySelectorAll('.login');
// Create Classes


// Main App
class App {
    #loggedIn = false;

    constructor() {
        mobileBtn.addEventListener('click', this._toggleMenu.bind(this));
        menu.addEventListener('click', this._toggleMenu.bind(this));
        // loginMenu.addEventListener('click', function(){
        //     loginMenu.classList.remove('hidden');
        // })
        form.forEach(frm => frm.addEventListener('submit', function(e){
            e.preventDefault();
            login.forEach(l =>  l.classList.add('hidden'));
        }))

        this._checkLogin();
    }

    _toggleMenu(e) {
        e.preventDefault();
        const clicked = e.target;
        if(clicked.dataset.type === 'login') {
            loginMenu.classList.toggle('hidden')
        }
        if(clicked.dataset.type !== 'login') {
            menu.classList.toggle('hidden');
            // this.#loggedIn = true;
            console.log(clicked)
            this._checkLogin()
        }
        
        
    }

    _checkLogin() {
        // if(this.#loggedIn) {
        //     alert('Logged In Successfully...!');
        // }

    }
    
}

const app = new App();
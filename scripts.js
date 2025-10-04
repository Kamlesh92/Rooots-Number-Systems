// scripts.js

const loginBox = document.getElementById('loginBox');
const menuBox = document.getElementById('menuBox');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const userDisplay = document.getElementById('userDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const menuList = document.querySelector('.menu-list');

function saveUser(user) {
  localStorage.setItem('roootsUser', JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem('roootsUser'));
}

function showLogin() {
  loginBox.classList.remove('hidden');
  menuBox.classList.add('hidden');
}

function showMenu(user) {
  loginBox.classList.add('hidden');
  menuBox.classList.remove('hidden');
  userDisplay.textContent = user.username;
}

function validateLogin(username, password) {
  // List of stored users in localStorage
  let users = JSON.parse(localStorage.getItem('roootsUsers') || '[]');
  return users.find(user => user.username === username && user.password === password);
}

function signup(username, password) {
  let users = JSON.parse(localStorage.getItem('roootsUsers') || '[]');
  // Check if username already exists
  if(users.find(user => user.username === username)) {
    return false; // Username taken
  }
  users.push({username, password});
  localStorage.setItem('roootsUsers', JSON.stringify(users));
  return true;
}

// On page load, check user session
window.onload = () => {
  let user = getUser();
  if(user && user.username) {
    showMenu(user);
  } else {
    showLogin();
  }
};

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = this.username.value.trim();
  const password = this.password.value.trim();

  if(!username || !password) {
    loginMessage.textContent = 'Please enter username & password';
    return;
  }

  let user = validateLogin(username, password);
  if(user) {
    saveUser(user);
    loginMessage.textContent = '';
    showMenu(user);
  } else {
    // Signup attempt
    if(signup(username, password)) {
      let newUser = {username, password};
      saveUser(newUser);
      loginMessage.textContent = 'Signup successful! You are logged in.';
      showMenu(newUser);
    } else {
      loginMessage.textContent = 'Username taken, try another';
    }
  }
});

// Handle menu button clicks for navigation
menuList.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON') {
    const page = e.target.getAttribute('data-page');
    if(page) {
      window.location.href = page;
    }
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('roootsUser');
  showLogin();
  loginForm.reset();
});

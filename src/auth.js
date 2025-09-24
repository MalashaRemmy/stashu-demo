class AuthManager {
    constructor() {
        this.userKey = 'stashu_user';
        this.usersKey = 'stashu_users';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const loginForm = document.getElementById('loginFormElement');
        const signupForm = document.getElementById('signupFormElement');
        const showSignupBtn = document.getElementById('showSignupBtn');
        const showLoginBtn = document.getElementById('showLoginBtn');
        const userAvatar = document.getElementById('userAvatar');
        const authContainer = document.getElementById('authContainer');
        const dashboard = document.getElementById('dashboard');

        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('signupForm').style.display = 'block';
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            this.login(email, password);
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            this.signup(name, email, password, confirmPassword);
        });

        userAvatar.addEventListener('click', () => {
            const user = this.getCurrentUser();
            if (user && confirm(`Are you sure you want to log out, ${user.name}?`)) {
                this.logout();
                authContainer.style.display = 'none';
                dashboard.style.display = 'none';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey)) || [];
    }

    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.userKey));
    }

    setCurrentUser(user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userAvatar').textContent = user.name.split(' ').map(n => n[0]).join('');
    }

    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.setCurrentUser(user);
            document.getElementById('authContainer').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Invalid email or password');
        }
    }

    signup(name, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const users = this.getUsers();
        if (users.some(u => u.email === email)) {
            alert('Email already exists');
            return;
        }

        const user = { name, email, password };
        users.push(user);
        this.saveUsers(users);
        this.setCurrentUser(user);
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        alert('Account created successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    logout() {
        localStorage.removeItem(this.userKey);
        document.getElementById('userName').textContent = '';
        document.getElementById('userAvatar').textContent = '';
    }
}
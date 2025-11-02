/* Simple auth demo using localStorage. Keys used:
   - ew_users : JSON array of users {fullname,email,password}
   - ew_currentUser : email of logged-in user

   WARNING: This stores passwords in plain text in localStorage — only for demos.
*/

function _getUsers(){
  const raw = localStorage.getItem('ew_users');
  return raw ? JSON.parse(raw) : [];
}
function _saveUsers(users){
  localStorage.setItem('ew_users', JSON.stringify(users));
}

function registerUser(fullname, email, password){
  if (!fullname || !email || !password) return 'All fields required.';
  const users = _getUsers();
  if (users.find(u => u.email === email)) return 'Email already registered.';
  users.push({fullname, email, password});
  _saveUsers(users);
  return true;
}

function loginUser(email, password){
  const users = _getUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (u) {
    localStorage.setItem('ew_currentUser', email);
    return true;
  }
  return false;
}

function logout(){
  localStorage.removeItem('ew_currentUser');
}

function requireAuth(){
  const cur = localStorage.getItem('ew_currentUser');
  if (!cur) {
    // redirect to login with a return URL
    const returnTo = encodeURIComponent(window.location.pathname.replace(/^\//, ''));
    window.location.href = 'login.html?to=' + returnTo;
  }
}

function getCurrentUser(){
  const email = localStorage.getItem('ew_currentUser');
  if (!email) return null;
  const users = _getUsers();
  return users.find(u => u.email === email) || null;
}

// If login page has ?to=..., redirect after login
(function(){
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  if (params.has('auto')){
    // placeholder
  }
})();
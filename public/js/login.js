function login(){
    handleLogin();
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
function checkCookie(cname) {
    let ck = getCookie(cname);
    if (ck != "") {
        return ck;
    } 
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function login() {
    let email = document.getElementById('loginEmail');
    let pwd = document.getElementById('loginPassword');

    let url = `${pre}/login`;
    let params = `email=${email.value}&&pwd=${pwd.value}`;

    // if (email.value == '') { alert('Enter username!'); return;}
    // if (pwd.value == '') { alert('Enter password!'); return;}

    root.innerHTML = loader('primary', 'verifying credentials')
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            let response = this.response;
            let user = JSON.parse(response);
            let token = user.token;
            let username = user.username;
            let avatar = user.avatar;
            setCookie('token', token, 1);
            setCookie('username', username, 1);
            setCookie('avatar', avatar, 1);
            document.getElementById('notification').innerHTML +=  welcome(username, avatar)
            document.getElementById('root').innerHTML = fetchAllInvoices();

        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}

function welcome(user, avatar){
    return `
    
    <div class="d-flex align-items-center text-secondary" style="font-size:10px;"> 
        <img src="${avatar}" width="25" class="rounded rounded-circle ">
        <small class="ms-1 text-center">${user}</small>
    </div>`
}
async function fetchInvs() {
    // let ac = JSON.parse(activeUser);
    // tk = ac.token;
    let url = `${pre}/invs`;
    let params = `tk=${lgToken}`;

    root.innerHTML = loader('primary', 'fetchin invs')
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {

            let response = this.response;
            let data = JSON.parse(response)
            root.innerHTML = response;
            let html = `<div class="mx-auto container-md pb-5 pt-3" style="width:100%;">`;
            data.forEach( d => {
                if (d.isHide == 'false' || d.status == 'unpaid') {   html += htmlFetchAllInvoice(d) };
            });
            html += `</div>`
           root.innerHTML = html;
        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}

let lgUsername = null;
let lgToken = null;
let lgAvatar = null;
function initAppLogin(){
    if (checkCookie('username')) { 
        lgUsername = checkCookie('username') 
        document.getElementById('notification').innerHTML = welcome(lgUsername, '');
    }
    if (checkCookie('token')) { 
        lgToken = checkCookie('token') 

    }
    if (checkCookie('avatar')) { 
        lgAvatar = checkCookie('avatar') 
        document.getElementById('notification').innerHTML = welcome(lgUsername, lgAvatar);
    }
}
function logOut(){
    setCookie('token', '', -5);
    setCookie('username', '', -5);
    setCookie('avatar', '', -5);
    document.getElementById('notification').innerHTML = '';
    
}

initAppLogin();



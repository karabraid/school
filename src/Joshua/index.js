function whenClick(href) {
  var body = document.body;
  body.innerHTML = `
  <label for="password">Enter password: </label><br>
  <input type="password" size="30" placeholder="Password" id="password" onfocus="background-color: yellow;" onblur="background-color: white;">
  <button onclick="checkPassword('${href}');">Submit</button>
  <div id="incorrect"></div>`;
}

function checkPassword(href) {
  var password = document.getElementById(`password`).value;
  if (password === "manfred von richthofen1!") {
    document.location = href;
  } else {
    document.getElementById(
      `incorrect`
    ).innerHTML = `Incorrect password. Please try again.`;
    password = ``;
  }
}

window.whenClick = whenClick;
window.checkPassword = checkPassword;

auth0 = new auth0.WebAuth({
  domain:       '{YOUR-AUTH0-DOMAIN}.auth0.com',
  clientID:     '{YOUR-AUTH0-APPLICATION-ID}',
  redirectUri:  'http://localhost:8080',
  responseType: 'token id_token',
  audience:     '{YOUR-AUTH0-API-NAME}',
  scope:        'openid'
});

window.authService = {

  isAuthenticated: function() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  },

  logout: function() {
    auth0.logout();
    app.isLoggedIn = false;
  },

  setSession: function (authResult) {
    app.accessToken = authResult.accessToken;
    app.idToken = authResult.idToken;
  },

  login: function() {
    auth0.authorize();
  },

  handleAuthentication: function() {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {

        console.log(authResult);

        window.location.hash = '';
        app.isLoggedIn = true;
        authService.setSession(authResult);

      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    })
  },
  checkSession: function(){
    auth0.checkSession({}, function (err, authResult) {
        console.log(authResult);
        if(err){
          alert(`Error: ${err.error}. Check the console for further details.`);
          console.log(err);
        } else {
          authService.setSession(authResult);
          app.isLoggedIn = true;
        }
    });
  }
};

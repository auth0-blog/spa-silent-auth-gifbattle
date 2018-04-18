var express    = require('express');
var Webtask    = require('webtask-tools');
var bodyParser = require('body-parser');
var request = require('request');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var app = express();

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/.well-known/jwks.json"
    }),
    audience: '{YOUR-AUTH0-API-NAME}',
    issuer: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/",
    algorithms: ['RS256']
});

app.use(bodyParser.json());

app.get('/random', (req, res) => {
  request('http://api.giphy.com/v1/gifs/random?api_key={YOUR-GIPHY-API-KEY}&rating=PG', (error, response, body) => {
    body = JSON.parse(body);
    const gif = {
      id: body.data.id,
      url: body.data.image_original_url
    };
    
    res.json(gif);
  });
});

app.post('/', jwtCheck, (req, res) => {
  var gif = req.body;
  req.webtaskContext.storage.get((err, data)=>{
    data = data || [];
    data.push(gif);
    req.webtaskContext.storage.set(data, (err)=>{
      res.json({message:"Success!"})
    })
  });
});

app.post('/vote', (req, res)=>{
  var gif = req.body;
  
  req.webtaskContext.storage.get((err, data)=>{
    const index = data.findIndex(item => item.id === gif.id);
    data[index].votes += 1;
    
    req.webtaskContext.storage.set(data, (err) =>{
      res.json({message:"Success!"})
    })
  });
})

app.get('/battle', (req, res)=>{
  var response = {};
  req.webtaskContext.storage.get((err, data)=>{
    data = shuffleArray(data);
    response = {
      gif_one: data[0],
      gif_two: data[1]
    }
    res.json(response);
  });
})

app.get('/leaderboard', (req, res)=>{
  req.webtaskContext.storage.get((err, data)=>{
    data.sort((a,b)=>{return b.votes - a.votes});
    res.json(data);
  })
})

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports = Webtask.fromExpress(app);

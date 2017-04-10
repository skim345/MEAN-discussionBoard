var User = require('./../controllers/users.js');
var Comment = require('./../controllers/comments.js');
var Topic = require('./../controllers/topics.js');


module.exports = function(app){
// comment routing
app.post('/createComment', Comment.createComment);
app.post('/voteUp', Comment.voteUp);
app.post('/voteDown', Comment.voteDown);

// topic routing
app.post('/createTopic', Topic.createTopic);
app.get('/getTopics', Topic.getTopics);
app.get('/getSingleTopic/:id', Topic.getSingleTopic);

// user routing
app.post('/register', User.register);
app.post('/login', User.login);
app.get('/showUser/:id', User.showUser);
app.get('/users', User.index);
app.get('/logoff', User.logoff);

}


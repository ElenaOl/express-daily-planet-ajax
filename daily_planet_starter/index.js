var express = require('express');
var partials = require('express-partials'); // https://github.com/publicclass/express-partials
var bodyParser = require('body-parser');
var app = express();

app.use(partials());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));

var articles = [
    { title: 'Bernie! Bernie!', body: '#feelthebern' },
    { title: 'Trump for change!', body: 'Make America Great Again' },
    { title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!' }
];
//start point takes to main site
app.get('/', function(req, res) {
    res.render('index');
});
// takes to articles page
app.get('/articles', function(req, res) {
    res.render('articles/index', { articles: articles });
});

//takes to new articles page
app.get('/articles/new', function(req, res) {
    res.render('articles/new');
});

app.get('/articles/edit/:title', function(req, res) {
    var articleTitle = req.params.title;
    var article = articles.filter(function(article){
      return article.title === articleTitle;
    }).pop();

    res.render('articles/edit', {article: article});
});

//displays specific article
app.get('/articles/:index', function(req, res) {
    var index = parseInt(req.params.index);
    if (index < articles.length && index >= 0) {
        res.render('articles/show', { article: articles[req.params.index] });
    } else {
        res.send('Error');
    }
});

//creates new article
app.post('/articles', function(req, res) {
    articles.push(req.body);
    res.redirect('/articles');
});

//delete article
app.delete('/articles/:title', function(req, res) {
    var articleToDelete = req.params.title;
    console.log("removing this article " + articleToDelete);
    articles = articles.filter(function(article){
        return article.title !== articleToDelete;
    });

    res.redirect('/articles');
});

app.put('/articles/:title', function(req, res){
    var articleNameToEdit = req.params.title;
    console.log("update this article " + articleNameToEdit);
    console.log("update to " + req.body.body);
    
    var articleToEdit = articles.filter(function(article){
        return article.title === articleNameToEdit;
    }).pop();
    
    articleToEdit.body = req.body.body;


    res.send ({mesage: 'success'})
})

app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(3000);

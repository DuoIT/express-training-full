const app = require('./app');

//404 Not found
app.use(function(req, res, next){
    next({
        code: 404,
        data :null
    })
});

// handle error
app.use(function(error, req, res, next){
    return res.status(400).json(error);
});




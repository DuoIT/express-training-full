const express = require('express');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();

router.use(function(req, res, next){
    authMiddleware.auth({req, res, next});
});

router.get('/', function(req, res, next){
    //todo
});
module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/authMiddleware');


router.use(function(req, res, next){
    authMiddleware.auth({req, res, next});
});

router.post('/', function(req, res, next){
    return res.json({
        message: 'Success',
        data: null
    });
});
module.exports = router;
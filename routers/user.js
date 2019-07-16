const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/http/userController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.use(function ({req, res, next}){
    authMiddleware.auth({req, res, next});
})

router.get('/profile', function(req, res, next){
    userController.profile({req, res, next});
  });
  
  router.put('/updateProfile', function(req, res, next){
    userController.updateProfile({req, res, next});
  });
module.exports = router;
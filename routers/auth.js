const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/http/authController');
const {validationResult} = require('express-validator');

const registerValidator = require('../app/validators/register-validator')
//Router register
router.post('/register',registerValidator, function(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);

  authController.register({req, res, next});
});

router.post('/login', function(req, res, next) {
  authController.login({req, res, next});
});

router.use(function ({req, res, next}){
  authMiddleware.auth({req, res, next});
})
router.post('/logout', function(req, res, next){
  authController.logout({req, res, next});
});

module.exports = router;


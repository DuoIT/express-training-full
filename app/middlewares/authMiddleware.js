const jwt = require('json-web-token');
const TokenModel = require('../models/tokenModel');
class authMiddleware {
  constructor() {
    this.tokenModel = TokenModel;
  }
  //auth function
  // router khong path
  //env app nao cung co bien do
  async auth({ req, res, next }) {
    const { headers } = req;
    const token = headers.authorization;
    if (!token) {
      return res.json({
        message: 'no_token!!!',
        data: null
      });
    }
    const tokenLocal = await this.tokenModel.query().where('token', token).first();
    console.log(tokenLocal);
    if (!tokenLocal) {
      return res.json({
        message: 'token_is_not_require!',
        data: null
      });
    }
    const tokenResult = jwt.decode(Env.APP_KEY, tokenLocal.token, function(err,result) {
      if (err) {
        return res.json({
          message: 'decode_is_wrong!!',
          data: null
        });
      }
      return result;
    });
    console.log(tokenResult);
    req.user = tokenResult;
    next();
  }
  noAuth() {
    //TODO sử dụng trong những trường hợp API login cũng được k login cũng được
    //có token mới verifai k thì k cần verifai
  }
}
module.exports = new authMiddleware();

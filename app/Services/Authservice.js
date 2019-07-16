const UserModel = require('../models/userModel');
const TokenModel = require('../models/tokenModel');
const jwt = require('json-web-token');
const codePass = require('../heaper/comparePass');

class AuthService {
    constructor()
    {
        this.userModel = UserModel;
        this.tokenModel = TokenModel;
    }
    // register
  async register(body) {
    if (!body.username || !body.password) {
      return {
        message: 'username_or_password_is_required',
        data: null
      };
    }
    //3
    const user = await this.userModel
      .query()
      .where('username', body.username)
      .first();
    //4
    if (user) {
      return {
        message: 'User_is_exit',
        data: null
      };
    }
    //5
    const password = codePass.createHash(body.password);
    console.log(password);
    
    const dataInsert = {
      username: body.username,
      password,
      name: body.username
    };
    const userInserted = await this.userModel.query().insert(dataInsert);
    let token = jwt.encode(Env.APP_KEY, {
      id: userInserted.id,
      timestamp: new Date().getTime()
    });
    const dataTokenInsert = {
      userid: userInserted.id,
      token: token.value,
      status: 1 //token hien tai - 0 la token cu
    };
    await this.tokenModel.query().insert(dataTokenInsert);
    //khong dunh await vi chi luu lai de quan ly k can thong tin tiep theo.
    return {
      message: 'Register Success!!!!!',
      data: token.value
    };
  }
}
module.exports = new AuthService();
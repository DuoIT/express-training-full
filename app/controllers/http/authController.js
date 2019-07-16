const  AuthService = require('../../Services/Authservice')

class authController {
  constructor() {
    this.authService = AuthService;
  }
  async register({req, res, next}){
    const { body } = req;
    const result = await this.authService.register(body);
    console.log(result);
    return res.json(result)
  }
  //login
  async login({ req, res, next }) {
    const { body } = req;
    if (!body.username || !body.password) {
      return res.json({
        message: 'username_or_password_is_wrong!!!',
        data: null
      });
    }
    const user = await this.userModel
      .query()
      .where('username', body.username)
      .first();
    if (!user) {
      return res.json({
        message: 'username_is_wrong!!!',
        data: null
      });
    }
    if (!codePass.comparePass(body.password, user.password)) {
      return res.json({
        message: 'password_is_wrong!!!',
        data: null
      });
    } 
      const token = jwt.encode(Env.APP_KEY, {
        id: user.id,
        timestamp: new Date().getTime()
      });
      const dataToken = {
        userid: user.id,
        token: token.value,
        status: 1
      };
      await this.tokenModel
        .query()
        .insert(dataToken)
        .where('userid', user.id);
      return res.json({
        message: 'Login_success!!!!',
        data: null,
        token
      });
  }

  //logout
  async logout({ req, res, next }) {
    const { headers } = req;
    const token = headers.authorization;
    if (!token) {
      return res.json({
        message: 'No_exits!',
        data: null
      });
    }
    const tokenData = await this.tokenModel.query().where('token', token).first().delete();
    {
      return res.json({
        message: 'Logout success!!!',
        data: null
      });
    }
  }
}

module.exports = new authController();

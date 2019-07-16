  const UserModel = require('../../models/userModel');

  class userController{
      constructor(){
          this.userModel = UserModel
      }
  //get profile
  async profile({ req, res, next }) {
    const { user } = req;
    console.log(user);
    const users = await this.userModel
      .query()
      .where('id', user.id)
      .first();
    if (!users) {
      return res.json({
        message: 'username_is_wrong!!!!',
        data: null
      });
    }
    return res.json({
      data: {
        id: users.id,
        name: users.name,
        username: users.username,
        create: users.created_at,
        update: users.updated_at
      }
    });
  }
  //update profile
  async updateProfile({ req, res, next }) {
    const { user } = req;
    const { newname } = req.body;
    if (!newname) {
      return res.json({
        message: 'Newname_is_wrong!',
        data: null
      });
    }
    const dataNewName = await this.userModel
      .query()
      .where('id', user.id)
      .first()
      .update({
        name: newname,
        updated_at:new Date()
      });
    if (!dataNewName) {
      return res.json({
        message: 'Newname_not_update!!',
        data: null
      });
    }
    return res.json({
      message: 'update_success!!',
      data: 1
    });
  }
}
module.exports = new userController();
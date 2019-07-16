const Model = require('./model');
class UserModel extends Model{
    constructor(){
        super();
    }

    static get tableName(){
        return 'user';
    }
}

module.exports = UserModel;
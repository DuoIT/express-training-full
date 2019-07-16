const Model = require('./model');
class tokenModel extends Model{
    constructor(){
        super();
    }
    static get tableName(){
        return 'tokens'
    }
}

module.exports = tokenModel;
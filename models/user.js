var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    username: String,
    password: String,
    mail: String,
    salt: String,
    topics: [
        { type: Schema.Types.ObjectId, ref: 'topic' }
    ]
};

var user = new Schema(schema);

exports.model = mongoose.model('User', user);
exports.schema = schema;
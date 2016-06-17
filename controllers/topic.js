var TopicModel = require('mongoose').model('Topic');
var UserModel = require('mongoose').model('User');
var CategoryModel = require('mongoose').model('Category');
function Topic(obj) {
    for (var i in obj) {
        this[i] = obj[i];
    }
}
Topic.getAll = function (fn) {
    TopicModel.find({}).exec(function (err, topicExist){
        if (err) return fn(err);
        //if (!topicExist) return fn(err, 404);
        fn(topicExist);
    })
}
Topic.prototype.create = function (fn) {
    var self = this;
    UserModel.findOne({_id: self.author}).exec(function(err, user) {
        if (err) return fn(err);
        CategoryModel.findOne({_id: self.category}).exec(function (err, category) {
            var topic = new TopicModel(self);
            topic.save(function (err, topic) {
                if (err) return fn(err);
                user.topics.push(topic);
                user.save(function (err) {
                    if (err) return fn(err);
                })
                console.log(category);
                category.topics.push(topic);
                category.save(function (err) {
                    if (err) return fn(err);
                    fn(null, topic);
                })
            })
        })
    })
}
Topic.getTopicById = function (id, fn) {
    TopicModel.findOne({_id:id}).exec(function (err, topic) {
        if (err) return fn(err);
        return fn(topic);
    })
}
module.exports = Topic;

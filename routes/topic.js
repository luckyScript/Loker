var Topic = require('../controllers/topic');
var User = require('../controllers/user');
var Category = require('../controllers/category');

exports.newTopic = function (app) {
    return function (req, res, next) {
        if (!req.session.user) {
            res.render('page',{state: {state: 'login'},session: req.session});
        }
        Category.getAll(function (categorys) {
            var context = {
                state: {
                    state: 'newTopic'
                },
                session: req.session,
                categorys: categorys
            }
            res.render('page',context);
        });
    }
}
exports.newTopicHandle = function (app) {
    return function (req, res, next) {
        var authorName = req.body.author;
        var categoryName = req.body.categoryName;
        User.findIdByName(authorName, function(authorId) {
            Category.findIdByName(categoryName, function (categoryId) {
                var title = req.body.title;
                var content = req.body.content;
                var topic = new Topic({
                    category: categoryId,
                    categoryName: categoryName,
                    author: authorId,
                    authorName: authorName,
                    title: title,
                    content: content
                });
                console.log(topic);
                topic.create(function (err, result) {
                    if (err) return next(err);
                    console.log(result);
                    res.send({"result":1});
                });
            })
        });
    }
}
exports.getTopic = function (app) {
    return function (req, res, next) {
        id = req.params.id;
        Topic.getTopicById(id, function(topic) {
            var context = {
                state: {
                    state: 'topic'
                },
                session: req.session,
                topic: topic
            }
            res.render('page', context);
        })
    }
}

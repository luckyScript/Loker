var Topic = require('../controllers/topic');
var User = require('../controllers/user');
exports.newTopic = function (app) {
    return function (req, res, next) {
        if (!req.session.user) {
            res.render('page',{state: {state: 'login'},session: req.session});
        }
        var context = {
            state: {
                state: 'newTopic'
            },
            session: req.session
        }
        res.render('page',context);
    }
}
exports.newTopicHandle = function (app) {
    return function (req, res, next) {
        var authorName = req.body.author;

        User.findIdByName(authorName, function(id) {
            var authorId = id;
            var title = req.body.title;
            var content = req.body.content;
            var topic = new Topic({
                author: authorId,
                authorName: authorName,
                title: title,
                content: content
            });
            topic.create(function (err, result) {
                if (err) return next(err);
                console.log(result);
                res.send({"result":1});
            });
        });
    }
}

var Topic = require('../controllers/topic');
exports.home = function(app) {
    return function(req, res, next) {
        Topic.getAll(function(topics) {
            var context = {
                state: {
                    state: 'index'
                },
                session: req.session,
                topics: topics
            }
            res.render('page',context);
        });
        //console.log(req.session);

    }
}

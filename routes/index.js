var Topic = require('../controllers/topic');
var Category = require('../controllers/category');
exports.home = function (app) {
    return function (req, res, next) {
        Topic.getAll(function (topics) {
            Category.getAll(function (categorys) {
                var context = {
                    state: {
                        state: 'index'
                    },
                    session: req.session,
                    topics: topics,
                    categorys: categorys
                }
                res.render('page',context);
            });

        });
        //console.log(req.session);

    }
}

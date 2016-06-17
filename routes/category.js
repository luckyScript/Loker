var Category = require('../controllers/category');
exports.newCategory = function (app) {
    return function (req, res ,next) {
        if (!req.session.user) {
            res.render('page',{state: {state: 'login'},session: req.session});
        }
        var context = {
            state: {
                state: 'newCategory'
            },
            session: req.session
        }
        res.render('page',context);
    }
}
exports.newCategoryHandle = function (app) {
    return function (req, res, next) {
        var name = req.body.name;
        var category = new Category ({
			name:name
		});


		category.create(function(err, user) {
console.log(category);
			if (err) return next(err);
			if (user == 409) {
                res.send({"result": "0"});
    			res.statusCode = 409;
                return;
			} else {
				res.statusCode = 200;
                res.send({"result": "1"});
                return;
			}
		})
    }
}

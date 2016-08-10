var Topic = require('../controllers/topic');
var Category = require('../controllers/category');
exports.index = function (app) {
    return function (req, res, next) {
        res.redirect('/page/1');
    }
} 
exports.home = function (app) {
    return function (req, res, next) {
        Topic.getAll(function (topics) {
            Category.getAll(function (categorys) {
                // 每页显示数目
                var eachNum = 5;
                var pageNumTotal = Math.ceil(topics.length/eachNum);
                var pageNum = req.params.page;
                topics = topics.reverse().splice((pageNum-1)*eachNum, 5);
                var pageNumArr = [];
                
                for (var i = 0; i < pageNumTotal; i++) {
                    pageNumArr[i] = i;
                }
              
                var context = {
                    state: {
                        state: 'index'
                    },
                    url: '/page/',
                    currentPage: pageNum,
                    pageNumTotal:pageNumTotal,
                    pageNumArr: pageNumArr,
                    session: req.session,
                    topics: topics,
                    categorys: categorys,
                    currentCategory: "all"
                }
                res.render('page',context);
            });

        });
    }
}

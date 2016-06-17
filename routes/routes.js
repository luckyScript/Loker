module.exports = function (app) {
    var express = require('express');
    var router = express.Router();

    // routes
    var index = require("./index");
    var user = require("./users");
    var topic = require("./topic");
    var category = require("./category");

    /* GET home page. */
    router.get('/', index.home(app));

    /* user router*/
    router.get('/login', user.login(app));
    router.post('/login', user.loginHandle(app));
    router.get('/register', user.register(app));
    router.post('/register', user.registerHandle(app));
    router.get('/logout', user.logout(app));

    /* topic router*/
    router.get('/newTopic', topic.newTopic(app));
    router.post('/newTopic', topic.newTopicHandle(app));
    router.get('/topic/:id', topic.getTopic(app));

    /* category router*/
    router.get('/newCategory', category.newCategory(app));
    router.post('/newCategory', category.newCategoryHandle(app));
    return router;
}

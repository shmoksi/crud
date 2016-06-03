var express = require('express');
var model = require('../models/crud');
var router = express.Router();

var jsonfile = require('jsonfile'),
	util = require('util');

var file = 'data/users.json';

var User = require('mongoose').model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }
        else {
        	res.render('index', {
	            title: 'Crud',
				users: users
	        });
        }
    });
});

/* GET add page. */
router.get('/add', function(req, res, next) {
	res.render('add', {
		title: 'Add new User'
	});
});

/* GET edit page. */
router.get('/edit/:id', function(req, res, next) {
	jsonfile.readFile(file, function(err, obj) {
		obj.forEach(function(index, val) {
			if (index.id == req.params.id) {
				 res.render('edit', {
					title: 'Edit user',
					id: index.id,
					username: index.username,
					age: index.age
				});
				console.log(index.age);
			}
		});
	});
});

router.post('/adduser', model.create); /* POST new user. */

router.put('/edituser', model.update); /* PUT edit user. */

router.delete('/deleteuser', model.delete); /* DELETE user page. */

module.exports = router;
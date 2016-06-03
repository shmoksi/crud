(function() {
	var jsonfile = require('jsonfile'),
		util = require('util');

	var file = 'data/users.json';
	var User = require('mongoose').model('User');


	/* POST new user. */
	exports.create = function(req, res) {
		var user = new User({username: req.body.username, age: req.body.age});
	    user.save(function(err) {
	        if (err) {
	            return next(err);
	        }
	        else {
	            res.send({status: 'ok', location: '/'});
	        }
	    });
	};

	/* PUT edit user. */
	exports.update = function(req, res) {
		jsonfile.readFile(file, function(err, obj) {
			obj.forEach(function(index, val) {
				console.log(index.id == req.body.id);
				if (index.id == req.body.id) {
					index.username = req.body.username;
					index.age = req.body.age;
				}
			});

			jsonfile.writeFile(file, obj, function(err) {
				res.send({status: 'ok', location: '/'});
			});
		});
	};

	/* DELETE user page. */
	exports.delete = function(req, res) {
		jsonfile.readFile(file, function(err, obj) {
			obj.forEach(function(index, val) {
				if (index.id == req.body.id) {
					console.log(val);
					delete obj[val];
					obj = obj.filter(function(item) {
						return item;
					});
				}
			});

			jsonfile.writeFile(file, obj, function(err) {
				res.send({status: 'ok', location: '/'});
			});
		});
	};
})();


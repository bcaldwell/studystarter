var studiesDb = require('./models/studies');

function getTodos(res){
	studiesDb.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
        
        //console.log(req.body.text);
        //console.log(req.body);
        
        var data = req.body;
        

		// create a todo, information comes from AJAX request from Angular
		studiesDb.create({
			text : data.text || "Not Provided",
            studyName:data.studyName || "Not Provided",
            gender:data.gender || "Not Provided",
            longDescription:data.longDescription || "Not Provided",
            shortDescription:data.shortDescription || "Not Provided",
            statDate:data.startDate || "Not Provided",
            endDate:data.endDate || "Not Provided",
            studyLength:data.studyLength || 'Not Provided',
            compensation:data.compensation || 'Not Provided',
            phone:data.phone || 'Not Provided',
            email:data.email || 'Not Provided',
            
            //description: "One small step",
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		studiesDb.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('/adsf', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
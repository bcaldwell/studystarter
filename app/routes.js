var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        console.log("get");
        
        if(req.query.key && req.query.value){
            console.log("Received a search query")
            var key = req.query.key;
            var value = req.query.value
            console.log(key);
            console.log(value);
            //Todo.find({key:value},function(err,docs){
            Todo.find({},function(err,docs){
                var toReturn=[];
                //console.log(err);
               //console.log(docs);
                for (var i = 0; i < docs.length; i++){
                    if(docs[i][key] == value){
                        //console.log('reach for loop search')
                        toReturn.push(docs[i])
                    }
                }
                //console.log(toReturn)
                res.json(toReturn);
            //    res.json(docs);
            })
        }
        
        if(req.query){
            
            if(req.query._id){
                
                console.log("asking for id")
            Todo.find({_id:req.query._id},function(err,docs){

                    res.json(docs)
                });
                
            
            }
                 
            if (req.query.rank){
                console.log("Asking for rank");
                console.log(req.query.rank);
                
//                Todo.find({}, function(err,docs){
//                    res.json(docs)
//                })
                Todo.find({}).sort({rank:-1}).limit(req.query.rank).
                exec(function(err,docs){

                    res.json(docs)
                });
                
            }

        }

        // use mongoose to get all todos in the database
        //getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        
        var data = req.body;
        console.log(data.startDate)
        console.log(data.endDate)

        
        // create a todo, information comes from AJAX request from Angular
        Todo.create({

            studyName: data.studyName || "Not Provided",
            sex: data.sex || "Not Provided",
            age: data.age || "Not Provided",
            summaryDescription: data.summaryDescription || "Not Provided",
            fullDescription: data.fullDescription || "Not Provided",
            startDate: data.startDate || "Not Provided",
            endDate: data.endDate || "Not Provided",
            compensation: data.compensation || 'Not Provided',
            phoneNumber: data.phoneNumber || 'Not Provided',
            email: data.email || 'Not Provided',
            duration: data.duration || 'Not Provided',
            timeLength: data.time || 'Not Provided',
            rank: Math.ceil((Math.random() * 40)),
            researcher:data.researcher || "Not Provided",
            location: data.townCity || "Not Provided",
            otherRequirements: data.otherRequirements || "Not Provided",
            studyType: data.studyType || "Not Provided",
            areaOfInterest: data.areaOfInterest || "Not Provided",

            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('/adsf', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
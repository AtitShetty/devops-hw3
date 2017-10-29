var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient();

var toggleFeature = true;



///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	if(req.url !== "/recent"){

	client.lpush('visit_list', req.url);

	client.ltrim('visit_list', 0,4);
}

	next(); // Passing the request to the next handler in the stack.
});


app.get('/test', function(req, res) {
	{
		res.writeHead(200, {'content-type':'text/html'});
		res.write("<h3>test</h3>");
   		res.end();
	}
})

app.get('/set', function(req, res){
	client.set('test','this message will expire in 10 seconds','EX',10);
	res.status(201).send("message logged");	
})

app.get('/get', function(req, res){

	client.get('test', function (err, reply) {
		
		res.send(reply);
	})

	
	
})

app.get('/recent', function(req,res){
	client.lrange('visit_list',0,4, function (err,result){
		
		res.send("Below is a list of five most recent links that you visited:<br><br>"+result.join('<br>'));
	})

})

app.get('/toggleCacheFeature',function(req,res){

	toggleFeature = !toggleFeature;

	res.send("The cache is now turned "+(toggleFeature ? "on" : "off"));
})



app.get('/catfact/:num',function(req,res){


	var line_no = req.params.num;

	if(toggleFeature){
		var start = getCurrentTime();

		client.get('catfact:'+line_no, function(err,response){
			if(!response){

				
				
				get_line('catfacts.txt',line_no,function(err,response){
					var end = getCurrentTime();

					client.set('catfact:'+line_no,response,'EX',10);
					var result = "Toggle flag is on and the following data was retrieved from file in "+(end-start)+" microseconds.";

					result += "<br><br>"+response;

					res.send(result);
				});
			}else{
					
				
				
				var end = getCurrentTime();
				
				var result = "Toggle flag is on and the following data was retrieved from cache in "+(end-start)+" microseconds.";
				
				result += "<br><br>"+response;

				res.send(result);

				
			}
		});
	}else{

		var start = getCurrentTime();

		get_line('catfacts.txt',line_no,function(err,response){
			

			var end = getCurrentTime();

			var result = "Toggle flag is off and the following data was retrieved from file in "+(end-start)+" microseconds";

			result += "<br><br>"+response;

			res.send(result);
		});
	}

})

function getCurrentTime(){

	var timArr = process.hrtime();

	return Math.round((timArr[0] * 1000000 + timArr[1] / 1000));
}

function get_line(filename, line_no, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }

    callback(null, lines[+line_no]);
}

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
	console.log("inside upload");

   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
			console.log(img);
			  
			client.lpush('cats', img, function(err){

				res.status(204).end()
			});
		});
	}
}]);

app.get('/meow', function(req, res) {
	
	client.lpop('cats',function(err,imagedata){
		res.writeHead(200, {'content-type':'text/html'});
		console.log(err || imagedata)
		res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
		res.end();
	});
	
})

// HTTP SERVER
var server = app.listen(3000, function () {

  var host = server.address().address != "::" ? server.address().address : "localhost"; 
  var port = server.address().port

  console.log('App server is listening at http://%s:%s', host, port)
})

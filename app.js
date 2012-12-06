
var express = require("express")
, path = require("path");

var app = express();

app.configure(function() {
		app.set('port', process.env.PORT || 80);
    app.set('host', process.env.HOST || '127.0.0.1');
		app.set('node_uid', process.env.NODEUID || 'node');
		app.set('node_gid', process.env.NODEGID || 'node');
		app.set('cookie_secret', "Dont forget to change me")

		var plates = require('express-plates').init(app);
		app.set('views', __dirname + '/views');

		app.use(express.favicon('./public/assets/favicon.ico'));

		app.use(express.logger('dev'));

		app.use(express.bodyParser());
		app.use(express.methodOverride());

		app.use(express.cookieParser(app.get('cookie_secret')));
		app.use(express.session());

		app.use(app.router);
		app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
		app.use(express.errorHandler());

    // some stuff for testing
		testRoutes = require('./routes/test.js');
		app.get('/plates', testRoutes.plates);
});

app.configure('production', function() {
    
});

app.listen(app.get('port'), app.get('host'), null, function() {
		try {
				console.log('Old User ID: ' + process.getuid() + ', Old Group ID: ' + process.getgid());
				process.setgid(app.get('node_gid'));
				process.setuid(app.get('node_uid'));
				console.log('New User ID: ' + process.getuid() + ', New Group ID: ' + process.getgid());
		} catch (err) {
				console.log('Warning: Node running as root user.');
				process.exit(1);
		}    
});

console.log("Server Listening on port " + app.get('port'));
#!/usr/bin/env node

var argv = process.argv,

	util = require("util"),

	daemon = require("daemon"),
	express = require("express"),
	app = express.createServer();


var daemonConfig = {
	lockFile: "/tmp/tabshift-server.pid",
	logFile: "tabshift-server.log"
};


switch (argv[2]) {

	case "start":
		daemon.daemonize(daemonConfig.logFile, daemonConfig.lockFile, start);
		break;

	case "stop":
		daemon.stop(daemonConfig.lockFile, function (err, pid) {
			if (err) return util.puts("Error stopping daemon: " + err);
			util.puts("Successfully stopped daemon with pid: " + pid);
		});
		break;

	default:
		util.puts('Usage: [start|stop]');
		process.exit(-1);
		break;

}


function start(err, pid) {

	app.configure(function () {
		app.use(express.static(__dirname + "/static"));
		app.use(express.bodyParser());
		app.use(express.methodOverride());
	});


	var tabs = {};


	app.get("/tabs/", function (req, res) {
		res.send(tabs);
	});

	app.post("/tabs/", function (req, res) {
		tabs = req.body;
		res.end();
	});


	app.get("/tab/:id", function (req, res) {
		var id = req.params.id;
		if (tabs[id]) {
			res.send(tabs[id]);
		} else {
			res.writeHead(404);
		}
	});

	app.post("/tab/:id", function (req, res) {
		tabs[req.params.id] = req.body;
		res.end();
	});

	app.put("/tab/:id", function (req, res) {
		tabs[req.params.id] = req.body;
		res.end();
	});

	app.del("/tab/:id", function (req, res) {
		delete tabs[req.params.id];
		res.end();
	});


	app.listen(22111);

}

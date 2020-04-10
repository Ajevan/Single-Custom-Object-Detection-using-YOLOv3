var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var url = require('url');
const { spawn } = require('child_process');

var nameFile = 'data/coco.clss';
var sourceFile = 'data/input/';
var outFile = 'output/';

var name;

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname

    if (pathname.split('.').pop() == 'jpg') {
	var p = pathname.substring(1);
        fs.readFile(p, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });
    }
    else if (pathname.split('.').pop() == 'png') {
	var p = pathname.substring(1);
        fs.readFile(p, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
    }
    else if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var loc=new Date().getTime();
            name = sourceFile + loc + ".jpg";
            out_name = outFile + loc + ".png";
            var newpath = __dirname + '/' + name;
            var output = "";
            for (x = 0; x < fields.types.split(',').length; x++) {
                output += fields.types.split(',')[x].trim()+'\n';
            }
            fs.writeFile(nameFile, output, function (err) {
                if (err) throw err;
            });
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('<h1>upload:' + name + '</h1>');
                res.write('<style>img {padding: 5px;}</style>');
                res.write('<img src="' + name + '" width="500" height="500" id = "imgI"></img>');
            });
            var dataToSend;

            const python = spawn('python', ['single_detect.py']);
            python.stdout.on('data', function (data) {
                dataToSend = data.toString();
            });
            python.on('close', (code) => {
		res.write('<img src="' + out_name + '" width="500" height="500" id = "imgO"> <img>');
		res.end();
            });

        });
    } else {


        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write('<!DOCTYPE html>');
        res.write('<html>');
        res.write('<head>');
        res.write('</head>');
        res.write('<body>');
        res.write('<style>.grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr}.item{border-style: solid;border-color=black;text-align: center;}.item:hover {background-color: lightgrey;}</style>');
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="text" name="types" id="typeInput"><br>');
        res.write('<script>function addItem(word){ var a=", ";if(document.getElementById("typeInput").value.length<1){a="";}document.getElementById("typeInput").value=document.getElementById("typeInput").value+a+word;}</script>');
        res.write('<script>function toggleList(){var x=document.getElementById("itemList");if (x.style.display == "none") {x.style.display = "block";} else {x.style.display = "none";}}</script>');
        res.write('<input type="submit"><br><br>');
        res.write('</form>');
        res.write('<button onclick="toggleList()">show/hide list</button>');
        fs.readFile("data/coco.names","utf8", function (err, data) {
            if (err) throw err;
            var types=data.split('\n');
            types.pop();
            types=types.sort();
            res.write('<div id="itemList" style="display:none">');
            for (x = 0; x < types.length-1 ; x+=4) {
                res.write('<div class="grid">');
                res.write('<div class="item" onclick="addItem(\''+types[x].trim()+'\')">'+types[x].trim()+'</div>');
                res.write('<div class="item" onclick="addItem(\''+types[x+1].trim()+'\')">'+types[x+1].trim()+'</div>');
                res.write('<div class="item" onclick="addItem(\''+types[x+2].trim()+'\')">'+types[x+2].trim()+'</div>');
                res.write('<div class="item" onclick="addItem(\''+types[x+3].trim()+'\')">'+types[x+3].trim()+'</div>');
                res.write('</div>');
            }
            res.write('</div>');
            res.write('</body>');
            return res.end();
        });
    }
}).listen(8080);


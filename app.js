var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var url = require('url');
const { spawn } = require('child_process');

var nameFile = 'data/coco.names';
var sourceFile = 'data/input/';
var outFile = 'data/output/';

var name;
//console.log(__dirname);

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname
    console.log(pathname.split('/'));

    if (pathname.split('.').pop() == 'jpg') {
        //var file = fs.readFileSync("1585708180659.jpg");
        fs.readFile(name, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });
    }
    else if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            //console.log(fields.name.split(' '));
            var oldpath = files.filetoupload.path;
            var loc=new Date().getTime();
            name = targetFile + loc + ".jpg";
            out_name = outFile + loc + ".png";
            var newpath = __dirname + '/' + name;
            //console.log(newpath);
            var output = "";
            for (x = 0; x < fields.name.split(' ').length; x++) {
                output += fields.name.split(' ')[x]+'\n';
            }
            fs.writeFile(nameFile, output, function (err) {
                if (err) throw err;
                //console.log('Saved!');
            });
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                //res.write('File uploaded and moved!');
                //res.end();
                res.write('<h1>upload:' + name + '</h1>');
                res.write('<style>img {padding: 5px;}</style>');
                res.write('<img src="' + name + '" width="500" height="500" id = "imgI"></img>');
                res.write('<img src="' + out_name + '" width="500" height="500" id = "imgI"></img>');
            });
            var dataToSend;

            const python = spawn('python', ['single_detect.py', name.split("\\")[name.split("\\").length-1]]);
            python.stdout.on('data', function (data) {
                //console.log('Pipe data from python script ...');
                dataToSend = data.toString();
                //console.log(dataToSend);
            });
            python.on('close', (code) => {
                //res.write(dataToSend);
            });

        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="text" name="name"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);

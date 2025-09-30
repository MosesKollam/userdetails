const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const path_url = process.env.PORT ||8080
const basepath = `${__dirname}`;
const index = fs.readFileSync(path.join(basepath, 'practice.html'), 'utf-8');

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === "/" || pathname === "/overview") {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(index);
    } else {
        let contentType = 'text/plain';
        const forward_path = path.join(basepath, pathname);
        fs.readFile(forward_path, function (error, data) {
            const ext = path.extname(forward_path);
            if (ext === '.css') contentType = "text/css";
            if (ext === '.js') contentType = "application/javascript";
            if (ext === '.png') contentType = "image/png";
            if (ext === '.jpg') contentType = "image/jpg";
            if (ext === '.jpeg') contentType = "image/jpeg";
            if (ext === '.html') contentType = "text/html";
            response.writeHead(200, { 'Content-type': contentType });
            response.end(data);
        })
    }
});

server.listen(path_url, function () {
    console.log('Server running at http://127.0.0.1:8000');
});


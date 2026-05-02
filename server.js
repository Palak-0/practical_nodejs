const http = require('http');
const fs = require('fs');
const os = require('os');

const port = 3000;

const server = http.createServer((req, res) => {

    let url = req.url;
    let method = req.method;

    if (url == '/updateUser') {
        let t = new Date().toISOString() + "\n";
        fs.appendFileSync('visitors.log', t);
        res.end("Time add kar diya hai");
    }

    else if (url == '/saveLog') {
        let data = "";
        if (fs.existsSync('visitors.log')) {
            data = fs.readFileSync('visitors.log', 'utf-8');
        }
        res.end(data);
    }

    else if (url == '/backup') {
        let d = fs.readFileSync('visitors.log');
        fs.writeFileSync('backup.log', d);
        res.end("backup done");
    }

    else if (url == '/clearLog') {
        fs.writeFileSync('visitors.log', '');
        res.end("cleared");
    }

    else if (url == '/serverInfo') {
        let info = {
            plat: os.platform(),
            cpu: os.cpus().length,
            mem: os.freemem()
        };
        res.end(JSON.stringify(info));
    }

    else {
        res.end("no route");
    }

});

server.listen(port, () => {
    console.log("running on " + port);
});
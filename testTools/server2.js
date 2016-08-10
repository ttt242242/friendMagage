
var http = require('http')
  , fs = require('fs');

http.createServer(function (req, res) {

  fs.readFile('testArborIndex.html', 'UTF-8', function(err, data) {

    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(data);  // 「Hello, world!」から変更

  });

}).listen(process.env.PORT || 8080);

var express = require('express'),
    app     = express(),
    mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test'
    });
app.get('/:table', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM MyGuests', req.params.id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.json(rows);
                connection.release();
            });
        }
    });
});
app.get('/guests', function(req,res){

});
app.listen(3000);
console.log('Rest Demo Listening on port 3000');
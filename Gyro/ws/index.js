module.exports = function(io) {
    io.on('connection', function(client) {
        client.on('con', () => {
            io.emit('m.html is con', 1);
        });
        client.on('deviceMsg', (data) => {
            io.emit('deviceMsg', data);
        });
    })
}
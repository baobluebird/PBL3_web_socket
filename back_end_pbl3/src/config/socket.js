const socketIO = require('socket.io');

let io;

module.exports = {
    init: (httpServer) => {
        io = socketIO(httpServer, {
            cors: {
                origin: "http://localhost:3000", // or your client's URL
                methods: ["GET", "POST"],
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not initialized!');
        }
        return io;
    },
};
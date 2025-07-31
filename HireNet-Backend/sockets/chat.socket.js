
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);

    // Join a chat room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Send message to room
    socket.on('chatMessage', ({ roomId, message }) => {
      console.log('📨 Message received:', message);
      io.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });
  });
};

import './bootstrap';
import cors from 'cors';
import express from 'express';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import routes from './routes';
import './database';

const connectedStores = {};
class App {
  constructor() {
    this.server = express();
    this.serverWithSocket = null;
    this.socket();
    this.middlewares();
    this.routes();
  }

  socket() {
    this.serverWithSocket = http.createServer(this.server);
    const io = socketio(this.serverWithSocket);

    io.on('connection', socket => {
      const { storeId } = socket.handshake.query;
      connectedStores[storeId] = socket.id; // cria um objeto com o name de storeId (no caso o id da store) e o valor como o id da conexão do socket
    });
    this.server.use((req, res, next) => {
      req.io = io; // passa io (socket) disponivel para as rotas
      req.connectedStores = connectedStores; // disponibiliza em todas as rotas todos os usuários conectados
      return next();
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().serverWithSocket;

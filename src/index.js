import http from 'http';
import app from './app';

const server = http.createServer(app);
server.listen(5000, () => {
  console.log(`Koech says access this application at port ${5000}`);
});

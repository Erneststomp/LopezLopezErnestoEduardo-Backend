import config from './config.js';
import Server from './app.js'
import cluster from 'cluster'
import os from 'os'
import { initDb } from './database.js';


const numCPUs = os.cpus().length/2;
if(config.app.MODE && cluster.isPrimary){

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
}
else {
  const init = async () => {
    
    initDb()

    const server = Server.listen(config.app.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${config.app.PORT} - worker process with ${process.pid} started`);
    });
    server.on('error', (error) => console.log(`Error en servidor: ${error}`));
  }
  init()

}
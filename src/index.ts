import Server from './classes/server';
import userRouter from './router/user';
import typesRouter from './router/types';
import domainRouter from './router/domain';
import cors from 'cors';

const port: number = Number(process.env.PORT) || 3000;
//Server init
const server = Server.init(port);
//cors
server.app.use(cors({ origin: true, credentials: true }));
//routes
server.app.use(userRouter);
server.app.use(typesRouter);
server.app.use(domainRouter);

//inicializar Server
server.start(() => {
  console.log(`Server on port ${port}`)
})
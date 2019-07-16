const app = require('./app');

//const userRouter = require('../routers/user');
const authRouter = require('../routers/auth');
const teamRouter = require('../routers/team');

const apiPrefix = '/api/v1';

app.use(`${apiPrefix}/auth`, authRouter);
app.use(`${apiPrefix}/team`, teamRouter);

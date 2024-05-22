import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';


const app = express();
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export {app}
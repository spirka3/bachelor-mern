import express from 'express';
import cors from 'cors';

// connectDB
require('dotenv').config()
require('./config/mongoose')

// routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import pageRoutes from './routes/pages';
import moduleRoutes from './routes/modules';

// useExpress
const app = express()
app.use(express.json())

// CORS Middleware
// app.use(cors({
//   origin: '*',
//   optionsSuccessStatus: 200,
// }));
app.use(cors({ origin: true }));
// app.use(cors());

// useRoutes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/pages', pageRoutes)
app.use('/modules', moduleRoutes)

// runServer
const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server Started on http://localhost:${PORT}/`)
)

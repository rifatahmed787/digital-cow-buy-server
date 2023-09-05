import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import errorHandler, { notfoundandler } from './middleware/errorHandler';
import {createServer} from 'http';
import router from './router/router';

const app: Application = express()

app.use(cors())
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send({ success: true, message: 'Digital Cow Server is Running' })
})
app.use('/api/v1', router)
app.use(notfoundandler)

app.use(errorHandler)



const server = createServer(app);

export default server

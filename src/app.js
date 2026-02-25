import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors());
app.use(helmet());
// app.use(rateLimit);
app.use(express.json());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max:20
})

app.use(limiter);

app.get('/',limiter, (req, res) => {
    res.send('TaskFlow API is running');
});

export default app;
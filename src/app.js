import express from 'express';
import cors from 'cors';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(rateLimit);
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max:20
})

app.use(limiter);

app.get('/', (req, res) => {
    res.send('TaskFlow API is running');
});

export default app;
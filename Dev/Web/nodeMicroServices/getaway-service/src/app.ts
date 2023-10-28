import express, { Request, Response } from 'express';
import http from 'http';

const app = express();

app.use(express.json());

app.use('/users', (req: Request, res: Response) => {
  try {
    const options = {
      method: req.method,
      headers: req.headers,
    };

    const proxyRequest = http.request(process.env.USER_SERVICE_BASE_URL + req.originalUrl, options, (proxyRes) => {
      res.status(proxyRes.statusCode || 500);
      proxyRes.pipe(res);
    });

    req.pipe(proxyRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});

import express from 'express';
import http from 'http';
import { Request, Response } from 'express';

const app = express();

const routes = [
  { path: '/user-service', target: 'http://localhost:3000' },
];

app.all('*', (req, res) => {
  const { url, method } = req;
  const route = routes.find(r => url.match(r.path));

  if (route) {
    const targetURL = url.replace(route.path, route.target);
    const options = {
      method,
      headers: req.headers,
    };

    const handleProxyRequest = () => {
      const proxyRequest = http.request(targetURL, { ...options, headers: { 'Content-Type': 'application/json' } }, (proxyRes) => {
        res.status(proxyRes.statusCode || 500);
        proxyRes.pipe(res);
      });

      proxyRequest.on('error', (error) => {
        console.error('Error in proxy request:', error);
        res.status(500).json({ error: 'Failed to process the request' });
      });

      req.pipe(proxyRequest);
    };

    if (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') {
      handleProxyRequest();
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } else {
    res.sendStatus(404).send('Route not found');
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Gateway service running on port ${PORT}`);
});

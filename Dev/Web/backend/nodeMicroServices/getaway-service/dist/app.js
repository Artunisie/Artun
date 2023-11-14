"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
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
            const proxyRequest = http_1.default.request(targetURL, Object.assign(Object.assign({}, options), { headers: { 'Content-Type': 'application/json' } }), (proxyRes) => {
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
        }
        else {
            res.status(405).send('Method Not Allowed');
        }
    }
    else {
        res.sendStatus(404).send('Route not found');
    }
});
const PORT = 8888;
app.listen(PORT, () => {
    console.log(`Gateway service running on port ${PORT}`);
});

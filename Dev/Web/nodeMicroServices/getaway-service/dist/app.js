"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', (req, res) => {
    try {
        const options = {
            method: req.method,
            headers: req.headers,
        };
        const proxyRequest = http_1.default.request(process.env.USER_SERVICE_BASE_URL + req.originalUrl, options, (proxyRes) => {
            res.status(proxyRes.statusCode || 500);
            proxyRes.pipe(res);
        });
        req.pipe(proxyRequest);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process the request' });
    }
});
const PORT = 8888;
app.listen(PORT, () => {
    console.log(`Gateway service running on port ${PORT}`);
});

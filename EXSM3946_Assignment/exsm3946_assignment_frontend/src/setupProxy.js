const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/dealership",
    "/manufacturer",
    "/model",
    "/vehicle",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7269',// was 5001
        secure: false
    });

    app.use(appProxy);
};

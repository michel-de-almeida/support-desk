"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    const errorResponseMessage = {
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    };
    res.json(errorResponseMessage);
};
exports.default = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map
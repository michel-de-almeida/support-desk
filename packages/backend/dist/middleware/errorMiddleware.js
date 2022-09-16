"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    var statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    var errorResponseMessage = {
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    };
    res.json(errorResponseMessage);
};
exports.default = errorHandler;

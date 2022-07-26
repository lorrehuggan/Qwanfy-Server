"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const Error_1 = require("./Error");
function ErrorHandler(err, req, res, next) {
    console.error(err);
    if (err instanceof Error_1.ApiError) {
        res.status(err.code).json({ error: err.message, data: null });
        return;
    }
    res.status(500).json('Something broke!');
}
exports.ErrorHandler = ErrorHandler;

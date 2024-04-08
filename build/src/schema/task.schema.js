"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskSchema = exports.deleteTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }).min(120, "Description should be at least 120 characters long"),
        status: (0, zod_1.string)({
            required_error: "Status is required",
        }),
        responsable: (0, zod_1.string)({
            required_error: "Responsable is required",
        }),
        finishedAt: (0, zod_1.union)([(0, zod_1.date)(), (0, zod_1.string)()])
    }),
};
var params = {
    params: (0, zod_1.object)({
        taskId: (0, zod_1.string)({
            required_error: "taskId is required",
        }),
    }),
};
exports.createTaskSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateTaskSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteTaskSchema = (0, zod_1.object)(__assign({}, params));
exports.getTaskSchema = (0, zod_1.object)({
// ...params,
});

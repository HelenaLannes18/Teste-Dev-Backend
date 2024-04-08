"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
var taskSchema = new mongoose_1.default.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "task_".concat(nanoid()); },
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    finishedAt: { type: Date, required: false },
    status: { type: String, default: false, required: true },
    responsable: { type: String, required: true },
}, {
    timestamps: true,
});
var TaskModel = mongoose_1.default.model("Task", taskSchema);
exports.default = TaskModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var session_controller_1 = require("./controller/session.controller");
var user_controller_1 = require("./controller/user.controller");
var requireUser_1 = __importDefault(require("./middleware/requireUser"));
var validateResource_1 = __importDefault(require("./middleware/validateResource"));
var session_schema_1 = require("./schema/session.schema");
var user_schema_1 = require("./schema/user.schema");
var task_schema_1 = require("./schema/task.schema");
var task_controller_1 = require("./controller/task.controller");
function routes(app) {
    app.get('/healthcheck', function (req, res) { return res.sendStatus(200); });
    app.post('/api/users', (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post('/api/sessions', (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get('/api/sessions', requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete('/api/sessions', requireUser_1.default, session_controller_1.deleteSessionHandler);
    ////////// tasks
    app.post('/api/tasks', [requireUser_1.default, (0, validateResource_1.default)(task_schema_1.createTaskSchema)], task_controller_1.createTaskHandler);
    app.put('/api/tasks/:taskId', [requireUser_1.default, (0, validateResource_1.default)(task_schema_1.updateTaskSchema)], task_controller_1.updateTaskHandler);
    // app.get(
    //   "/api/tasks/:taskId",
    //   validateResource(getTaskSchema),
    //   getTaskHandler
    // );
    // app.get(
    //   "/api/tasks",
    //   validateResource(getTaskSchema),
    //   getAllTasksHandler
    // );
    app.get('/api/tasks', (0, validateResource_1.default)(task_schema_1.getTaskSchema), task_controller_1.getAllTasksByFilterHandler);
    app.delete('/api/tasks/:taskId', [requireUser_1.default, (0, validateResource_1.default)(task_schema_1.deleteTaskSchema)], task_controller_1.deleteTaskHandler);
}
exports.default = routes;

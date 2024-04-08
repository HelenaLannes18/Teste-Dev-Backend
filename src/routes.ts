import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from './schema/task.schema';
import {
  createTaskHandler,
  deleteTaskHandler,
  getAllTasksByFilterHandler,
  updateTaskHandler,
} from './controller/task.controller';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  ////////// tasks
  app.post(
    '/api/tasks',
    [requireUser, validateResource(createTaskSchema)],
    createTaskHandler
  );

  app.put(
    '/api/tasks/:taskId',
    [requireUser, validateResource(updateTaskSchema)],
    updateTaskHandler
  );

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

  app.get(
    '/api/tasks',
    validateResource(getTaskSchema),
    getAllTasksByFilterHandler
  );

  app.delete(
    '/api/tasks/:taskId',
    [requireUser, validateResource(deleteTaskSchema)],
    deleteTaskHandler
  );
}

export default routes;

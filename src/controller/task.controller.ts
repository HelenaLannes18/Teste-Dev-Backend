import { Request, Response } from 'express';
import { CreateTaskInput, UpdateTaskInput } from '../schema/task.schema';
import {
  createTask,
  deleteTask,
  findAllTasks,
  findAllTasksByFilter,
  findAndUpdateTask,
  findTask,
} from '../service/task.service';
import { startOfDay, endOfDay } from 'date-fns';

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const task = await createTask({ ...body, user: userId });

  return res.send(task);
}

export async function updateTaskHandler(
  req: Request<UpdateTaskInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const taskId = req.params.taskId;
  const update = req.body;

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTask = await findAndUpdateTask({ taskId }, update, {
    new: true,
  });

  return res.send(updatedTask);
}

export async function getTaskHandler(
  req: Request<UpdateTaskInput['params']>,
  res: Response
) {
  const taskId = req.params.taskId;
  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  return res.send(task);
}

export async function getAllTasksByFilterHandler(
  req: Request<
    {},
    {},
    {},
    { createdAt?: Date; finishedAt?: Date; status?: string; name?: string }
  >,
  res: Response
) {
  const { createdAt, finishedAt, status, name } = req.query;

  let filter: any = {};

  if (createdAt) {
    const startDate = startOfDay(new Date(createdAt));
    const endDate = endOfDay(new Date(createdAt));
    filter.createdAt = { $gte: startDate, $lt: endDate };
  }

  if (finishedAt) {
    const startDate = startOfDay(new Date(finishedAt));
    const endDate = endOfDay(new Date(finishedAt));
    filter.finishedAt = { $gte: startDate, $lt: endDate };
  }

  if (status) {
    filter.status = status;
  }

  if (name) {
    filter.name = name;
  }

  try {
    const tasks = await findAllTasksByFilter(filter);
    if (!tasks || tasks.length === 0) {
      return res.sendStatus(404);
    }
    return res.send(tasks);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function deleteTaskHandler(
  req: Request<UpdateTaskInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const taskId = req.params.taskId;

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteTask({ taskId });

  return res.sendStatus(200);
}

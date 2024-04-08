import { object, number, string, TypeOf, boolean, date, any, union } from 'zod';

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }).min(12, 'Description should be at least 12 characters long'),
    status: string({
      required_error: 'Status is required',
    }),
    responsable: string({
      required_error: 'Responsable is required',
    }),
    finishedAt: union([date(), string()]),
  }),
};

const params = {
  params: object({
    taskId: string({
      required_error: 'taskId is required',
    }),
  }),
};

export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...payload,
});

export const deleteTaskSchema = object({});

export const getTaskSchema = object({});

export const getTaskSchemaWithParams = object({
  ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type ReadTaskInput = TypeOf<typeof getTaskSchema>;
export type ReadTaskInputWithParams = TypeOf<typeof getTaskSchemaWithParams>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>;

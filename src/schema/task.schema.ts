import { object, number, string, TypeOf, boolean, date, any, union } from "zod";


const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    status: string({
      required_error: "Status is required",
    }),
    responsable: string({
      required_error: "Responsable is required",
    }),
    finishedAt: union([date(), string()])
  }),
};


const params = {
  params: object({
    taskId: string({
      required_error: "taskId is required",
    }),
  }),
};


export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...payload,
  ...params,
});

export const deleteTaskSchema = object({
  ...params,
});

export const getTaskSchema = object({
  // ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type ReadTaskInput = TypeOf<typeof getTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>;
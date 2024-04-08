import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TaskInput {
  user: UserDocument["_id"];
  name: string;
  description: string;
  finishedAt: Date|String;
  status: string;
  responsable: string;
}

export interface TaskDocument extends TaskInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
      unique: true,
      default: () => `task_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    finishedAt: {type: Date, required: false},
    status: { type: String, default: false, required: true },
    responsable: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = database.insert("tasks", {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        completed_at: null,
        updated_at: null,
      });

      return res.writeHead(201).end(JSON.stringify(task));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const [existingTask] = database.select("tasks", { id });

      if (!existingTask)
        return res.writeHead(404).end(`{"error":"Task not found"}`);

      if (!title)
        return res.writeHead(403).end('{"error":"Title is required"}');
      if (!description)
        return res.writeHead(403).end('{"error":"description is required"}');

      const task = database.update("tasks", id, {
        title,
        description,
        updated_at: new Date(),
      });
      return res.writeHead(202).end(JSON.stringify(task));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [existingTask] = database.select("tasks", { id });

      if (!existingTask)
        return res.writeHead(404).end('{"error":"Task not found"}');

      const isTaskCompleted = existingTask.completed_at;

      const task = database.update("tasks", id, {
        completed_at: isTaskCompleted ? null : new Date(),
        updated_at: new Date(),
      });

      return res.writeHead(202).end(JSON.stringify(task));
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );
      return res.writeHead(201).end(JSON.stringify(tasks));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:taskId"),
    handler: (req, res) => {
      const { taskId } = req.params;

      const [existingTask] = database.select("tasks", { id: taskId });
      console.log(existingTask);
      if (!existingTask)
        return res.writeHead(404).end('{"error":"Task not found"}');

      database.delete("tasks", taskId);
      return res.writeHead(204).end();
    },
  },
];

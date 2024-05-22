import { createTask, getTaskById, updateTask, deleteTask } from '../models/task.models.js';

const create = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;
  const taskId = await createTask(title, description, userId);
  res.status(201).json({ id: taskId });
};

const getById = async (req, res) => {
  const taskId = req.params.id;
  const task = await getTaskById(taskId);
  res.json(task);
};

const update = async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  await updateTask(taskId, title, description);
  res.json({ message: 'Task updated' });
};

const remove = async (req, res) => {
  const taskId = req.params.id;
  await deleteTask(taskId);
  res.json({ message: 'Task deleted' });
};

export {create, getById,update, remove}

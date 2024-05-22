import db from '../db/index.js';

const createTask = async (title, description, userId) => {
  const [result] = await db.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId]);
  return result.insertId;
};

const getTaskById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
};

const updateTask = async (id, title, description) => {
  await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
};

const deleteTask = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = ?', [id]);
};

export {createTask, getTaskById, updateTask, deleteTask}

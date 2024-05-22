import db from '../db/index.js';

const createTask = async (title, description, userId) => {
  try {
    const result =  db.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId]);
    return result.id;
  } catch (error) {
    console.log(error)
  }
};

const getTasksById = async (id) => {
  const rows =  db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows;
};

const updateTask = async (id, title, description) => {
   db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
};

const deleteTask = async (id) => {
   db.query('DELETE FROM tasks WHERE id = ?', [id]);
};

export {createTask, getTasksById, updateTask, deleteTask}

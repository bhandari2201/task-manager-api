import db from '../db/index.js';

const createUser = async (username, password) => {
  const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  return result.insertId;
};

const getUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

export {createUser, getUserByUsername}


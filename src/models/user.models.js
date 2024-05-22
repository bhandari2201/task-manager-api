import db from '../db/index.js';

const createUser = async (uid,username, password) => {
  try {
    const result =  db.query('INSERT INTO users (uid,username, password) VALUES (?,?, ?)', [uid,username, password]);
  } catch (error) {
    console.log(error)
  }
};

const getUserByUsername = async (username) => {
  const [rows] =  db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

export {createUser, getUserByUsername}


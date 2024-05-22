import { createTask, getTasksById, updateTask, deleteTask } from '../models/task.models.js';

const create = async (req, res) => {
    const { uid } = req.user;
    const { title, description } = req.body;
    try {
        const taskId = await createTask(uid, title, description);
        res.status(201).json({ id: taskId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    const { uid } = req.user;
    try {
        const tasks = await getTasksById(uid);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        await updateTask(id, title, description, status);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTask(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export {create,getTasks,update,remove}
import Tasks from "../models/model_tasks.js";

export const GetTasks = async (req, res, next) => {
    try {
        const tasks = await Tasks.find({ user: req.user._id }); // Return tasks of logged-in user
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const GetTaskById = async (req, res, next) => {
    try {
        const task = await Tasks.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) return res.status(404).json({ message: "task not found" });

        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const CreateTask = async (req, res, next) => {
    try {
        const newTask = new Tasks({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
};

export const UpdateTask = async (req, res, next) => {
    try {
        const updatedTask = await Tasks.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });

        res.json(updatedTask);
    } catch (err) {
        next(err);
    }
};

export const DeleteTask = async (req, res, next) => {
    try {
        const deleted = await Tasks.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!deleted)
            return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};

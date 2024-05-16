import axios from "axios";
const taskId = 145;
const task = "12345678"
const card_id = 45;
const done = 1;
const res = await axios.put(`http://localhost:3001/todo-list`, { taskId, done});
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:[],
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state,action) => {
            state.tasks.push({id: Date.now() ,text: action.payload});
        },
        deleteTodo: (state,action) => {
            state.tasks = state.tasks.filter(tasks => tasks.id !== action.payload);
        },
        updateTodo: (state,action) => {
            const {id,newText} = action.payload;
            const updatedText = state.tasks.map((task)=>
                task.id === id ? { ...task, text: newText } : task
            );
            state.tasks = updatedText
        },
        completeTodo: (state, action) => {
            const { id } = action.payload;
            const completedTasks = state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            state.tasks = completedTasks;
        }
    },
});

export const { addTodo, deleteTodo, updateTodo, completeTodo} = todoSlice.actions;

export default todoSlice.reducer;
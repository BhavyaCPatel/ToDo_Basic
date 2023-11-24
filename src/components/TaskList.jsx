import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, updateTodo, completeTodo } from '../features/todo/todoSlice';
import { MdDeleteForever } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Checkbox } from "@material-tailwind/react";

const TaskList = () => {
    const tasks = useSelector((state) => state.todo.tasks);
    const dispatch = useDispatch();
    const [newText, setNewText] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleUpdateClick = (id) => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        setNewText(taskToUpdate.text);
        setEditingTaskId(id);
    };

    const handleUpdate = (id) => {
        if (newText.trim() !== '') {
            dispatch(updateTodo({ id, newText }));
            setNewText('');
            setEditingTaskId(null);
        }
    };

    const handleComplete = (id) => {
        dispatch(completeTodo({ id }));
    };

    return (
        <div className='md:m-10 p-10'>
            <ul className="m-auto p-auto">
                {tasks.map((task) => (
                    <li className="container h-auto w-9/12 " key={task.id}>
                        {editingTaskId === task.id ? (
                            <>
                                <textarea
                                    type="text"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    placeholder="Enter updated task"
                                    className="bg-inherit border-2 border-slate-500 rounded-md w-full px-3"
                                />&nbsp;
                                <button
                                    className='px-4'
                                    onClick={() => handleUpdate(task.id)}>
                                    <HiOutlinePencilSquare className='text-xl'/>
                                </button>
                            </>
                            
                        ) : (
                            <p className='flex items-center justify-between '>
                                <div className=' flex text-left'>
                                    <Checkbox className='bg-inherit mx-1' 
                                    onClick={()=> handleComplete(task.id)}/>
                                    <span className={`pt-1.5 ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.text}</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className=" px-2 py-1"
                                        onClick={() => handleDelete(task.id)}>
                                        <MdDeleteForever className='text-xl'/>
                                    </button>
                                    <button
                                        className=' px-2 py-1'
                                        onClick={() => handleUpdateClick(task.id)}>
                                        <HiOutlinePencilSquare className='text-xl'/>
                                    </button>
                                </div>
                            </p>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

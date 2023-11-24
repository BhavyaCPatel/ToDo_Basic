import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import TaskList from "./TaskList";
import { IoMdAdd } from "react-icons/io";

const Task = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const addNewTask = () => {
        const task = inputRef.current.value.trim();
        if (task !== "") {
            dispatch(addTodo(task));
            inputRef.current.value = "";
        }
    };
    return (
        <div>
            <h1 className="text-center text-5xl m-3">ToDo App</h1><br />
            <div className="container-lg  w-auto m-10 p-5 ">
                <div className="text-center">
                    <input
                        type="text"
                        placeholder="Add task here..."
                        ref={inputRef}
                        className="bg-slate-800 p-2.5 mx-2 rounded-lg w-9/12 bg-inherit h-full"
                    />&nbsp;
                    <button onClick={addNewTask} className="bg-slate-800 rounded-md p-3 h-1/3">
                        <IoMdAdd className="text-lg text-center"/>
                    </button>
                </div>
                <div>
                    <TaskList/>
                </div>
            </div>
        </div>
    );
};

export default Task;

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

const Tasks = ({ todoItem, index, handleRemove, handleEdit }) => {
  return (
    <div className="task-item">
      <div className="button-group">
        <button onClick={() => handleRemove(index)} className="remove btn">
          <AiOutlineDelete />
        </button>
        <button onClick={() => handleEdit(index)} className="edit btn">
          <AiOutlineEdit />
        </button>
      </div>
      <div className="task-name">
        <p>{todoItem}</p>
      </div>
    </div>
  );
};

export default Tasks;

import React from "react";
import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
import { removeTodo, toggleComplete } from "@/redux/features/todoSlice";
import { Trash2, Edit } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

type TodoCardProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: Priority;
};

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  isCompleted,
  priority,
}) => {
  const dispatch = useAppDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(id));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-md p-4 border shadow-sm">
      <div className="grid grid-cols-6 gap-4 items-center">
        <div className="flex items-center space-x-3 col-span-2">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <h3
            className={`font-semibold truncate ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 justify-center">
          <div
            className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}
          ></div>
          <span className="text-sm font-medium">{priority}</span>
        </div>

        <div className="text-center">
          <span
            className={`text-sm font-medium ${
              isCompleted ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCompleted ? "Done" : "Pending"}
          </span>
        </div>

        <div className="truncate">
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={handleRemoveTodo} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

"use client";

import { Todo } from "./TodoList";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors">
      {/* チェックボックス */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      {/* TODOテキスト */}
      <span
        className={`flex-1 ${
          todo.completed
            ? "line-through text-gray-500 dark:text-gray-500"
            : "text-gray-800 dark:text-white"
        }`}
      >
        {todo.text}
      </span>

      {/* 削除ボタン */}
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
      >
        削除
      </button>
    </div>
  );
}

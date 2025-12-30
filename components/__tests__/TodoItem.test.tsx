import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../TodoItem";
import { Todo } from "../TodoList";

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: 1,
    text: "テストタスク",
    completed: false,
  };

  const mockCompletedTodo: Todo = {
    id: 2,
    text: "完了したタスク",
    completed: true,
  };

  it("未完了のタスクを表示する", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("テストタスク")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("完了したタスクを表示する", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockCompletedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("完了したタスク")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("チェックボックスをクリックするとonToggleが呼ばれる", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it("削除ボタンをクリックするとonDeleteが呼ばれる", async () => {
    const user = userEvent.setup();
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByText("削除");
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("削除ボタンが表示される", () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("削除")).toBeInTheDocument();
  });
});

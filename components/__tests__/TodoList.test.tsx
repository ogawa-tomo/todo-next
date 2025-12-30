import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../TodoList";

describe("TodoList", () => {
  it("初期状態では空のメッセージを表示する", () => {
    render(<TodoList />);
    expect(
      screen.getByText("タスクがありません。新しいタスクを追加してください。")
    ).toBeInTheDocument();
  });

  it("タスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByText("追加");

    await user.type(input, "テストタスク");
    await user.click(addButton);

    expect(screen.getByText("テストタスク")).toBeInTheDocument();
  });

  it("空の入力では追加できない", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const addButton = screen.getByText("追加");
    await user.click(addButton);

    expect(
      screen.getByText("タスクがありません。新しいタスクを追加してください。")
    ).toBeInTheDocument();
  });

  it("Enterキーでタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    await user.type(input, "Enterで追加{Enter}");

    expect(screen.getByText("Enterで追加")).toBeInTheDocument();
  });

  it("タスクを完了状態に切り替えられる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    await user.type(input, "完了テスト{Enter}");

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("タスクを削除できる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    await user.type(input, "削除テスト{Enter}");

    expect(screen.getByText("削除テスト")).toBeInTheDocument();

    const deleteButton = screen.getByText("削除");
    await user.click(deleteButton);

    expect(screen.queryByText("削除テスト")).not.toBeInTheDocument();
  });

  it("進捗率を正しく表示する", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    await user.type(input, "タスク1{Enter}");
    await user.type(input, "タスク2{Enter}");

    expect(screen.getByText(/進捗: 0 \/ 2 完了 \(0%\)/)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(screen.getByText(/進捗: 1 \/ 2 完了 \(50%\)/)).toBeInTheDocument();

    await user.click(checkboxes[1]);

    expect(screen.getByText(/進捗: 2 \/ 2 完了 \(100%\)/)).toBeInTheDocument();
  });

  it("複数のタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    await user.type(input, "タスク1{Enter}");
    await user.type(input, "タスク2{Enter}");
    await user.type(input, "タスク3{Enter}");

    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
    expect(screen.getByText("タスク3")).toBeInTheDocument();
  });

  it("タスク追加後、入力欄がクリアされる", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText(
      "新しいタスクを入力..."
    ) as HTMLInputElement;

    await user.type(input, "テスト{Enter}");

    expect(input.value).toBe("");
  });
});

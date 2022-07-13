export type Id = string
export type Title = string
export type TodoList = Array<Todo>

export interface Todo {
  id: Id
  title: Title
  active: boolean
}

export type CreateTodo = (title: Title) => Todo
export type AddTodoToList = (list: TodoList, todo: Todo) => TodoList
export type RemoveTodoFromList = (list: TodoList, todo: Todo) => TodoList
export type EditTodo = (old: Todo, updated: Todo) => Todo
export type EditTodoInList = (list: TodoList, updated: Todo) => TodoList

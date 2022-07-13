import { LocalStorageRepository } from 'core/data/LocalStorage'
import React from 'react'
import { v4 as uuid4 } from 'uuid'
import { Form } from './Form'
import { Todo } from './Todo'
import {
  AddTodoToList,
  CreateTodo,
  Title,
  Todo as Item
} from '../core/rules/Todos'
import { Repository } from 'core/data/repository'
import './styles.css'

function App() {
  const [lsr, setLsr] = React.useState<LocalStorageRepository>(
    () => new LocalStorageRepository('app:todos')
  )
  const [list, setList] = React.useState<Array<Item>>(
    lsr != null ? lsr.getAll() : []
  )
  const [active, setActive] = React.useState(0)
  const [tooltip, setTooltip] = React.useState(false)

  React.useEffect(() => {
    setList(lsr.getAll())
  }, [lsr])

  const create: CreateTodo = (title: Title) => ({
    id: uuid4(),
    title,
    active: true
  })

  const addTodo: AddTodoToList = (list, todo) => {
    return list.concat(todo)
  }

  const syncUpdate = (repo: Repository<Item>, title: Title) => {
    const newTodo = create(title)
    const updatedList = addTodo(repo.getAll(), newTodo)
    repo.save(newTodo)
    setList(updatedList)
    setActive(0)
  }

  function deleteTodo(item: Item) {
    lsr.delete(item)
    setList(lsr.getAll())
  }

  function toggleTodo(item: Item) {
    lsr.update({ ...item, active: !item.active })
    setList(lsr.getAll())
  }

  return (
    <>
      <header className="pt-8 pb-4">
        <h1 className="mx-auto w-3/4 font-Montserrat text-3xl">
          Yet another Todo list
        </h1>
      </header>
      <div className="spacer mb-4" />
      <Form
        handleSubmit={(e) => {
          const form = new FormData(e.target as HTMLFormElement)
          const title = form.get('title')?.toString()
          if (title) {
            syncUpdate(lsr, title)
          }
        }}
      />
      <div className="spacer mb-8" />

      <ul className="mx-auto flex w-3/4 border-b">
        <li
          className={`w-28 cursor-pointer py-4 px-6 text-center${
            active === 0 ? ' bg-slate-300 text-white' : ''
          }`}
          onClick={() => setActive(0)}
        >
          <h3>Active</h3>
        </li>
        <li
          className={`w-28 cursor-pointer py-4 px-6 text-center${
            active === 1 ? ' bg-slate-300 text-white' : ''
          }`}
          onClick={() => setActive(1)}
        >
          <h3>Finished</h3>
        </li>
        <li className="w-28 cursor-default py-4 pl-1 pr-6 text-left">
          <span
            className="info-icon"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            ?
            {tooltip ? (
              <div className="tooltip absolute left-0 z-10 w-64 rounded bg-teal-500 px-1 py-4 text-white">
                Click on the Todo name to check it as Finished. Click on the
                delete button to exclude it from the lists.
              </div>
            ) : null}
          </span>
        </li>
      </ul>
      {active === 0 &&
        list.map((t: Item) =>
          t.active ? (
            <Todo
              key={t.id}
              id={t.id}
              title={t.title}
              active={t.active}
              handleClose={deleteTodo}
              handleDone={toggleTodo}
            />
          ) : null
        )}

      {active === 1 &&
        list.map((t: Item) =>
          t.active === false ? (
            <Todo
              key={t.id}
              id={t.id}
              title={t.title}
              active={t.active}
              handleClose={deleteTodo}
              handleDone={toggleTodo}
            />
          ) : null
        )}
    </>
  )
}

export default App

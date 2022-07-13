import { Todo as Item } from 'core/rules/Todos'

type TodoProps = {
  title: string
  id: string
  active: boolean
  handleClose: (item: Item) => void
  handleDone: (item: Item) => void
}

export function Todo({
  title,
  id,
  active,
  handleClose,
  handleDone
}: TodoProps) {
  return (
    <div className="mx-auto flex w-3/4 items-center justify-between border-y px-6 py-5">
      <div
        className="cursor-pointer"
        onClick={(_) => handleDone({ id, title, active })}
      >
        <p className="mb-1">{title}</p>
      </div>
      <div>
        <span
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-red-400 text-white"
          onClick={(_) => handleClose({ id, title, active })}
        >
          X
        </span>
      </div>
    </div>
  )
}

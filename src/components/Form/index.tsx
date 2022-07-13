import React from 'react'

type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function Form({ handleSubmit }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
        ;(e.target as HTMLFormElement).reset()
      }}
      className="mx-auto flex w-3/4 flex-col"
    >
      <label className="mb-4 flex flex-col" htmlFor="todo-title">
        <span className="mb-1 text-xl">Create new Todo</span>
        <input
          className="border-2 px-4 py-2"
          type="text"
          name="title"
          id="todo-title"
        />
      </label>

      <button
        className="w-fit rounded bg-slate-900 px-4 py-2 text-slate-300"
        type="submit"
      >
        Create
      </button>
    </form>
  )
}

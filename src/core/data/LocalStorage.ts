import { Todo } from 'core/rules/Todos'
import { Repository } from './repository'

export class LocalStorageRepository implements Repository<Todo> {
  private storageKey: string

  constructor(key: string) {
    this.storageKey = key
  }

  get stored(): Array<Todo> {
    const storedList = localStorage.getItem(this.storageKey)
    if (storedList != null) {
      return JSON.parse(storedList)
    }

    return []
  }

  save(item: Todo) {
    const stored = this.stored
    const updatedList = stored.concat(item)
    localStorage.setItem(this.storageKey, JSON.stringify(updatedList))
  }

  get(item: Todo) {
    const stored = this.stored
    const filtered = stored.filter((todo: Todo) => todo.id === item.id)
    return filtered[0] || null
  }

  getAll() {
    return this.stored
  }

  update(item: Todo) {
    const stored = this.stored
    const updatedList = stored.map((todo: Todo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          ...item
        }
      }

      return todo
    })

    localStorage.setItem(this.storageKey, JSON.stringify(updatedList))
  }

  delete(item: Todo) {
    const stored = this.stored
    const updatedList = stored.filter((todo: Todo) => todo.id !== item.id)

    localStorage.setItem(this.storageKey, JSON.stringify(updatedList))
  }
}

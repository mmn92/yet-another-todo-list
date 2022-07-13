export interface Repository<T> {
  save: (item: T) => void
  get: (item: T) => T
  getAll: () => Array<T>
  update: (item: T) => void
  delete: (item: T) => void
}

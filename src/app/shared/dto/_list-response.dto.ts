export interface ListViewDTO<T> {
    pageSize: number,
    pageIndex: number,
    totalCount: number,
    items: T[]
  }
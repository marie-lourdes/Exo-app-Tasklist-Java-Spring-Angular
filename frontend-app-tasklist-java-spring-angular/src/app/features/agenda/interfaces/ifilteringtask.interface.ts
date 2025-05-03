export interface IFilteringTask {
  getTasksByDate(date: string | null): Signal<Task[]>;
  groupedTasksByDate(): Signal<Map<string, Task[]>>
}

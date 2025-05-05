export interface ITask {
  id?: number;
  title: string;
  completed: boolean;
  description?: string;
  date: string; // Format: YYYY-MM-DD
}

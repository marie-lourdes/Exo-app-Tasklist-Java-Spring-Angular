export class Task {
  id?: number;
  title: string;
  completed: boolean;
  description?: string;
  date: string; // Format: YYYY-MM-DD

  constructor(title: string, completed: boolean, date: string) {
    this.title = title;
    this.completed = completed;
    this.date = date;
  }
}

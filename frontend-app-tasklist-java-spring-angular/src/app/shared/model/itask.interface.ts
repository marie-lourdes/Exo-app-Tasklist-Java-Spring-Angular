import {TaskStatus} from '@app/shared';
export interface ITask {
  id?: number;
  title: string;
  status:TaskStatus;
  description?: string;
  date: string; // Format: YYYY-MM-DD
}

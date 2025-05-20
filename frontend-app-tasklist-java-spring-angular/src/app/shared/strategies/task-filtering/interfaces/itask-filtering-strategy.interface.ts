export interface ItaskFilteringStrategy {
  filter(tasks: ITask[], criteria: any): ITask[];
}

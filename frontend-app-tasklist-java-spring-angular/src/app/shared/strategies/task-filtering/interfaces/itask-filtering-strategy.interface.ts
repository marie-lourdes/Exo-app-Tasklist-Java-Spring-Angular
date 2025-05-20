// pure fonction avec un parametre plus generique de type any et permet  l'ajout de d'autres filtrage
import { ITask} from '../../../model/itask.interface';

export interface ItaskFilteringStrategy {
  filter(tasks: ITask[], criteria: any): ITask[];
}

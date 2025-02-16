import { Component,OnInit,  } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
 // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';

    ngOnInit(): void {}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//interface  cree pour l objet Task au lieu d une couche model avec une class Task
   export interface Task {
     id?: number;
     title: string;
     completed: boolean;
   }
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //api vec springboot
  private apiUrl = 'http://localhost:8080/api/tasks';
  // initialisation l'objet HttpClient
  constructor(private http: HttpClient) { }
}

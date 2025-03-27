package com.TaskList.backend_app_tasklist_java_spring_angular.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TaskList.backend_app_tasklist_java_spring_angular.model.Task;
import com.TaskList.backend_app_tasklist_java_spring_angular.service.TaskService;

@RestController // a la diffrence de controller qui englobe egalement le restcontroller, le
				// restcontroller comprend @responsebody en valeur retourné serialisé au format
				// JSON et comprend @requestbody avec les objet java (deserialization)
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
//@Crossorigin(url server Angular 4200) : supprimer les securité dans les header des requetes CRUD du server angular et spring boot tom cat 8080
public class TaskController {

	@Autowired
	TaskService taskService;

	@PostMapping("/save")
	public Task createTask(@RequestBody Task task) {
		return taskService.saveOneTask(task);
	}

	@PutMapping("update/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
		Task taskUpdated = taskService.findOneTaskById(id);
		taskUpdated.setTitle(taskDetails.getTitle());
		taskUpdated.setCompleted(taskDetails.isCompleted());
		return taskService.updateOneTaskById(taskUpdated);
	}

	@DeleteMapping("delete/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteOneTaskById(id);
	}

	/*
	 * @GetMapping("details/{id}") public Task getTaskById(@PathVariable Long id) {
	 * return taskService.findOneTaskById(id);
	 * 
	 * }
	 */

	@GetMapping("details/{date}")
	public List<Task> getTasksByDate(@PathVariable String date) {
		return taskService.findTasksByDate(date);
	}


	/*Récupérer les tâches entre deux dates du debut du mois actif à la fin du mois acttif lors de la navigation entre les mois dans l interface
	 * avec l endpoint /api/tasks?start=2025-02-15&end=2025-02-17 par exemple
	 * - Les Query Parameters peuvent être **optionnels**, ce qui est idéal pour
	 * implémenter une API plus flexible. 
	 * - Si l' API doit retourner toutes les
	 * tâches (sans filtrer par dates) lorsque les paramètres `start` ou `end` ne
	 * sont pas fournis, avec `@RequestParam`, il est possible de définir des
	 * valeurs par défaut :
	 */

	@GetMapping
	public List<Task> getAllTaskByDate(@RequestParam(required = false) String start,
			@RequestParam(required = false) String end) {
		
		// Conversion des paramètres en LocalDate
		/*LocalDate startDate = LocalDate.parse(start);
		LocalDate endDate = LocalDate.parse(end);*/
		
		if (start == null && end == null) {
			return taskService.findAllTasks();
		} else {
			// Obtenir les tâches pour la plage de dates
			return taskService.findTasksBetweenDates(start, end);
		}

	}
}

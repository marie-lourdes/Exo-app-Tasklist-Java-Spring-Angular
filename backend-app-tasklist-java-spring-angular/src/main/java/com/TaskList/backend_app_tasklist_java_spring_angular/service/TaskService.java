package com.TaskList.backend_app_tasklist_java_spring_angular.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.TaskList.backend_app_tasklist_java_spring_angular.model.Task;
import com.TaskList.backend_app_tasklist_java_spring_angular.repository.TaskRepository;

@Service
public class TaskService {
	@Autowired
	TaskRepository taskRepository;

	public Task saveOneTask(Task task) {
		return taskRepository.save(task);
	}

	public Task updateOneTaskById(Task taskUpdated) {
	    System.out.println(" request put"+taskUpdated.isCompleted());
		return taskRepository.save(taskUpdated);
	}

	public void deleteOneTaskById(Long id) {
		taskRepository.deleteById(id);
	}

	public Task findOneTaskById(Long id) {
		// lamethode retour un objet Optional<Task> mais avec la methode .get() ou ici
		// la methode orElseTrow(), il recupere l objet task contenu dans un objet
		// Optional
		return taskRepository.findById(id).orElseThrow(() -> new NullPointerException("task not found"));
	}
	
	public List<Task> findTasksByDate(String date) {
		return taskRepository.findByDate(LocalDate.parse(date));
		
	}
	public List<Task> findAllTasks() {
		return taskRepository.findAll();
	}
}

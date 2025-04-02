package com.TaskList.backend_app_tasklist_java_spring_angular.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import com.TaskList.backend_app_tasklist_java_spring_angular.model.Task;
import com.TaskList.backend_app_tasklist_java_spring_angular.repository.TaskRepository;

@Service
public class TaskService {	
	private TaskRepository taskRepository;
	
	public TaskService (TaskRepository taskRepository) {
		this.taskRepository= taskRepository;
	}

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
		return taskRepository.findById(id).orElseThrow(() -> new NullPointerException("task not found"));
	}
	
	public List<Task> findTasksByDate(String date) {
		return taskRepository.findByDate(LocalDate.parse(date));
		
	}
	

    public List<Task> findTasksBetweenDates(String startDate, String endDate) {
        return taskRepository.findByDateBetween(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

	public List<Task> findAllTasks() {
		return taskRepository.findAll();
	}
}

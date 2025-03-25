package com.TaskList.backend_app_tasklist_java_spring_angular.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskList.backend_app_tasklist_java_spring_angular.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
	List<Task> findByDate(LocalDate date);
	// Méthode pour filtrer les tâches par plage de dates
    List<Task> findByDateBetween(LocalDate startDate, LocalDate endDate);

}

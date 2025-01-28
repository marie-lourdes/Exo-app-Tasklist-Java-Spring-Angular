package com.TaskList.backend_app_tasklist_java_spring_angular.repository;

import com.TaskList.backend_app_tasklist_java_spring_angular.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

}

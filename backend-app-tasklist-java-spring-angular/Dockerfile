# Utiliser une image Java pour exécuter l'application
FROM openjdk:17

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR généré dans le conteneur
COPY lib/backend-app-tasklist-java-spring-angular.jar /app/backend-tasklist-application.jar.jar

# Exposer le port utilisé par l'application Spring Boot
EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "/app/backend-tasklist-application.jar"]


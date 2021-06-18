FROM openjdk:17-ea-14-jdk-alpine3.13
RUN addgroup app && adduser -S -G app app
USER app
COPY target/Mareu-0.0.1-SNAPSHOT.jar Mareu-0.0.1.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/Mareu-0.0.1.jar"]
package com.lamzone.Mareu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(Class<?> clazz, String paramName, String paramValue ){
        super(clazz.getSimpleName() + " with the given " + paramName + " {" + paramValue + "}" + " was not found");
    }
}
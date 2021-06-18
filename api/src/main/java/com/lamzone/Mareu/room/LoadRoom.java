package com.lamzone.Mareu.room;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadRoom {
    @Bean
    CommandLineRunner commandLineRunner(RoomRepository repository){
        return args -> {
            repository.save(new Room("Mario", true));
            repository.save(new Room("Luigi", true));
            repository.save(new Room("Peach", true));
            repository.save(new Room("Toad", true));
            repository.save(new Room("Bowser", true));
            repository.save(new Room("Wario", true));
            repository.save(new Room("Daisy", true));
            repository.save(new Room("Donkey Kong", true));
            repository.save(new Room("Yoshi", true));
            repository.save(new Room("Koopa", true));
        };
    }
}

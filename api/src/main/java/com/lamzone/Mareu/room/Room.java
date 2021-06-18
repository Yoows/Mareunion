package com.lamzone.Mareu.room;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ROOM_ID")
    private Long roomId;

    @Column(name = "NAME")
    private String name;

    @Column(name = "IS_FREE")
    private boolean isFree;

    public Room(String name, boolean isFree){
        this.name = name;
        this.isFree = isFree;
    }
}

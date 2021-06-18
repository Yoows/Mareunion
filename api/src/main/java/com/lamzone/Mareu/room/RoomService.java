package com.lamzone.Mareu.room;

import java.util.List;

public interface RoomService {
    List<Room> allFreeRooms();
    void freeRoom(Long id);
    void bookRoom(Long id);
    List<Room> allRooms();
    Room one(Long roomId);
}

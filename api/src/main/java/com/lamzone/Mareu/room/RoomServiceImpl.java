package com.lamzone.Mareu.room;

import com.lamzone.Mareu.exception.EntityNotFoundException;
import com.lamzone.Mareu.meeting.Meeting;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService  {
    private final RoomRepository roomRepository;

    @Override
    public List<Room> allFreeRooms() {
        return roomRepository.findAll()
                .stream()
                .filter(Room::isFree)
                .collect(Collectors.toList());
    }

    @Override
    public void freeRoom(Long id) {
        Room room = getRoom(id);
        room.setFree(true);
        roomRepository.save(room);
    }

    @Override
    public void bookRoom(Long id) {
        Room room = getRoom(id);
        room.setFree(false);
        roomRepository.save(room);
    }

    @Override
    public List<Room> allRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room one(Long roomId) {
        return getRoom(roomId);
    }

    private Room getRoom(Long id) {
        return roomRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Meeting.class, "roomId", id.toString()));
    }
}

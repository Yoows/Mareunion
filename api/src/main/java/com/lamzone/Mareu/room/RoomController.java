package com.lamzone.Mareu.room;

import lombok.AllArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/rooms")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class RoomController {
    private final RoomModelAssembler assembler;
    private final RoomService service;

    @GetMapping("/{roomId}")
    public EntityModel<Room> one(@PathVariable Long roomId) { return assembler.toModel(service.one(roomId)); }

    @GetMapping
    public CollectionModel<EntityModel<Room>> allRooms() {
        return assembler.toCollectionModel(service.allRooms());
    }

    @GetMapping("/free-rooms")
    public CollectionModel<EntityModel<Room>> allFreeRooms(){ return assembler.toCollectionModel(service.allFreeRooms()); }
}

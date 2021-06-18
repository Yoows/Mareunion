package com.lamzone.Mareu.room;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Configuration
@AllArgsConstructor
public class RoomModelAssembler implements RepresentationModelAssembler<Room, EntityModel<Room>> {
    private final RoomService roomService;
    @Override
    public EntityModel<Room> toModel(Room room) {
        EntityModel<Room> roomEntityModel = EntityModel.of(
                room,
                linkTo(methodOn(RoomController.class).one(room.getRoomId())).withSelfRel(),
                linkTo(methodOn(RoomController.class).allRooms()).withRel("rooms")
        );


        if(!roomService.allFreeRooms().isEmpty()){
            roomEntityModel.add(linkTo(methodOn(RoomController.class).allFreeRooms()).withRel("freeRooms"));
        }

        return roomEntityModel;
    }

    @Override
    public CollectionModel<EntityModel<Room>> toCollectionModel(Iterable<? extends Room> entities) {
        CollectionModel<EntityModel<Room>> entityModels = RepresentationModelAssembler.super.toCollectionModel(entities);
        return entityModels.add(linkTo(methodOn(RoomController.class).allRooms()).withSelfRel());
    }
}


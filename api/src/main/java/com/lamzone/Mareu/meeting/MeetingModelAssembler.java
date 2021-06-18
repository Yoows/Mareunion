package com.lamzone.Mareu.meeting;

import com.lamzone.Mareu.room.RoomController;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Configuration
public class MeetingModelAssembler implements RepresentationModelAssembler<Meeting, EntityModel<Meeting>> {

    @Override
    public EntityModel<Meeting> toModel(Meeting meeting) {
        return EntityModel.of(
                meeting,
                linkTo(methodOn(MeetingController.class).one(meeting.getMeetingId())).withSelfRel(),
                linkTo(methodOn(MeetingController.class).allMeetings()).withRel("meetings"),
                linkTo(methodOn(RoomController.class).one(meeting.getRoom().getRoomId())).withRel("room")
        );
    }

    @Override
    public CollectionModel<EntityModel<Meeting>> toCollectionModel(Iterable<? extends Meeting> entities) {
        CollectionModel<EntityModel<Meeting>> entityModels = RepresentationModelAssembler.super.toCollectionModel(entities);
        return entityModels.add(linkTo(methodOn(MeetingController.class).allMeetings()).withSelfRel());
    }
}

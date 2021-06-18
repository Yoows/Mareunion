package com.lamzone.Mareu.meeting;

import lombok.AllArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/meetings")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class MeetingController {
    private final MeetingModelAssembler assembler;
    private final MeetingService service;
    
    @GetMapping
    CollectionModel<EntityModel<Meeting>> allMeetings() {
        return assembler.toCollectionModel(service.allMeetings());
    }

    @GetMapping("/{id}")
    public EntityModel<Meeting> one(@PathVariable Long id) {
        return assembler.toModel(service.one(id));
    }

    @PostMapping
    public ResponseEntity<EntityModel<Meeting>> newMeeting(@RequestBody Meeting meeting) {
        EntityModel<Meeting> meetingEntityModel = assembler.toModel(service.newMeeting(meeting));
        return ResponseEntity
                .created(meetingEntityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(meetingEntityModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id) {
        service.deleteMeeting(id);
        return ResponseEntity.noContent().build();
    }
}

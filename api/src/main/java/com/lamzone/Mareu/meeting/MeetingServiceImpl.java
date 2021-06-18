package com.lamzone.Mareu.meeting;

import com.lamzone.Mareu.exception.EntityNotFoundException;
import com.lamzone.Mareu.meeting.participant.Participant;
import com.lamzone.Mareu.meeting.participant.ParticipantService;
import com.lamzone.Mareu.room.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MeetingServiceImpl implements MeetingService {
    private final MeetingRepository meetingRepository;
    private final ParticipantService participantService;
    private final RoomService roomService;

    @Override
    public Meeting newMeeting(Meeting meeting) {
        List<Participant> participants = meeting.getParticipants();
        Meeting newM = meetingRepository.save(meeting);

        participants.forEach(participant -> {
            participant.setMeeting(newM);
            participantService.newParticipant(participant);
        });

        roomService.bookRoom(newM.getRoom().getRoomId());
        newM.setParticipants(participants);

        return meetingRepository.save(newM);
    }

    @Override
    public void deleteMeeting(Long id) {
        Meeting meeting = meetingRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Meeting.class, "meetingId", id.toString()));
        roomService.freeRoom(meeting.getRoom().getRoomId());
        meetingRepository.delete(meeting);
    }

    @Override
    public List<Meeting> allMeetings() {
        return meetingRepository.findAll();
    }

    @Override
    public Meeting one(Long id) {
        return meetingRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Meeting.class, "meetingId", id.toString()));
    }
}

package com.lamzone.Mareu.meeting.participant;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ParticipantServiceImpl implements ParticipantService{

    private final ParticipantRepository participantRepository;

    @Override
    public Participant newParticipant(Participant participant) {
        return participantRepository.save(participant);
    }
}

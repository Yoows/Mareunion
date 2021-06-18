package com.lamzone.Mareu.meeting.participant;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lamzone.Mareu.meeting.Meeting;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "meeting"})
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PARTICIPANT_ID")
    private Long participantId;

    @Column(name = "EMAIl")
    private String email;

    @ManyToOne
    @JoinColumn(name = "MEETING_ID", nullable = false)
    private Meeting meeting;
}

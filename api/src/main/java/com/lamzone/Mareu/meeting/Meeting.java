package com.lamzone.Mareu.meeting;

import com.lamzone.Mareu.meeting.participant.Participant;
import com.lamzone.Mareu.room.Room;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MEETING_ID")
    private Long meetingId;

    @Column(name = "TIME")
    private LocalTime time;

    @OneToOne
    @JoinColumn(name = "ROOM_ID")
    private Room room;

    @Column(name = "SUBJECT")
    private String subject;

    @Column(name = "DURATION")
    private int duration;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.REMOVE)
    private List<Participant> participants;
}

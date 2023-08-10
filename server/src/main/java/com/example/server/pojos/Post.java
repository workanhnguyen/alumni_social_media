/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 *
 * @author ASUS
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
@XmlRootElement
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Lob
    @Size(max = 65535)
    @Column(name = "content")
    private String content;
    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    @Column(name = "is_survey")
    private Short isSurvey;
    @Column(name = "is_locked")
    private Short isLocked;
    @JoinColumn(name = "users_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User usersId;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postsId")
    private Set<Interaction> interactionSet;
    @JsonIgnore
    @OneToMany(mappedBy = "postsId")
    private Set<Survey> surveySet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postsId")
    private Set<Comment> commentSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postsId")
    private Set<Share> shareSet;
}

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
import javax.validation.constraints.NotNull;
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
@Table(name = "user")
@XmlRootElement
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "username")
    private String username;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "password")
    private String password;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 20)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "first_name")
    private String firstName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "last_name")
    private String lastName;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 10)
    @Column(name = "phone")
    private String phone;
    @Size(max = 255)
    @Column(name = "avatar")
    private String avatar;
    @Size(max = 255)
    @Column(name = "bg_image")
    private String bgImage;
    @Size(max = 255)
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    @Column(name = "date_joined")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateJoined;
    @Column(name = "is_active")
    private Short isActive;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "role")
    private String role;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Lecturer> lecturerSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Alumni> alumniSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Post> postSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Interaction> interactionSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Survey> surveySet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Comment> commentSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usersId")
    private Set<Share> shareSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    private Set<GroupMember> groupMemberSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "creatorId")
    private Set<Group> groupSet;
}

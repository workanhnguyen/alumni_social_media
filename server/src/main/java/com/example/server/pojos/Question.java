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
import java.util.Set;

/**
 *
 * @author ASUS
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "question")
@XmlRootElement
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 255)
    @Column(name = "content")
    private String content;
    @JoinColumn(name = "surveys_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Survey surveysId;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "questionsId")
    private Set<Response> responseSet;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "questionsId")
    private Set<Option> optionSet;
}

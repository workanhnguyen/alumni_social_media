/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.pojos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 *
 * @author ASUS
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "response")
@XmlRootElement
public class Response implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 255)
    @Column(name = "content")
    private String content;
    @JoinColumn(name = "options_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Option optionsId;
    @JoinColumn(name = "questions_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Question questionsId;
    @JoinColumn(name = "surveys_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Survey surveysId;
}

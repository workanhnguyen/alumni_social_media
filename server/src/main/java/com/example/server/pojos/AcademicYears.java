/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.pojos;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author maidv
 */
@Entity
@Table(name = "academic_years")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "AcademicYears.findAll", query = "SELECT a FROM AcademicYears a"),
    @NamedQuery(name = "AcademicYears.findById", query = "SELECT a FROM AcademicYears a WHERE a.id = :id"),
    @NamedQuery(name = "AcademicYears.findByYear", query = "SELECT a FROM AcademicYears a WHERE a.year = :year"),
    @NamedQuery(name = "AcademicYears.findByCreatedAt", query = "SELECT a FROM AcademicYears a WHERE a.createdAt = :createdAt"),
    @NamedQuery(name = "AcademicYears.findByUpdatedAt", query = "SELECT a FROM AcademicYears a WHERE a.updatedAt = :updatedAt")})
public class AcademicYears implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "year")
    private Integer year;
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
    @JoinTable(name = "academic_year_department", joinColumns = {
        @JoinColumn(name = "academic_year_id", referencedColumnName = "id")}, inverseJoinColumns = {
        @JoinColumn(name = "department_id", referencedColumnName = "id")})
    @ManyToMany
    private Set<Departments> departmentsSet;

    public AcademicYears() {
    }

    public AcademicYears(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @XmlTransient
    public Set<Departments> getDepartmentsSet() {
        return departmentsSet;
    }

    public void setDepartmentsSet(Set<Departments> departmentsSet) {
        this.departmentsSet = departmentsSet;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof AcademicYears)) {
            return false;
        }
        AcademicYears other = (AcademicYears) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.server.pojos.AcademicYears[ id=" + id + " ]";
    }
    
}

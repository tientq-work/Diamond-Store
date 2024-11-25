package com.example.diamondstore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Role")
public class Role {
    @Id
    @Column(name = "roleid", nullable = false, updatable = false, unique = true)
    private int roleid;

    @Column(name = "role_name", nullable=false, unique=true)
    private String rolename;

    @JsonIgnore
    @OneToMany(mappedBy = "roleid", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<User> users;
}

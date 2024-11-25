package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
   Role findRoleByRoleid(int roleid);

}
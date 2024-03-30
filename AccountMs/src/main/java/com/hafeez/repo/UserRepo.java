package com.hafeez.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hafeez.model.loginUser;

@Repository
public interface UserRepo extends JpaRepository<loginUser, Integer>{

	@Query(value="select * from login_user where username=:username and password=:password",nativeQuery = true)
	loginUser findByUserNameAndPassword(String username,String password);
	
	@Query(value="select * from login_user where username=:username",nativeQuery = true)
	loginUser findByUserName(String username);



}

package com.hafeez.controller;

import javax.sql.rowset.serial.SerialException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hafeez.config.JwtGeneratorInterface;
import com.hafeez.model.loginUser;
import com.hafeez.repo.UserRepo;
import com.hafeez.so.Response;


@RestController
@CrossOrigin(exposedHeaders = {"Authorization"},origins = "http://localhost:3000")
@RequestMapping("user")
public class loginController {
	
	Logger logger=LoggerFactory.getLogger(loginController.class);
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private JwtGeneratorInterface jwtGenerator;
	
	@PostMapping("/register")
	public ResponseEntity<Object> registerUser(@RequestBody loginUser user) {
		loginUser userDtls=userRepo.findByUserName(user.getUsername());
		if(userDtls!=null && userDtls.getUsername()!=null && !StringUtils.isEmpty(userDtls.getUsername())) return new ResponseEntity<Object>( new Response(false,"User alread exists!!!"),HttpStatus.OK);
		userRepo.save(user);
		return new ResponseEntity<Object>(new Response(true,"New User Saved successfully!!"),HttpStatus.OK);
	}
	
	@GetMapping("/get/{username}/{password}")
	public ResponseEntity<?> getUser(@PathVariable("username") String username,@PathVariable("password") String password) {
		logger.info("Here "+username);
		loginUser user=userRepo.findByUserNameAndPassword(username,password);
		if(user!=null) {
			logger.info(user.toString());
			return new ResponseEntity<>(new Response(true,jwtGenerator.generateToken(user).get("token")),HttpStatus.OK);
		}
		return new ResponseEntity<>(new Response(false,""),HttpStatus.OK);
	}
	
	@GetMapping("/testWithToken")
	@CrossOrigin(allowedHeaders = {"Authorization"},origins = {"http://localhost:3000"})
	public ResponseEntity<?> testWithToken() {
		return new ResponseEntity<>(new Response(true,"Authorized"),HttpStatus.OK);
	}
	@GetMapping("/testWithoutToken")
	public ResponseEntity<?> testWithoutToken() {
			
		return new ResponseEntity<>(new Response(false,"UnAuthorized"),HttpStatus.OK);
	}


}

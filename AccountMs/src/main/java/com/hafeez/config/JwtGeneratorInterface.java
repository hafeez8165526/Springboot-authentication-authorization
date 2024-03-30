package com.hafeez.config;

import java.util.Map;

import com.hafeez.model.loginUser;

public interface JwtGeneratorInterface {
	
	Map<String,String> generateToken(loginUser user);
}

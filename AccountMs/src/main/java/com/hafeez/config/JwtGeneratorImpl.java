package com.hafeez.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.hafeez.model.loginUser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtGeneratorImpl implements JwtGeneratorInterface {

	@Value(value = "${jwt.secret}")
	private String secret;
	@Value(value = "${jwt.message}")
	private String tokenMsg;

	@Override
	public Map<String, String> generateToken(loginUser user) {
		String token = "";
		token = Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secret").compact();
		Map<String,String> tokenMap=new HashMap<>();
		tokenMap.put("token", token);
		tokenMap.put("message", tokenMsg);
		
		return tokenMap;
	}

}

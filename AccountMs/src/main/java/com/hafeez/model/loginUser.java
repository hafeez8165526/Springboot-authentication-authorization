package com.hafeez.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class loginUser {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userid;
	@Column
	private String username;
	@Column
	private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public loginUser(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public loginUser() {
		super();
	}
	@Override
	public String toString() {
		return "loginUser [userid=" + userid + ", username=" + username + ", password=" + password + "]";
	}
	
	
	
	

}

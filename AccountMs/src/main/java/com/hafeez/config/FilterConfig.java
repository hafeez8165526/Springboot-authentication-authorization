package com.hafeez.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
	
	// secure the following mentioned apis
	@Bean
	public FilterRegistrationBean jwtFilter(){
		FilterRegistrationBean 	filter=new FilterRegistrationBean();
		filter.setFilter(new JwtFilter());
		filter.addUrlPatterns("/user/testWithToken","/user/testWithoutToken");
		return filter;
		
	}

}

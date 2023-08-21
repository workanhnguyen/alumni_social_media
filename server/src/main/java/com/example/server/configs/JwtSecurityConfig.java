/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.configs;

/**
 *
 * @author maidv
 */

import com.example.server.filters.CustomAccessDeniedHandler;
import com.example.server.filters.JwtAuthenticationTokenFilter;
import com.example.server.filters.RestAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableWebSecurity
@EnableTransactionManagement
@ComponentScan(basePackages = {
        "com.example.server.controllers",
        "com.example.server.repositories",
        "com.example.server.services",
        "com.example.server.components"})
@Order(1)
public class JwtSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
        JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
        jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
        return jwtAuthenticationTokenFilter;
    }

    @Bean
    public RestAuthenticationEntryPoint restServicesEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth)
//            throws Exception {
//        auth.userDetailsService(userDetailsService)
//                .passwordEncoder(passwordEncoder());
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.formLogin()
//                .usernameParameter("username")
//                .passwordParameter("password");
//
//        http.formLogin().defaultSuccessUrl("/")
//                .failureUrl("/login?error");
//
//        http.logout().logoutSuccessUrl("/login");
//
//        http.exceptionHandling()
//                .accessDeniedPage("/login?accessDenied");

//        http.authorizeRequests().antMatchers("/").permitAll()
//            .antMatchers("/api/**")
//            .access("hasRole('ROLE_ADMIN')");
//        http.csrf().disable();

        // Disable crsf cho đường dẫn /rest/**
        http.csrf().ignoringAntMatchers("/api/**");
        http.authorizeRequests().antMatchers("/api/users/sign_in").permitAll();
        http.authorizeRequests().antMatchers("/api/users/sign_up").permitAll();
        http.authorizeRequests().antMatchers("/api/users/").permitAll();
        http.antMatcher("/api/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/**").access("hasRole('0') or hasRole('1')")
                .antMatchers(HttpMethod.POST, "/api/**").access("hasRole('0') or hasRole('1')")
                .antMatchers(HttpMethod.DELETE, "/api/**").access("hasRole('0') or hasRole('1')").and()
                .addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
    }
}
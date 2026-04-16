package com.auth.controller;

import com.auth.dto.LoginRequest;
import com.auth.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, String> response = new HashMap<>();
        
        // Mock DB lookup
        if ("admin".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            response.put("accessToken", JwtUtil.generateAccessToken("admin", "ADMIN"));
            response.put("refreshToken", JwtUtil.generateRefreshToken("admin"));
            response.put("role", "ADMIN");
            return ResponseEntity.ok(response);
        } else if ("user".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            response.put("accessToken", JwtUtil.generateAccessToken("user", "USER"));
            response.put("refreshToken", JwtUtil.generateRefreshToken("user"));
            response.put("role", "USER");
            return ResponseEntity.ok(response);
        }
        
        response.put("error", "Invalid credentials");
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Refresh-Token") String refreshToken) {
        if (refreshToken != null && JwtUtil.validateToken(refreshToken)) {
            String username = JwtUtil.extractAllClaims(refreshToken).getSubject();
            // In a real app, query DB to get current role. Hardcoding for demo.
            String role = username.equals("admin") ? "ADMIN" : "USER"; 
            
            Map<String, String> response = new HashMap<>();
            response.put("accessToken", JwtUtil.generateAccessToken(username, role));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(403).body(Map.of("error", "Invalid Refresh Token"));
    }
}
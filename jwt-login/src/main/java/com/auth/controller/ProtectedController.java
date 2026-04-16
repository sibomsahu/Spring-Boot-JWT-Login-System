package com.auth.controller;

import com.auth.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProtectedController {

    @GetMapping("/secure-data")
    public ResponseEntity<?> getSecureData(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Unauthorized: Missing Token");
            return ResponseEntity.status(401).body(error);
        }

        String token = authHeader.substring(7);

        if (JwtUtil.validateToken(token)) {
            String username = JwtUtil.extractUsername(token);
            
            // Sending back a rich JSON object for our dashboard
            Map<String, Object> dashboardData = new HashMap<>();
            dashboardData.put("user", username);
            dashboardData.put("status", "SYSTEM ONLINE");
            dashboardData.put("activeNodes", 42);
            dashboardData.put("cpuLoad", "14.2%");
            dashboardData.put("uplink", "Secured (AES-256)");
            
            return ResponseEntity.ok(dashboardData);
        }

        Map<String, String> error = new HashMap<>();
        error.put("error", "Unauthorized: Invalid or Expired Token");
        return ResponseEntity.status(401).body(error);
    }
}
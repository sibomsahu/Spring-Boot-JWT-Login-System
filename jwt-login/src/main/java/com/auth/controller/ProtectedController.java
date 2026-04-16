package com.auth.controller;

import com.auth.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/secure")
@CrossOrigin(origins = "*")
public class ProtectedController {

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Missing Token"));
        }

        String token = authHeader.substring(7);

        if (JwtUtil.validateToken(token)) {
            Claims claims = JwtUtil.extractAllClaims(token);
            String role = claims.get("role", String.class);
            
            // ROLE BASED ACCESS CONTROL (RBAC)
            if (!"ADMIN".equals(role)) {
                return ResponseEntity.status(403).body(Map.of("error", "ACCESS DENIED: Requires ADMIN Clearance."));
            }

            Map<String, Object> data = new HashMap<>();
            data.put("user", claims.getSubject());
            data.put("status", "SYSTEM ONLINE");
            data.put("clearance", role);
            return ResponseEntity.ok(data);
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid or Expired Token"));
    }
}
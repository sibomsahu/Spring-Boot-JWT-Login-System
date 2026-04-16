# Auth\_Node 🔐

Auth\_Node is a robust, full-stack JSON Web Token (JWT) authentication system that seamlessly bridges a high-contrast Neobrutalist login interface with a premium, dark-skeuomorphic system dashboard. Engineered with Spring Boot and bespoke frontend technologies, it demonstrates advanced stateless security architecture, Role-Based Access Control (RBAC), dynamic UI transitions, and auto-generated API documentation without relying on heavy JavaScript frameworks.

### Features

  * **Advanced JWT Architecture:** Implementation of dual-token mechanics featuring short-lived Access Tokens and long-lived Refresh Tokens with automatic, silent client-side renewal.
  * **Role-Based Access Control (RBAC):** Cryptographically enforced clearance levels (`ADMIN` vs `USER`) injected directly into token claims to protect sensitive REST endpoints.
  * **Global Exception Handling:** Centralized backend error interception ensuring clean, predictable, and standardized JSON responses rather than raw stack traces.
  * **Interactive API Documentation:** Auto-generated, live Swagger/OpenAPI interface for seamless endpoint testing and schema visualization.
  * **Dynamic UI Architecture:** Smooth Single-Page Application (SPA) transition mechanics, shifting visually from a flat, high-visibility Neobrutalist login screen to a deeply textured, 3D skeuomorphic control panel.
  * **Client-Side Session Management:** Secure persistence, attachment, and retrieval of authorization tokens via HTTP headers and browser `localStorage`.
  * **Zero-Dependency Frontend:** Completely bespoke CSS and Vanilla JavaScript implementation, ensuring ultra-lightweight performance, rapid execution, and ultimate styling control.
  * **Simulated Telemetry Dashboard:** A visually striking authenticated state featuring glowing phosphor-green CRT aesthetics, recessed metal paneling, and tactile physical button states.

### Tech Stack

  * **Backend Framework:** Java 17+, Spring Boot 3.x (Spring Web)
  * **Security & Cryptography:** JJWT (`io.jsonwebtoken` api, impl, jackson)
  * **API Documentation:** Springdoc OpenAPI (Swagger UI)
  * **Frontend UI/UX:** HTML5, CSS3 (Advanced Gradients, Box-Shadows, CSS Variables)
  * **Frontend Logic:** Vanilla ES6 JavaScript (Fetch API, Async/Await)
  * **Build Tool & Dependency Management:** Apache Maven
  * **Development Environment:** Eclipse IDE / Spring Tool Suite

### Screenshots

![Neobrutalist Login Interface](https://orangepix.is/images/2026/04/16/Screenshot-2026-04-16-164036.png)
*The initial authentication gateway featuring high-contrast Neobrutalist design elements.*

![Skeuomorphic Dashboard](https://orangepix.is/images/2026/04/16/Screenshot-2026-04-16-164048.png)
*The authenticated state presenting a tactile, brushed-metal interface with recessed CRT data displays.*

### Live Demo

[Launch Auth\_Node Live Environment (Not Placed) ↗](https://www.google.com/search?q=)

### How to run

**Prerequisites:** Ensure you have Java Development Kit (JDK) 17 or higher and Apache Maven installed on your system.

**1. Clone the Repository**

```bash
git clone https://github.com/yourusername/auth-node-jwt.git
cd auth-node-jwt
```

**2. Import into Eclipse IDE**

  * Open Eclipse and navigate to `File` \> `Import`.
  * Select `Maven` \> `Existing Maven Projects` and click Next.
  * Browse to the cloned `auth-node-jwt` directory, ensure the `pom.xml` is checked, and click Finish.
  * Allow Eclipse a moment to resolve and download the JJWT, Spring Boot, and OpenAPI dependencies.

**3. Launch the Backend Server**

  * In the Eclipse Project Explorer, navigate to `src/main/java/com/auth/JwtLoginApplication.java`.
  * Right-click the file and select `Run As` \> `Java Application`.
  * Verify the application has started successfully by checking the console output for `Tomcat initialized with port 8080`.

**4. Access the Client Interface**

  * Open your preferred modern web browser (Chrome, Firefox, Safari, Edge).
  * Navigate to the locally hosted static directory via Spring Boot's embedded server:
    ```text
    http://localhost:8080/index.html
    ```
  * **Test RBAC Credentials:** \* To access the secure dashboard, log in as an administrator: `USER_ID`: **admin** | `KEY_PHRASE`: **password**
      * To test the "Insufficient Clearance" rejection: `USER_ID`: **user** | `KEY_PHRASE`: **password**

**5. Explore the API Documentation**

  * Navigate to the auto-generated Swagger UI to test backend endpoints directly:
    ```text
    http://localhost:8080/swagger-ui.html
    ```

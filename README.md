# Auth\_Node 🔐

Auth\_Node is a robust, full-stack JSON Web Token (JWT) authentication system that seamlessly bridges a high-contrast Neobrutalist login interface with a premium, dark-skeuomorphic system dashboard. Engineered with Spring Boot and bespoke frontend technologies, it demonstrates stateless security architecture, dynamic UI transitions, and protected REST API endpoints without relying on heavy JavaScript frameworks.

### Features

  * **Stateless JWT Authentication:** Secure generation, cryptographic signing (HMAC-SHA256), and rigorous validation of JSON Web Tokens for robust session handling.
  * **Dynamic UI Architecture:** Smooth Single-Page Application (SPA) transition mechanics, shifting visually from a flat, high-visibility Neobrutalist login screen to a deeply textured, 3D skeuomorphic control panel.
  * **Protected RESTful Endpoints:** Custom middleware-level token extraction and validation protocols to secure sensitive backend data payloads from unauthorized access.
  * **Client-Side Session Management:** Secure persistence, attachment, and automatic retrieval of authorization tokens via HTTP headers and browser `localStorage`.
  * **Zero-Dependency Frontend:** Completely bespoke CSS and Vanilla JavaScript implementation, ensuring ultra-lightweight performance, rapid execution, and ultimate styling control.
  * **Simulated Telemetry Dashboard:** A visually striking authenticated state featuring glowing phosphor-green CRT aesthetics, recessed metal paneling, and tactile physical button states.

### Tech Stack

  * **Backend Framework:** Java 17+, Spring Boot 3.x (Spring Web)
  * **Security & Cryptography:** JJWT (`io.jsonwebtoken` api, impl, jackson)
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

[Launch Auth\_Node Live Environment (Not Placed) ↗]()

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
  * Allow Eclipse a moment to resolve and download the JJWT and Spring Boot dependencies.

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
  * **Authentication Credentials:** Enter `admin` in the `USER_ID` field and `password` in the `KEY_PHRASE` field to initialize the token generation, clear the security checks, and access the skeuomorphic dashboard.

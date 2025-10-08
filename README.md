# 🚀 OnePageBuilder

> A simplified WordPress alternative for creating beautiful service-based single landing pages

OnePageBuilder is a modern, user-friendly website builder focused on service-based businesses that need a single, professional landing page. Built with simplicity and efficiency in mind, it provides an intuitive editor experience without the complexity of traditional website builders.

## ✨ Features

- **🎨 Visual Editor**: WordPress-inspired side navigation with real-time preview
- **🌓 Dark Mode**: Seamless theme switching with persistent user preferences
- **🎯 Section-Based Editing**: Pre-built sections (Hero, About, Services, Features, Contact, Footer)
- **🔐 User Authentication**: Secure JWT-based authentication system
- **💅 Modern UI**: Clean, responsive design with HSL-based color system
- **📱 Mobile Responsive**: Works beautifully on all device sizes
- **⚡ Fast & Lightweight**: Optimized performance with React 19

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API communication
- **Heroicons** - Beautiful SVG icons
- **Tailwind CSS** - Utility-first CSS framework approach

### Backend
- **Java 17** - Modern Java platform
- **Spring Boot 3.5.6** - Enterprise-grade backend framework
- **Spring Security** - Authentication & authorization
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Spring Data JPA** - Database access layer
- **PostgreSQL** - Production database (configurable)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Java**: JDK 17 or higher
- **Maven**: 3.6+ (or use included Maven wrapper)
- **PostgreSQL**: 12+ (for production) or H2 (for development)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Pasindulb/onepagebuilder-frontend.git
cd onepagebuilder
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Update application.properties with your database credentials
# Located at: src/main/resources/application.properties

# Run the Spring Boot application
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
onepagebuilder/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/onepagebuilder/backend/
│   │       │       ├── config/          # Security & app configuration
│   │       │       ├── controller/      # REST API endpoints
│   │       │       ├── entity/          # JPA entities
│   │       │       ├── repository/      # Data access layer
│   │       │       └── security/        # JWT & authentication
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/                   # React frontend
    ├── public/                 # Static assets
    ├── src/
    │   ├── api/               # API client functions
    │   ├── components/        # React components
    │   │   └── editor/        # Editor-specific components
    │   │       ├── SideNav.tsx
    │   │       └── Editor.tsx
    │   ├── context/           # React Context providers
    │   ├── pages/             # Page components
    │   ├── routes/            # Route configuration
    │   ├── types/             # TypeScript type definitions
    │   ├── App.tsx            # Main app component
    │   └── App.css            # Global styles & CSS variables
    ├── package.json
    └── tsconfig.json
```

## 🎨 Theming System

OnePageBuilder uses a centralized HSL-based color system for easy theming:

### CSS Variables (App.css)
```css
:root {
  --primary: 0 84% 60%;        /* Red accent color */
  --bg-primary: 0 0% 100%;     /* White background */
  --bg-secondary: 0 0% 98%;    /* Light gray background */
  --text-primary: 0 0% 0%;     /* Black text */
  --text-secondary: 0 0% 40%;  /* Gray text */
  --border-light: 0 0% 90%;    /* Light borders */
}

.dark {
  --primary: 0 84% 60%;        /* Red accent color */
  --bg-primary: 0 0% 7%;       /* Dark background */
  --bg-secondary: 0 0% 10%;    /* Slightly lighter dark */
  --text-primary: 0 0% 100%;   /* White text */
  --text-secondary: 0 0% 70%;  /* Light gray text */
  --border-light: 0 0% 20%;    /* Dark borders */
}
```

### Usage in Components
```tsx
const styles = {
  background: `hsl(var(--bg-primary))`,
  color: `hsl(var(--text-primary))`,
  border: `1px solid hsl(var(--border-light))`,
};
```

## 📝 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (localhost:3000) |
| `npm build` | Build production bundle |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App (⚠️ irreversible) |

### Backend

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Start Spring Boot server |
| `./mvnw clean install` | Build project and install dependencies |
| `./mvnw test` | Run backend tests |
| `./mvnw package` | Package application as JAR |

## 🔐 Authentication

OnePageBuilder uses JWT (JSON Web Tokens) for secure authentication:

### API Endpoints

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/signin` - Login user
- **POST** `/api/auth/logout` - Logout user

### Example Request

```typescript
// Sign up
const response = await axios.post('/api/auth/signup', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123'
});

// Token is returned in response
const { token } = response.data;
```

## 🗺️ Roadmap

- [ ] **Phase 1**: Complete Editor Functionality *(In Progress)*
  - [x] Side navigation
  - [x] Dark mode toggle
  - [x] Section preview
  - [ ] Content editing capabilities
  - [ ] Drag & drop reordering

- [ ] **Phase 2**: Dashboard & Workspace Management
  - [ ] User dashboard
  - [ ] Multiple workspaces
  - [ ] Website templates
  - [ ] Custom domain support

- [ ] **Phase 3**: Advanced Features
  - [ ] Image upload & management
  - [ ] Form builder
  - [ ] Analytics integration
  - [ ] SEO optimization tools
  - [ ] Export functionality

- [ ] **Phase 4**: Billing & Monetization
  - [ ] Subscription plans
  - [ ] Payment integration
  - [ ] Usage analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Pasindu**
- GitHub: [@Pasindulb](https://github.com/Pasindulb)

## 🙏 Acknowledgments

- Inspired by WordPress's simplicity
- Built with modern web technologies
- Designed for service-based businesses

---

**Made with ❤️ for service businesses that need a simple, beautiful web presence**

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

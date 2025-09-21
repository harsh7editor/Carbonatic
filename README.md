# Smart City Traveler

A full-stack web application for planning and managing city trips with smart recommendations and itinerary management.

## 🚀 Features

- **User Authentication**: JWT-based secure authentication system
- **Place Discovery**: Search and explore restaurants, hotels, attractions, and more
- **Trip Planning**: Create, manage, and organize travel itineraries
- **Reviews & Ratings**: Share experiences and read reviews from other travelers
- **Smart Recommendations**: AI-powered suggestions based on preferences
- **Interactive Maps**: Google Maps integration for location services
- **Responsive Design**: Modern UI with Material-UI components

## 🛠️ Tech Stack

### Backend
- **Java 17** with **Spring Boot 3.2.0**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **MySQL 8.0** database
- **Liquibase** for database migrations
- **Maven** for dependency management

### Frontend
- **React 18** with modern hooks
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **React Hook Form** for form handling

### DevOps
- **Docker** containerization
- **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **Nginx** for frontend serving

## 📁 Project Structure

```
smart-city-traveler/
├── smart-city-traveler-backend/          # Spring Boot Backend
│   ├── src/main/java/com/smartcity/traveler/
│   │   ├── controller/                   # REST Controllers
│   │   ├── service/                      # Business Logic
│   │   ├── repository/                   # Data Access Layer
│   │   ├── model/                        # JPA Entities
│   │   ├── security/                     # Security Configuration
│   │   ├── dto/                          # Data Transfer Objects
│   │   └── config/                       # Configuration Classes
│   ├── src/main/resources/
│   │   ├── application.yml               # Application Configuration
│   │   └── db/changelog/                 # Database Migrations
│   └── pom.xml                           # Maven Configuration
├── smart-city-traveler-frontend/         # React Frontend
│   ├── src/
│   │   ├── components/                   # Reusable Components
│   │   ├── pages/                        # Page Components
│   │   ├── services/                     # API Services
│   │   ├── store/                        # Redux Store
│   │   └── utils/                        # Utility Functions
│   ├── public/                           # Static Assets
│   └── package.json                      # NPM Configuration
├── docker-compose.yml                    # Docker Compose Configuration
└── .github/workflows/                    # CI/CD Pipeline
```

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0
- Docker and Docker Compose (optional)

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-city-traveler
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file
   echo "GOOGLE_MAPS_API_KEY=your-google-maps-api-key" > .env
   echo "ZOMATO_API_KEY=your-zomato-api-key" >> .env
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Database: localhost:3306

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd smart-city-traveler-backend
   ```

2. **Create MySQL database**
   ```sql
   CREATE DATABASE smart_city_traveler;
   CREATE USER 'traveler'@'localhost' IDENTIFIED BY 'traveler123';
   GRANT ALL PRIVILEGES ON smart_city_traveler.* TO 'traveler'@'localhost';
   ```

3. **Update application.yml**
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/smart_city_traveler?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
       username: traveler
       password: traveler123
   ```

4. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd smart-city-traveler-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_MAPS_API_KEY` | Google Maps API key for location services | Yes |
| `ZOMATO_API_KEY` | Zomato API key for restaurant data | Optional |
| `SPRING_DATASOURCE_URL` | Database connection URL | Yes |
| `SPRING_DATASOURCE_USERNAME` | Database username | Yes |
| `SPRING_DATASOURCE_PASSWORD` | Database password | Yes |

### API Endpoints

#### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

#### Places
- `GET /api/places` - Get all places
- `GET /api/places/{id}` - Get place by ID
- `GET /api/places/search?query={query}` - Search places
- `GET /api/places/nearby?lat={lat}&lng={lng}` - Get nearby places
- `GET /api/places/category/{category}` - Get places by category

#### Trips
- `GET /api/trips` - Get user trips
- `POST /api/trips` - Create new trip
- `PUT /api/trips/{id}` - Update trip
- `DELETE /api/trips/{id}` - Delete trip

#### Reviews
- `GET /api/reviews/place/{placeId}` - Get reviews for place
- `POST /api/reviews` - Create review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

## 🧪 Testing

### Backend Tests
```bash
cd smart-city-traveler-backend
mvn test
```

### Frontend Tests
```bash
cd smart-city-traveler-frontend
npm test
```

## 🚀 Deployment

### Production Build

1. **Build backend**
   ```bash
   cd smart-city-traveler-backend
   mvn clean package -Pproduction
   ```

2. **Build frontend**
   ```bash
   cd smart-city-traveler-frontend
   npm run build
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

The application is ready for deployment on:
- **AWS**: Use ECS, EKS, or EC2
- **Google Cloud**: Use Cloud Run or GKE
- **Azure**: Use Container Instances or AKS
- **Heroku**: Use container deployment

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Encrypted)
- `first_name`, `last_name`
- `role` (USER/ADMIN)
- `created_at`, `updated_at`

### Places Table
- `id` (Primary Key)
- `name`, `description`
- `latitude`, `longitude`
- `address`, `city`, `country`
- `category` (RESTAURANT/HOTEL/ATTRACTION/etc.)
- `image_url`
- `average_rating`, `total_reviews`
- `created_at`, `updated_at`

### Trips Table
- `id` (Primary Key)
- `title`, `description`
- `user_id` (Foreign Key)
- `start_date`, `end_date`
- `status` (PLANNING/CONFIRMED/etc.)
- `created_at`, `updated_at`

### Reviews Table
- `id` (Primary Key)
- `user_id`, `place_id` (Foreign Keys)
- `content`, `rating`
- `created_at`, `updated_at`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Social features (follow users, share trips)
- [ ] Advanced AI recommendations
- [ ] Offline support (PWA)
- [ ] Multi-language support
- [ ] Integration with more travel APIs

---

**Smart City Traveler** - Plan your perfect city adventure! 🌟

import java.io.*;
import java.net.*;
import java.util.*;
import java.nio.file.*;
import com.sun.net.httpserver.*;

public class SimpleServer {
    private static final int PORT = 8080;
    private static HttpServer server;
    
    // Mock data
    private static final String MOCK_PLACES = "[{\"id\":1,\"name\":\"Central Park\",\"description\":\"Iconic urban park in Manhattan with beautiful landscapes and recreational activities.\",\"category\":\"ATTRACTION\",\"city\":\"New York\",\"latitude\":40.785091,\"longitude\":-73.968285,\"averageRating\":4.8,\"totalReviews\":1250},{\"id\":2,\"name\":\"The Plaza Hotel\",\"description\":\"Luxurious historic hotel overlooking Central Park with world-class amenities.\",\"category\":\"HOTEL\",\"city\":\"New York\",\"latitude\":40.7648,\"longitude\":-73.9748,\"averageRating\":4.9,\"totalReviews\":890},{\"id\":3,\"name\":\"Joe's Pizza\",\"description\":\"Famous New York-style pizza joint serving authentic slices since 1975.\",\"category\":\"RESTAURANT\",\"city\":\"New York\",\"latitude\":40.7505,\"longitude\":-73.9934,\"averageRating\":4.6,\"totalReviews\":2100},{\"id\":4,\"name\":\"Times Square\",\"description\":\"The crossroads of the world with bright lights, Broadway shows, and shopping.\",\"category\":\"ATTRACTION\",\"city\":\"New York\",\"latitude\":40.7580,\"longitude\":-73.9855,\"averageRating\":4.5,\"totalReviews\":3200},{\"id\":5,\"name\":\"Fifth Avenue\",\"description\":\"Famous shopping street with luxury boutiques and flagship stores.\",\"category\":\"SHOPPING\",\"city\":\"New York\",\"latitude\":40.7505,\"longitude\":-73.9934,\"averageRating\":4.7,\"totalReviews\":1800},{\"id\":6,\"name\":\"Statue of Liberty\",\"description\":\"Iconic symbol of freedom and democracy, accessible by ferry.\",\"category\":\"ATTRACTION\",\"city\":\"New York\",\"latitude\":40.6892,\"longitude\":-74.0445,\"averageRating\":4.8,\"totalReviews\":4500}]";
    
    private static final String MOCK_TRIPS = "[{\"id\":1,\"title\":\"NYC Weekend Getaway\",\"description\":\"Perfect weekend exploring the Big Apple\",\"startDate\":\"2024-01-15\",\"endDate\":\"2024-01-17\",\"status\":\"PLANNING\",\"places\":[1,2,3,4],\"createdAt\":\"2024-01-10T10:00:00Z\"},{\"id\":2,\"title\":\"Food Tour of Manhattan\",\"description\":\"Culinary adventure through NYC's best restaurants\",\"startDate\":\"2024-02-01\",\"endDate\":\"2024-02-03\",\"status\":\"CONFIRMED\",\"places\":[3,5],\"createdAt\":\"2024-01-20T14:30:00Z\"}]";
    
    public static void main(String[] args) throws IOException {
        server = HttpServer.create(new InetSocketAddress(PORT), 0);
        
        // CORS headers
        server.createContext("/api/places", new PlacesHandler());
        server.createContext("/api/trips", new TripsHandler());
        server.createContext("/api/reviews", new ReviewsHandler());
        server.createContext("/api/auth", new AuthHandler());
        
        server.setExecutor(null);
        server.start();
        
        System.out.println("🚀 Smart City Traveler Java Backend Server Started!");
        System.out.println("📡 Server running on: http://localhost:" + PORT);
        System.out.println("🔧 API Endpoints:");
        System.out.println("   GET  /api/places - Get all places");
        System.out.println("   GET  /api/trips - Get user trips");
        System.out.println("   POST /api/trips - Create new trip");
        System.out.println("   GET  /api/reviews/place/{id} - Get reviews for place");
        System.out.println("   POST /api/reviews - Create review");
        System.out.println("   POST /api/auth/signin - User login");
        System.out.println("   POST /api/auth/signup - User registration");
        System.out.println("\n🌐 Frontend: http://localhost:3000");
        System.out.println("✅ Backend API: http://localhost:" + PORT + "/api");
    }
    
    static class PlacesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            setCORSHeaders(exchange);
            
            if ("GET".equals(exchange.getRequestMethod())) {
                String response = "{\"content\":" + MOCK_PLACES + ",\"totalElements\":6,\"totalPages\":1,\"size\":6,\"number\":0}";
                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }
    
    static class TripsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            setCORSHeaders(exchange);
            
            if ("GET".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(200, MOCK_TRIPS.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(MOCK_TRIPS.getBytes());
                os.close();
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Read request body
                InputStream is = exchange.getRequestBody();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    requestBody.append(line);
                }
                
                // Create new trip response
                String newTrip = "{\"id\":3,\"title\":\"New Trip\",\"description\":\"Created via API\",\"status\":\"PLANNING\",\"createdAt\":\"" + new Date().toISOString() + "\"}";
                exchange.sendResponseHeaders(201, newTrip.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(newTrip.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }
    
    static class ReviewsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            setCORSHeaders(exchange);
            
            String path = exchange.getRequestURI().getPath();
            
            if (path.startsWith("/api/reviews/place/") && "GET".equals(exchange.getRequestMethod())) {
                String mockReviews = "[{\"id\":1,\"placeId\":1,\"username\":\"TravelLover123\",\"content\":\"Absolutely beautiful park! Perfect for a morning jog or afternoon picnic.\",\"rating\":5,\"createdAt\":\"2024-01-05T09:15:00Z\"}]";
                exchange.sendResponseHeaders(200, mockReviews.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(mockReviews.getBytes());
                os.close();
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // Read request body
                InputStream is = exchange.getRequestBody();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    requestBody.append(line);
                }
                
                String newReview = "{\"id\":2,\"username\":\"DemoUser\",\"content\":\"Great place!\",\"rating\":5,\"createdAt\":\"" + new Date().toISOString() + "\"}";
                exchange.sendResponseHeaders(201, newReview.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(newReview.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }
    
    static class AuthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            setCORSHeaders(exchange);
            
            String path = exchange.getRequestURI().getPath();
            
            if (path.equals("/api/auth/signin") && "POST".equals(exchange.getRequestMethod())) {
                // Read request body
                InputStream is = exchange.getRequestBody();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    requestBody.append(line);
                }
                
                String token = "mock-jwt-token-" + System.currentTimeMillis();
                String response = "{\"accessToken\":\"" + token + "\",\"tokenType\":\"Bearer\",\"id\":1,\"username\":\"demo\",\"email\":\"demo@example.com\",\"roles\":[\"USER\"]}";
                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else if (path.equals("/api/auth/signup") && "POST".equals(exchange.getRequestMethod())) {
                String response = "{\"message\":\"User registered successfully!\"}";
                exchange.sendResponseHeaders(201, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }
    }
    
    private static void setCORSHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        exchange.getResponseHeaders().add("Content-Type", "application/json");
    }
}

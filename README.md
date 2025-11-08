# 🛍️ E-Commerce Product Catalog with EMI Options backed by mutual funds

A modern full-stack e-commerce application featuring product listings, detailed product pages, and flexible EMI (Equated Monthly Installment) plans backed by mutual funds. Built with React and Node.js.

---

## 📋 Table of Contents

- [Setup and Run Instructions](#-setup-and-run-instructions)
- [API Endpoints and Example Responses](#-api-endpoints-and-example-responses)
- [Tech Stack Used](#-tech-stack-used)
- [Schema Used](#-schema-used)

---

## 🚀 Setup and Run Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/your-database-name
   PORT=4000
   ```
   > **Note:** Replace `your-database-name` with your actual database name. For MongoDB Atlas, use the connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database-name`

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```
   This will populate your database with sample product data.

5. **Run the backend server:**
   
   **Development mode (with auto-reload):**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```
   
   The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `frontend` directory with the following variable:
   ```env
   VITE_API_URL=http://localhost:4000
   ```
   > **Note:** Update this URL if your backend is running on a different port or domain.

4. **Run the frontend development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the port shown in the terminal).

5. **Build for production:**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `dist` directory.

6. **Preview production build:**
   ```bash
   npm run preview
   ```

### Running the Complete Application

1. Start the MongoDB service (if running locally)
2. Start the backend server (from the `backend` directory)
3. Start the frontend server (from the `frontend` directory)
4. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

---

## 🔌 API Endpoints and Example Responses

### Base URL
```
http://localhost:4000/api/products
```

### Authentication
Currently, no authentication is required for these endpoints.

---

### 1. Get All Products

Retrieve a list of all products in the catalog.

**Endpoint:** `GET /api/products`

**Request:**
```http
GET /api/products HTTP/1.1
Host: localhost:4000
```

**Response:**
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`

```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Apple iPhone 17 Pro",
    "brand": "Apple",
    "slug": "iphone-17-pro",
    "description": "Apple iPhone 17 Pro (high level specs).",
    "variants": [
      {
        "sku": "IP17P-256-SLV",
        "slug": "iphone-17-pro-256-silver",
        "attributes": {
          "storage": "256 GB",
          "color": "Silver"
        },
        "image": "https://example.com/image.jpg",
        "mrp": 134900,
        "price": 134900
      },
      {
        "sku": "IP17P-512-BLU",
        "slug": "iphone-17-pro-512-deep-blue",
        "attributes": {
          "storage": "512 GB",
          "color": "Deep Blue"
        },
        "image": "https://example.com/image2.jpg",
        "mrp": 154900,
        "price": 154900
      }
    ],
    "emiPlans": [
      {
        "name": "3 months 0%",
        "tenureMonths": 3,
        "annualInterestRate": 0,
        "cashback": {
          "enabled": false,
          "amount": 0
        },
        "notes": null
      },
      {
        "name": "6 months 0%",
        "tenureMonths": 6,
        "annualInterestRate": 0,
        "cashback": {
          "enabled": true,
          "amount": 1000
        },
        "notes": null
      },
      {
        "name": "12 months 10.5%",
        "tenureMonths": 12,
        "annualInterestRate": 10.5,
        "cashback": {
          "enabled": false,
          "amount": 0
        },
        "notes": null
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 2. Get Product by Slug

Retrieve a single product by its slug identifier.

**Endpoint:** `GET /api/products/:slug`

**Parameters:**
- `slug` (path parameter, required): The unique slug identifier of the product (e.g., `iphone-17-pro`)

**Request:**
```http
GET /api/products/iphone-17-pro HTTP/1.1
Host: localhost:4000
```

**Response:**
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`

```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Apple iPhone 17 Pro",
  "brand": "Apple",
  "slug": "iphone-17-pro",
  "description": "Apple iPhone 17 Pro (high level specs).",
  "variants": [
    {
      "sku": "IP17P-256-SLV",
      "slug": "iphone-17-pro-256-silver",
      "attributes": {
        "storage": "256 GB",
        "color": "Silver"
      },
      "image": "https://example.com/image.jpg",
      "mrp": 134900,
      "price": 134900
    }
  ],
  "emiPlans": [
    {
      "name": "3 months 0%",
      "tenureMonths": 3,
      "annualInterestRate": 0,
      "cashback": {
        "enabled": false,
        "amount": 0
      },
      "notes": null
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response:**
- **Status Code:** `404 Not Found`
- **Content-Type:** `application/json`

```json
{
  "message": "Product not found"
}
```

---

### API Response Notes

- All timestamps are in ISO 8601 format (UTC)
- Prices are in the smallest currency unit (e.g., paise for INR, cents for USD)
- The `__v` field (MongoDB version key) is excluded from responses
- Empty arrays are returned when no products/variants/plans are available

---

## 🛠️ Tech Stack Used

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v14+ | JavaScript runtime environment for server-side development |
| **Express.js** | ^5.1.0 | Fast, unopinionated web framework for building RESTful APIs |
| **MongoDB** | Latest | NoSQL database for storing product data |
| **Mongoose** | ^8.19.3 | MongoDB object modeling tool for Node.js, provides schema validation and query building |
| **CORS** | ^2.8.5 | Middleware to enable Cross-Origin Resource Sharing between frontend and backend |
| **dotenv** | ^17.2.3 | Loads environment variables from a `.env` file |
| **Nodemon** | ^3.1.0 | Development tool that automatically restarts the server on file changes |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.1 | JavaScript library for building user interfaces and components |
| **React DOM** | ^19.1.1 | React renderer for web browsers |
| **React Router DOM** | ^7.9.5 | Declarative routing for React applications, enables navigation between pages |
| **Vite** | ^7.1.7 | Next-generation frontend build tool for fast development and optimized production builds |
| **Tailwind CSS** | ^4.1.17 | Utility-first CSS framework for rapid UI development |
| **Framer Motion** | ^12.23.24 | Production-ready motion library for React, used for animations and transitions |
| **ESLint** | ^9.36.0 | Code linting tool for maintaining code quality and consistency |

### Development Tools

- **Autoprefixer** - Automatically adds vendor prefixes to CSS
- **PostCSS** - CSS processing tool
- **ESLint Plugins** - Code quality and React best practices

---

## 📊 Schema Used

### Database: MongoDB

### Product Schema

The main product collection stores product information with embedded variants and EMI plans.

```javascript
{
  name: String (required),
  brand: String,
  slug: String (required, unique),
  description: String,
  variants: [VariantSchema],
  emiPlans: [EmiPlanSchema],
  createdAt: Date (default: Date.now)
}
```

### Variant Schema

Product variants (e.g., different storage sizes, colors) are embedded within the Product document.

```javascript
{
  sku: String,
  slug: String,
  attributes: Mixed (Object - e.g., { storage: "256 GB", color: "Silver" }),
  image: String (URL),
  mrp: Number (Maximum Retail Price),
  price: Number (Selling Price)
}
```

**Example:**
```json
{
  "sku": "IP17P-256-SLV",
  "slug": "iphone-17-pro-256-silver",
  "attributes": {
    "storage": "256 GB",
    "color": "Silver"
  },
  "image": "https://example.com/image.jpg",
  "mrp": 134900,
  "price": 134900
}
```

### EMI Plan Schema

EMI (Equated Monthly Installment) plans are embedded within the Product document.

```javascript
{
  name: String,
  tenureMonths: Number,
  annualInterestRate: Number,
  cashback: {
    enabled: Boolean,
    amount: Number
  },
  notes: String
}
```

**Example:**
```json
{
  "name": "6 months 0%",
  "tenureMonths": 6,
  "annualInterestRate": 0,
  "cashback": {
    "enabled": true,
    "amount": 1000
  },
  "notes": null
}
```

### Complete Schema Example

```json
{
  "_id": "ObjectId",
  "name": "Apple iPhone 17 Pro",
  "brand": "Apple",
  "slug": "iphone-17-pro",
  "description": "Apple iPhone 17 Pro (high level specs).",
  "variants": [
    {
      "sku": "IP17P-256-SLV",
      "slug": "iphone-17-pro-256-silver",
      "attributes": {
        "storage": "256 GB",
        "color": "Silver"
      },
      "image": "https://example.com/image.jpg",
      "mrp": 134900,
      "price": 134900
    }
  ],
  "emiPlans": [
    {
      "name": "3 months 0%",
      "tenureMonths": 3,
      "annualInterestRate": 0,
      "cashback": {
        "enabled": false,
        "amount": 0
      },
      "notes": null
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

### Schema Notes

- **Embedded Documents:** Variants and EMI plans are stored as embedded arrays within the Product document (no separate collections)
- **Unique Constraints:** The `slug` field is unique across all products
- **Indexes:** MongoDB automatically creates an index on `_id` and `slug` (due to unique constraint)
- **Data Types:** 
  - Prices are stored as numbers (integer values representing smallest currency unit)
  - Dates are stored as MongoDB Date objects
  - Attributes are stored as Mixed type (flexible object structure)

---

## 📝 Additional Notes

- The frontend uses environment variables prefixed with `VITE_` for client-side configuration
- The backend uses `dotenv` for server-side environment variable management
- CORS is enabled for all origins (consider restricting this in production)
- The database seed script clears existing data before inserting new products
- All API responses exclude the `__v` (version key) field for cleaner JSON output

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📄 License

This project is licensed under the ISC License.

---

**Happy Coding! 🚀**

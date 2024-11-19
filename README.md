
# Hono REST API Template

A template for building a REST API using the [Hono](https://hono.dev/) framework with JWT-based authentication. This template is designed to help you quickly create and manage your API endpoints with security in mind.

## Features

- Lightweight and performant REST API using the Hono framework.
- Built-in JWT authentication for secure user management.
- Easily customizable and extendable structure.
- Clear examples for login and registration endpoints.
- Prisma Integration
- Rate Limiter + IP Block Mechanism

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Install

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/hono-jwt-template.git
   cd hono-jwt-template
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file at the root of the project and populate it with the environment variables listed in the `env.example` file:

   ```bash
   cp env.example .env
   ```

   Update the values of the variables as per your configuration.

## Usage

### Running the Development Server

To start the server in development mode:

```bash
npm run dev
```

### Building for Production

To build and start the server for production:

```bash
npm run build
npm start
```

### Available API Endpoints

- **POST** `/v1/auth/login`: Authenticates a user and returns access and refresh tokens.
- **POST** `/v1/auth/register`: Registers a new user in the system.

## Project Structure

```
.
├── src
│   ├── module
│   │   └── auth
│   │       ├── auth.controller.ts   # Authentication controller
│   │       ├── auth.service.js      # Authentication service logic
│   ├── utils
│   │   └── api.response.js          # Utility for consistent API responses
├── .env.example                      # Environment variable example file
├── package.json
└── README.md                         # This README file
```

## Environment Variables

Below is a brief description of the environment variables needed:

- `ACCESS_TOKEN_SECRET`: The secret key for signing access tokens.
- `REFRESH_TOKEN_SECRET`: The secret key for signing refresh tokens.
- `API_KEY` : the secret key for server

Make sure these secrets are kept private and not exposed.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Guidelines

- Fork the repository.
- Create a feature branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -m 'Add a feature'`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, please feel free to reach out.

---


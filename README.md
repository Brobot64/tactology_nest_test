# NestJS Department Management System

A robust backend system built with NestJS, GraphQL, and TypeORM for managing departments and sub-departments.

## Features

- **Authentication System**
  - JWT-based authentication
  - Login functionality with username/password validation
  - Protected routes with guards

- **Department Management**
  - Create departments with sub-departments
  - View all departments with their sub-departments
  - GraphQL API for department operations

- **User Management**
  - User creation and retrieval
  - Password hashing and verification

- **Database Integration**
  - TypeORM for database operations
  - Entities for User, Department, and SubDepartment

## Technologies Used

- NestJS
- GraphQL
- TypeORM
- PostgreSQL (or your chosen database)
- JWT for authentication
- Class Validator for input validation

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo.git
```


# NestJS Department Management System

A robust backend system built with NestJS, GraphQL, and TypeORM for managing departments and sub-departments.

## Features

- **Authentication System**
  - JWT-based authentication
  - Login functionality with username/password validation
  - Protected routes with guards

- **Department Management**
  - Create departments with sub-departments
  - View all departments with their sub-departments
  - GraphQL API for department operations

- **User Management**
  - User creation and retrieval
  - Password hashing and verification

- **Database Integration**
  - TypeORM for database operations
  - Entities for User, Department, and SubDepartment

## Technologies Used

- NestJS
- GraphQL
- TypeORM
- PostgreSQL (or your chosen database)
- JWT for authentication
- Class Validator for input validation

## Project Structure

c:\Users\Brobot\Documents\Onprojects\Testnewev\newnestreman\
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── dto/               # Data transfer objects
│   │   ├── guards/            # Authentication guards
│   │   ├── strategies/        # JWT strategies
│   │   ├── auth.module.ts     # Auth module
│   │   ├── auth.resolver.ts   # GraphQL resolvers
│   │   └── auth.service.ts    # Auth business logic
│   ├── departments/           # Department management
│   │   ├── dto/               # Data transfer objects
│   │   ├── entities/          # Database entities
│   │   ├── departments.module.ts
│   │   ├── departments.resolver.ts
│   │   └── departments.service.ts
│   ├── users/                 # User management
│   │   ├── entities/          # User entity
│   │   ├── users.module.ts
│   │   ├── users.resolver.ts
│   │   └── users.service.ts
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── test/                      # Test files
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── nest-cli.json              # NestJS configuration
├── package.json               # NPM dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file

## Installation

1. Clone the repository:
git clone https://github.com/yourusername/your-repo.git

2. Install dependencies:
yarn install

3. Set up environment variables:
Create a .env file in the root directory with the following variables:
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

4. Run migrations:
```bash
yarn typeorm migration:run
```

5. Start the development server:
```bash
yarn start:dev
```

## API Documentation

The GraphQL API is available at http://localhost:3000/graphql

### Example Queries

# Get all departments
query {
  departments {
    id
    name
    subDepartments {
      id
      name
    }
  }
}

# Login

mutation {
  login(input: {username: "admin", password: "password"}) {
    accessToken
  }
}


## Testing

Run unit tests:
```bash
yarn test
```

Run e2e tests:
```bash
yarn test:e2e
```

## Contributing

1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.
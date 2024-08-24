# CRM Project

A CRM (Customer Relationship Management) application built with TypeScript, PostgreSQL, and Prisma. This project provides a robust system for managing customer interactions, sales, and other related activities.


## Features

- User registration 
- Company management with detailed information
- Team management

## Technologies

- **TypeScript:** Strongly typed programming language that builds on JavaScript.
- **PostgreSQL:** Powerful, open-source object-relational database system.
- **Prisma:** Modern ORM for TypeScript and Node.js that simplifies database interactions.

## Project Structure

The project is organized into several directories, each responsible for a specific aspect of the application:

```bash
📦src
 ┣ 📂config
 ┃ ┗ 📜variable.ts             # Environment variables and configuration
 ┣ 📂controllers
 ┃ ┗ 📜user.controller.ts       # User-related controller logic
 ┣ 📂interfaces
 ┃ ┣ 📜company.interface.ts     # Company interface definitions
 ┃ ┣ 📜location.interface.ts    # Location interface definitions
 ┃ ┗ 📜user.interface.ts        # User interface definitions
 ┣ 📂middlewares
 ┃ ┗ 📜auth.middleware.ts       # Authentication middleware
 ┣ 📂repositories
 ┃ ┣ 📜company.repository.ts    # Company data access logic
 ┃ ┣ 📜location.repository.ts   # Location data access logic
 ┃ ┗ 📜user.repository.ts       # User data access logic
 ┣ 📂routes
 ┃ ┗ 📜auth.route.ts            # Authentication routes
 ┣ 📂services
 ┃ ┣ 📜auth.service.ts          # Authentication service logic
 ┃ ┗ 📜user.service.ts          # User service logic
 ┣ 📂utils
 ┃ ┗ 📜prisma.utils.ts          # Prisma utility functions
 ┣ 📂validations
 ┃ ┣ 📜login.validation.ts      # Login request validation
 ┃ ┗ 📜registeration.validation.ts # Registration request validation
 ┗ 📜server.ts                  # Entry point of the application

```
## Postman Documentation:

The Postman documentation for this CRM API is available at:
[Postman Documentation](https://documenter.getpostman.com/view/31591055/2sAXjF8F19)

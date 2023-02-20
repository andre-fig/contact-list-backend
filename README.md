# REST API for managing people and contacts

This is a REST API built using Node.js, NestJS, TypeScript, TypeORM and Swagger that allows users to create, update, get and delete people and their contacts. A person can have multiple contacts such as phone, email or whatsapp.

## Getting Started

### Installation

1. Clone the repository

```
git clone https://github.com/andre-fig/contact-list-backend.git
```

2. Navigate to the project directory

```
cd contact-list-backend
```

3. Copy the example environment file to `.env`:

```
cp .env.example .env
```

Update the `.env` file with your own environment variables.

4. Install dependencies

```
npm install
```

### Running the App

To run the app, use the following command:

```
npm run start
```

### Swagger

The Swagger UI is located at `/api`. It provides a user interface for interacting with the API endpoints.

## Endpoints

The following endpoints are available:

| Endpoint              | Method | Description                              |
| --------------------- | ------ | ---------------------------------------- |
| `/person`             | POST   | Create a new person.                     |
| `/person`             | GET    | Get a list of all people.                |
| `/person/:id`         | GET    | Get a person by ID.                      |
| `/person/:id`         | PATCH  | Update a person.                         |
| `/person/:id`         | DELETE | Delete a person.                         |
| `/contact`            | POST   | Create a new contact.                    |
| `/contact`            | GET    | Get a list of all contacts.              |
| `/contact/:id`        | GET    | Get a contact by ID.                     |
| `/contact/:id`        | PATCH  | Update a contact.                        |
| `/contact/:id`        | DELETE | Delete a contact.                        |
| `/person/:id/contact` | GET    | Get a list of all contacts for a person. |
| `/person/:id/contact` | DELETE | Delete all contacts for a person.        |

## Data Models

### Person

| Field     | Type    | Description                       |
| --------- | ------- | --------------------------------- |
| id        | integer | Unique identifier for the person. |
| name      | string  | Name of the person.               |
| birthDate | date    | Date of birth of the person.      |

### Contact

| Field    | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| id       | integer | Unique identifier for the contact.         |
| type     | string  | Type of contact (e.g. email, phone, etc.). |
| value    | string  | Value of the contact.                      |
| personId | integer | ID of the person the contact belongs to.   |

## Contributions

Contributions to the project are welcome. Please fork the repository, make changes, and submit a pull request.

# Monkey Blogging

**Monkey Blogging** is a blogging platform developed using React.js and Firebase, created for learning and practice purposes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Monkey Blogging** offers a simple platform where users can create, edit, and delete blog posts. This project is designed to help developers practice React.js and Firebase integration.

## Features

- User registration and login
- Create, edit, and delete posts
- Display a list of posts
- Search posts by title or content
- Comment and rate posts

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LuonVuiTuoiLV/monkey-blogging.git
   cd monkey-blogging
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Create a project on [Firebase](https://firebase.google.com/).
   - Set up a web application and obtain the Firebase configuration.
   - Create a `.env` file in the root directory of the project and add the following environment variables:

     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000`.

## Usage

- **Register/Login:** Users can create a new account or log in with an existing account.
- **Create Post:** After logging in, users can create a new post by clicking the "Create Post" button.
- **Edit/Delete Post:** Users can edit or delete their own posts.
- **Search:** Use the search bar to find posts by title or content.

## Contributing

We welcome contributions from the community. To contribute, please:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature ABC'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


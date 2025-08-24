# DevConnect


## 📝 Description

DevConnect is a full-stack developer social media platform designed to connect developers, foster collaboration, and facilitate knowledge sharing. Built with Express.js, DevConnect prioritizes security with JWT authentication, ensuring a safe and personalized user experience. Key features include real-time social interactions such as creating posts, like content, adding comments, and following or unfollowing other developers. The platform dynamically updates follower and following counts to reflect real-time network changes, enabling users to stay connected and informed. DevConnect provides a comprehensive web-based environment for developers to build their professional network and engage with the developer community.

## ✨ Features

- 🗄️ Database
- 🕸️ Web


## 🛠️ Tech Stack

- 🚀 Express.js


## 📦 Key Dependencies

```
bcrypt: ^6.0.0
cloudinary: ^2.7.0
cookie-parser: ^1.4.7
cors: ^2.8.5
dotenv: ^17.2.1
express: ^5.1.0
jsonwebtoken: ^9.0.2
mongoose: ^8.17.1
mongoose-aggregate-paginate-v2: ^1.1.4
morgan: ^1.10.1
multer: ^2.0.2
```

## 🚀 Run Commands

- **test**: `npm run test`
- **dev**: `npm run dev`


## 📁 Project Structure

```
.
├── LICENSE
├── backned
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── constants.js
│       ├── controllers
│       │   ├── like.controllers.js
│       │   ├── tweet.controllers.js
│       │   └── user.controllers.js
│       ├── db
│       │   └── index.js
│       ├── index.js
│       ├── middlewares
│       │   ├── auth.middlewares.js
│       │   └── multer.middlewares.js
│       ├── models
│       │   ├── like.models.js
│       │   ├── tweet.models.js
│       │   └── users.models.js
│       ├── routes
│       │   ├── like.routes.js
│       │   ├── tweet.routes.js
│       │   └── user.routes.js
│       └── utils
│           ├── ApiError.js
│           ├── ApiResponse.js
│           ├── asyncHandler.js
│           └── cloudinary.js
└── fronted
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── log.png
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Account
    │   │   │   ├── FollowButton.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── ProfileStats.jsx
    │   │   │   ├── Register.jsx
    │   │   │   ├── SearchUser.jsx
    │   │   │   └── SuggestedUser.jsx
    │   │   ├── Header
    │   │   │   ├── Footer.jsx
    │   │   │   └── Header.jsx
    │   │   ├── Pages
    │   │   │   ├── AllTweet.jsx
    │   │   │   ├── Hometweet.jsx
    │   │   │   ├── TweetCard.jsx
    │   │   │   └── TweetForm.jsx
    │   │   ├── PrivateRoutes.jsx
    │   │   └── index.js
    │   ├── context
    │   │   └── AuthContext.jsx
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
```

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/tinkumehta/DevConnect.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the MIT License.


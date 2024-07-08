module.exports = {
    app: {
      port: process.env.PORT || 3000
    },
    db: {
      uri: 'mongodb://localhost:27017/sde1_assignment'
    },
    jwt: {
      secret: 'your_jwt_secret'
    }
  };
  
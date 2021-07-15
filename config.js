require('dotenv').config();

const { JWT_SECRET = '0de50296aeea456249151bd8278d04515e1f6a8d490db398ad285b0c3eec9676', MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URL,
};

const { NODE_ENV, JWT_SECRET } = process.env;
// const { MONGODB_URL } = 'mongodb://130.193.36.108/mestodb';
const { MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URL,
};

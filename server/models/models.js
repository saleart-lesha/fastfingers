const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Profile = sequelize.define("Profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING, unique: true },
  wordsTyped: { type: DataTypes.INTEGER },
  testsTaken: { type: DataTypes.INTEGER },
  photo: { type: DataTypes.STRING },
});

const Results = sequelize.define("Results", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  speed: { type: DataTypes.INTEGER },
  accuracy: { type: DataTypes.INTEGER },
  wordsPerMinute: { type: DataTypes.INTEGER },
  correctWords: { type: DataTypes.INTEGER },
  wrongWords: { type: DataTypes.INTEGER },
  corrections: { type: DataTypes.INTEGER },
});

const Texts = sequelize.define("Texts", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
});

const Languages = sequelize.define("Languages", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

const DictionaryWords = sequelize.define("DictionaryWords", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  word: { type: DataTypes.STRING },
});

// Пользователь имеет один профиль
Users.hasOne(Profile);
Profile.belongsTo(Users);

// Пользователь имеет множество результатов
Users.hasMany(Results);
Results.belongsTo(Users);

// Текст состоит из множества слов
Texts.hasMany(DictionaryWords);
DictionaryWords.belongsTo(Texts);

// Один текст может быть в нескольких результатах
Texts.hasMany(Results);
Results.belongsTo(Texts);

// Один язык может относится к множеству слов
Languages.hasMany(DictionaryWords);
DictionaryWords.belongsTo(Languages);

// Один язык может относится к множеству текстов
Languages.hasMany(Texts);
Texts.belongsTo(Languages);

module.exports = { Users, Profile, Results, Texts, Languages, DictionaryWords };

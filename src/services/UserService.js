const UserRepository = require('../repositories/UserRepository');
const User = require('../models/User');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData) {
    const { name, lastName, documentId, vitalKey, createdAt } = userData;
    const newUser = new User(name, lastName, documentId, vitalKey, createdAt);
    const createdUser = await this.userRepository.create(newUser);
    return createdUser;
  }

  async updateUser(id, updatedUserData) {
    const update = await this.userRepository.update(id, updatedUserData);
    return update;
  }

  async deleteUser(id) {
    const update = await this.userRepository.delete(id);
    return update;
  }

  async findByVitalKeyUser(vitalKey) {
    const find = await this.userRepository.findByVitalKey(vitalKey);
    return find;
  }

  async activity(data, eventType) {
    const activity = await this.userRepository.createDataDayActivity(data, eventType);
    return activity;
  }
  
}

module.exports = UserService;

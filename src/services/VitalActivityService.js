const ActivityRepository = require('../repositories/VitalActivityRepository');

class ActivityService {
  constructor() {
    this.activityRepository = new ActivityRepository();
  }

  async activity(data, eventType) {
    const activity = await this.activityRepository.createDataDayActivity(data, eventType);
    return activity;
  }

}

module.exports = ActivityService;

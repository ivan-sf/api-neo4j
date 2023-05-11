const ActivityRepository = require('../repositories/VitalActivityRepository');

class ActivityService {
  constructor() {
    this.activityRepository = new ActivityRepository();
  }

  async activity(data, eventType, nameNodeTypeEvent) {
    const activity = await this.activityRepository.createDataDayActivity(data, eventType, nameNodeTypeEvent);
    return activity;
  }

}

module.exports = ActivityService;

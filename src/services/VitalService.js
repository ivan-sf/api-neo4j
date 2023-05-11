const VitalRepository = require('../repositories/VitalRepository');

class createDataVital {
  constructor() {
    this.VitalRepository = new VitalRepository();
  }

  async saveData(dataCypher, eventType, nameNodeTypeEvent, data) {
    const vitalData = await this.VitalRepository.createDataVital(dataCypher, eventType, nameNodeTypeEvent, data);
    return vitalData;
  }

}

module.exports = createDataVital;

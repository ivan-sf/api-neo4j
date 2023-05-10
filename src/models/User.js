class User {
    constructor(name, last_name, document_id, vital_key, created_at,company_key_user) {
      this.name = name;
      this.last_name = last_name;
      this.document_id = document_id;
      this.vital_key = vital_key;
      this.created_at = created_at;
      this.company_key_user = company_key_user;
    }
  }
  
  module.exports = User;
  
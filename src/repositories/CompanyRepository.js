const neo4jDriver = require('../config/database');
const Company = require('../models/Company');

class CompanyRepository {
  async create(company) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run('CREATE (c:Company {name: $name, nit: $nit, company_key: $company_key, created_at: $created_at}) RETURN c', {
        name: company.name,
        nit: company.nit,
        company_key: company.company_key,
        created_at: company.created_at,
      });
      const createdCompany = result.records[0].get('c').properties;
      return new Company(createdCompany.name, createdCompany.nit, createdCompany.company_key, createdCompany.created_at);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      session.close();
    }
  }


}

module.exports = CompanyRepository;

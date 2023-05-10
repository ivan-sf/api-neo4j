const CompanyRepository = require('../repositories/CompanyRepository');
const Company = require('../models/Company');

class CompanyService {
  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async createCompany(companyData) {
    const { name, nit, company_key, created_at} = companyData;
    const newCompany = new Company(name, nit, company_key, created_at);
    const createdCompany = await this.companyRepository.create(newCompany);
    return createdCompany;
  }

}

module.exports = CompanyService;

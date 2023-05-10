const neo4j = require('neo4j-driver');

const neo4jDriver = neo4j.driver('neo4j+s://06186317.databases.neo4j.io', neo4j.auth.basic('neo4j', 'l_8kcEguOrD7Y1nuaJKfWQnu_JIub0uUCjbTbwDPQLo'));

module.exports = neo4jDriver;

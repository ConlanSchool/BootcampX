const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    console.log(`Showing ${res.rows.length} results for '${cohortName}':`);
    res.rows.forEach(row => {
      console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));
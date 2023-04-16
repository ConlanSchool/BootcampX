const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];

const queryString = `
SELECT DISTINCT teachers.name as teacher_name
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1;
`;

const values = [cohortName];

pool.query(queryString, values)
  .then(res => {
    console.log(`Teachers that made an assistance request during ${cohortName}:`);
    res.rows.forEach(row => {
      console.log(`${cohortName}: ${row.teacher_name}`);
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));
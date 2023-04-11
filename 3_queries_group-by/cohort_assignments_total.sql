SELECT cohorts.name as cohort, count(assignment_submissions.id) as total_submissions
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
JOIN assignment_submissions ON students.id = assignment_submissions.student_id
GROUP BY cohorts.id
ORDER BY total_submissions DESC;
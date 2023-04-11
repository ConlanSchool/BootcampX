SELECT cohorts.name as cohort_name, count(students.id) as student_count
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
GROUP BY cohorts.id
HAVING count(students.id) >= 18
ORDER BY student_count;
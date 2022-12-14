SELECT skill, skill_id
FROM USERS
LEFT join
	(SELECT PERSON AS U_SA_ID,
			skill AS S_SA_ID
		FROM skill_allocation) AS S_A
	LEFT join
		(SELECT S."id" AS skill_id,
				S."name" AS "skill"
			FROM skills AS s) AS sk_t ON S_SA_ID = skill_id
ON "id" = U_SA_ID
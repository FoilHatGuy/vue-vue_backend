SELECT "project",	project_id, ac.Access
FROM USERS
LEFT join
	(SELECT PERSON AS U_PC_ID,
			"access" AS A_PC_ID,
			project AS P_PC_ID
		FROM project_clearance) AS PR_CL
	LEFT join
		(SELECT P."id" AS project_id,
				P."name" AS "project"
			FROM PROJECTS AS P) AS pr ON P_PC_ID = project_id
	LEFT join
		(SELECT A."id" AS A_ID,
				A."name" AS "access"
			FROM Project_roles AS A) AS ac ON A_PC_ID = A_ID
ON "id" = U_PC_ID
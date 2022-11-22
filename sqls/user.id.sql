SELECT "id", "name", SURNAME, PATRONYMIC, "position" as pos_id, DEPARTMENT as dep_id, 
	(select COUNT(project_clearance.person) from project_clearance
	where project_clearance.person = 1)::int::boolean
 as active
FROM USERS
INNER JOIN (
	(SELECT PERSON AS U_PA_ID,
			"position" AS P_PA_ID
		FROM POSITION_ALLOCATION) AS POS_A
	INNER JOIN
		(SELECT P."id" AS P_ID,
				P."name" AS "position"
			FROM POSITIONS AS P) AS POS ON P_PA_ID = P_ID) AS U_P_TABLE 
ON "id" = U_P_TABLE.U_PA_ID
INNER JOIN (
	(SELECT PERSON AS U_DA_ID,
			"department" AS D_DA_ID
		FROM DEPARTMENT_ALLOCATION) AS DEP_A
	INNER JOIN
		(SELECT D."id" AS D_ID,
				D."name" AS "department"
			FROM DEPARTMENTS AS D) AS DEP ON D_DA_ID = D_ID) AS U_D_TABLE 
ON "id" = U_D_TABLE.U_DA_ID WHERE USERS."id" = 1
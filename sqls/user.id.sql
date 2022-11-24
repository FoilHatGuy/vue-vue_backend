SELECT "id", "name", SURNAME, PATRONYMIC, 
"position" as pos_id, pos_n as "position", 
DEPARTMENT as dep_id, dep_n as department, 
	(select COUNT(project_clearance.person) from project_clearance
	where project_clearance.person = 1)::int::boolean
 as active
FROM USERS as u
LEFT join (SELECT P.id AS P_ID,
				   P.name AS pos_n
			FROM POSITIONS AS P) AS POS
ON u.position = POS.P_ID
LEFT join (SELECT D.id AS D_ID,
				   D.name AS dep_n
			FROM DEPARTMENTS AS D) AS DEP
ON u.department = DEP.D_ID 

WHERE u."id" = 1
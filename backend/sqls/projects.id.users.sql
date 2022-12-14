SELECT u.id, u.name, u.surname, u.patronymic, u.role FROM project_clearance as p_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON p_cl.person = u.id
LEFT join
(select project_roles)
WHERE p_cl.project = $1
SELECT u.user_id, u.name, u.surname, u.patronymic FROM user_x_project_x_role as s_cl
Inner Join
(select users.user_id, users.name, users.surname, users.patronymic from users) as u
ON s_cl."user" = u.user_id
Inner Join
(select system_roles.system_role_id, system_roles.name from system_roles) as r
ON s_cl.project_role = r.system_role_id
WHERE s_cl.project_role = ?
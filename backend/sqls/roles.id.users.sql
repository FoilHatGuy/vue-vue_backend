SELECT u.id, u.name, u.surname, u.patronymic FROM system_clearance as s_cl
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON s_cl.person = u.id 
LEFT join
(select system_roles.id, system_roles.name from system_roles) as r
ON s_cl.access = r.id 
WHERE s_cl.access = 1
SELECT u.id, u.name, u.surname, u.patronymic FROM SKILL_allocation as s_a
LEFT join
(select users.id, users.name, users.surname, users.patronymic from users) as u
ON person = u.id WHERE s_a.skill = 4
INSERT INTO users (`age`, `email`, `first_name`, `last_name`, `password`)
VALUES ('19', 'admin@mail.ru', 'admin', 'admin', '$2a$12$RG/sXoZdkUQahwCDyjLCn.2ntcenk5fS6invKmjK1iUs2N3pauD3K');

INSERT INTO users (`age`, `email`, `first_name`, `last_name`, `password`)
VALUES ('19', 'user@mail.ru', 'user', 'user', '$2a$12$1YGnhwJSQUWCPEv3hDwl7OMg9LimYH.N4JZ92euUaGIXoV2ffXg7a');

INSERT INTO roles (`name`)
VALUES ('ROLE_ADMIN');

INSERT INTO roles (`name`)
VALUES ('ROLE_USER');

INSERT INTO users_roles (`user_id`, `role_id`)
VALUES (1, 1);

INSERT INTO users_roles (`user_id`, `role_id`)
VALUES (2, 2);
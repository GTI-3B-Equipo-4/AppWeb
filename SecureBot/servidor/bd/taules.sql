pragma foreign_keys = on;


drop table Usuarios;

CREATE TABLE IF NOT EXISTS Usuarios (
        usuario TEXT NOT NULL,
        password      TEXT NOT NULL,
        PRIMARY KEY(usuario)
);

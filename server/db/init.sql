CREATE TABLE public.resume (
    name varchar(255) PRIMARY KEY,
    resume varchar(255),
    ignored boolean
);

CREATE TABLE public.resume_checksum (
    table_checksum varchar(255),
    file_checksum varchar(255)
);

INSERT INTO resume_checksum (table_checksum, file_checksum)
    VALUES ('','');
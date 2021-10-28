CREATE TABLE IF NOT EXISTS public."Players"
(
    id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birthday character varying(255) COLLATE pg_catalog."default",
    avatar character varying(255) COLLATE pg_catalog."default",
    height character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone integer,
    password character(255) COLLATE pg_catalog."default" NOT NULL,
    bio text COLLATE pg_catalog."default",
    verified boolean,
    blocked boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Players_pkey" PRIMARY KEY (id),
    CONSTRAINT "Players_email_key" UNIQUE (email)
)
CREATE TABLE IF NOT EXISTS public."Players"
(
    id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birthday character varying(255) COLLATE pg_catalog."default",
    avatar character varying(255) COLLATE pg_catalog."default",
    height character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    street character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone integer,
    password character(255) COLLATE pg_catalog."default" NOT NULL,
    bio text COLLATE pg_catalog."default",
    nationality character varying(255) COLLATE pg_catalog."default",
    verified boolean,
    blocked boolean,
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Players_pkey" PRIMARY KEY (id),
    CONSTRAINT "Players_email_key" UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public."Court_owners"
(
    id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    avatar character varying(255) COLLATE pg_catalog."default",
    birthday timestamp with time zone,
    address character varying(255) COLLATE pg_catalog."default",
    email character(255) COLLATE pg_catalog."default" NOT NULL,
    password character(255) COLLATE pg_catalog."default" NOT NULL,
    phone character(255) COLLATE pg_catalog."default",
    personal_id character(255) COLLATE pg_catalog."default" NOT NULL,
    nationality character varying(255) COLLATE pg_catalog."default" NOT NULL,
    verified boolean,
    blocked boolean,
    role character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Court_owners_pkey" PRIMARY KEY (id),
    CONSTRAINT "Court_owners_email_key" UNIQUE (email)
);
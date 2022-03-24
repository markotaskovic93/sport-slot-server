CREATE TABLE IF NOT EXISTS public."Players"
(
    id bigint NOT NULL,
    full_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birthday character varying(255) COLLATE pg_catalog."default" NOT NULL,
    height character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    street character varying(255) COLLATE pg_catalog."default",
    gender character varying(255) COLLATE pg_catalog."default" NOT NULL,
    age character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    bio text COLLATE pg_catalog."default",
    sport character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email_verified boolean NOT NULL,
    phone_verified boolean NOT NULL,
    terms_conditions boolean NOT NULL,
    blocked boolean NOT NULL,
    notification_invites boolean NOT NULL,
    notification_messages boolean NOT NULL,
    notification_reminders boolean NOT NULL,
    notification_promotions boolean NOT NULL,
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
    birthday character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    street character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
    personal_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email_verified boolean,
    phone_verified boolean,
    identity_verified boolean,
    terms_conditions boolean,
    blocked boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Court_owners_pkey" PRIMARY KEY (id),
    CONSTRAINT "Court_owners_email_key" UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public."Courts"
(
    id bigint NOT NULL,
    court_owner_id bigint NOT NULL,
    court_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    court_description text COLLATE pg_catalog."default",
    court_enviroment character varying(255) COLLATE pg_catalog."default" NOT NULL,
    court_size character varying(255) COLLATE pg_catalog."default",
    court_available_sports character varying(255)[] COLLATE pg_catalog."default" NOT NULL,
    court_baners character varying(255)[] COLLATE pg_catalog."default",
    court_state character varying(255) COLLATE pg_catalog."default" NOT NULL,
    court_city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    court_street character varying(255) COLLATE pg_catalog."default" NOT NULL,
    court_facilities character varying(255)[] COLLATE pg_catalog."default" NOT NULL,
    court_promoted boolean NOT NULL,
    blocked boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Courts_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Court_owner_payment_methods"
(
    id bigint NOT NULL,
    court_owner_id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    card_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    expiration_month character varying(255) COLLATE pg_catalog."default" NOT NULL,
    expiration_year character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cvv character varying(255) COLLATE pg_catalog."default" NOT NULL,
    zip_code character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state character varying(255) COLLATE pg_catalog."default" NOT NULL,
    blocked boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Court_owner_payment_methods_pkey" PRIMARY KEY (id),
    CONSTRAINT "Court_owner_payment_methods_card_number_key" UNIQUE (card_number)
);

CREATE TABLE IF NOT EXISTS public."Booked_slots"
(
    id bigint,
    court_id bigint,
    slot_id bigint,
    player_id bigint,
    player_needed character varying(255) COLLATE pg_catalog."default",
    reservation_status character varying(255) COLLATE pg_catalog."default",
    blocked character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS public."Player_payment_methods"
(
    id bigint NOT NULL,
    player_id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    card_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    expiration_month character varying(255) COLLATE pg_catalog."default" NOT NULL,
    expiration_year character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cvv character varying(255) COLLATE pg_catalog."default" NOT NULL,
    zip_code character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state character varying(255) COLLATE pg_catalog."default" NOT NULL,
    blocked boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Player_payment_methods_pkey" PRIMARY KEY (id),
    CONSTRAINT "Player_payment_methods_card_number_key" UNIQUE (card_number)
);

CREATE TABLE IF NOT EXISTS public."Slots"
(
    id bigint NOT NULL,
    court_id bigint NOT NULL,
    slot_date character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_start_time character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_end_time character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_price character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_discount character varying(255) COLLATE pg_catalog."default",
    slot_paid boolean NOT NULL,
    slot_booked boolean NOT NULL,
    slot_blocked boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Slots_pkey" PRIMARY KEY (id)
);

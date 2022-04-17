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

CREATE TABLE IF NOT EXISTS public."Court_owners"
(
    id bigint NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    state character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
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

CREATE TABLE IF NOT EXISTS public."Fees"
(
    id bigint NOT NULL,
    slot_base_fee character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_additional_fee character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Fees_pkey" PRIMARY KEY (id)
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
    not_hashed_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    bio text COLLATE pg_catalog."default",
    prefered_sport character varying(255) COLLATE pg_catalog."default" NOT NULL,
    balance integer NOT NULL,
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

CREATE TABLE IF NOT EXISTS public."Players_notifications"
(
    id bigint NOT NULL,
    slot_id bigint NOT NULL,
    reservation_id bigint NOT NULL,
    player_id bigint NOT NULL,
    notification_type character varying(255) COLLATE pg_catalog."default",
    notification_desc character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Players_notifications_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Players_transactions_histories"
(
    id bigint NOT NULL,
    player_id bigint,
    transaction_type character varying(255) COLLATE pg_catalog."default",
    transaction_desc character varying(255) COLLATE pg_catalog."default",
    transaction_time character varying(255) COLLATE pg_catalog."default",
    transaction_amount character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Players_transactions_histories_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Reservation_players"
(
    id bigint NOT NULL,
    reservation_id bigint,
    player_id bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Reservation_players_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Reservation_players_invitations"
(
    id bigint NOT NULL,
    reservation_id bigint,
    player_id bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Reservation_players_invitations_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Reservation_players_requests"
(
    id bigint NOT NULL,
    reservation_id bigint,
    player_id bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Reservation_players_requests_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Reservations"
(
    id bigint NOT NULL,
    slot_id bigint NOT NULL,
    admin_player_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    players_needed character varying(255) COLLATE pg_catalog."default" NOT NULL,
    players_accepted character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sport character varying(255) COLLATE pg_catalog."default" NOT NULL,
    reservation_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    price_per_person character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_active boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Reservations_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Slots"
(
    id bigint NOT NULL,
    court_id bigint NOT NULL,
    slot_date character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_start_time character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_end_time character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_price character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_base_price character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_discounted_price character varying(255) COLLATE pg_catalog."default",
    slot_discount character varying(255) COLLATE pg_catalog."default",
    slot_city character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_state character varying(255) COLLATE pg_catalog."default" NOT NULL,
    slot_has_reservation boolean,
    slot_reservation_id character varying(255) COLLATE pg_catalog."default",
    slot_available_sports character varying(255)[] COLLATE pg_catalog."default" NOT NULL,
    slot_booked boolean NOT NULL,
    slot_blocked boolean NOT NULL,
    slot_active boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Slots_pkey" PRIMARY KEY (id)
);
--
-- TOC entry 203 (class 1259 OID 16456)
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person (
    id integer NOT NULL,
    firstname text NOT NULL,
    middlename text,
    lastname text,
    connection_id text,
    user_input text,
    birthdate text,
    civicaddress text,
    city text,
    province text,
    postalcode text,
    country text,
    status text,
    photo text,
    sessionid text
);


--
-- TOC entry 202 (class 1259 OID 16454)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2965 (class 0 OID 0)
-- Dependencies: 202
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 2827 (class 2604 OID 16459)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 2957 (class 0 OID 16456)
-- Dependencies: 203
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2966 (class 0 OID 0)
-- Dependencies: 202
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.person_id_seq', 1, false);


--
-- TOC entry 2829 (class 2606 OID 16464)
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


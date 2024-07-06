--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-06 21:22:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16417)
-- Name: actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actor (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    gender boolean NOT NULL,
    place_of_birth character varying(40) NOT NULL,
    birthday date NOT NULL,
    biography text NOT NULL,
    img_path character varying(100) NOT NULL
);


ALTER TABLE public.actor OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16416)
-- Name: actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actor_id_seq OWNER TO postgres;

--
-- TOC entry 4819 (class 0 OID 0)
-- Dependencies: 219
-- Name: actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actor_id_seq OWNED BY public.actor.id;


--
-- TOC entry 222 (class 1259 OID 16426)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    level character varying(5) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16425)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 221
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 216 (class 1259 OID 16401)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(25) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 215
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    release_date date NOT NULL,
    rating double precision NOT NULL,
    trailer_url character varying(255) NOT NULL,
    overview text NOT NULL,
    poster_path character varying(100) NOT NULL
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16447)
-- Name: movie_cast; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_cast (
    movie_id integer NOT NULL,
    actor_id integer NOT NULL,
    character_name character varying(50) NOT NULL
);


ALTER TABLE public.movie_cast OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16432)
-- Name: movie_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_category (
    movie_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.movie_category OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16407)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_id_seq OWNER TO postgres;

--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 217
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 4653 (class 2604 OID 16420)
-- Name: actor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor ALTER COLUMN id SET DEFAULT nextval('public.actor_id_seq'::regclass);


--
-- TOC entry 4654 (class 2604 OID 16429)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4651 (class 2604 OID 16404)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16411)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 4660 (class 2606 OID 16424)
-- Name: actor actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_pkey PRIMARY KEY (id);


--
-- TOC entry 4662 (class 2606 OID 16431)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 4656 (class 2606 OID 16406)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 4666 (class 2606 OID 16451)
-- Name: movie_cast movie_cast_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_cast
    ADD CONSTRAINT movie_cast_pkey PRIMARY KEY (movie_id, actor_id);


--
-- TOC entry 4664 (class 2606 OID 16436)
-- Name: movie_category movie_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_category
    ADD CONSTRAINT movie_category_pkey PRIMARY KEY (movie_id, category_id);


--
-- TOC entry 4658 (class 2606 OID 16415)
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- TOC entry 4669 (class 2606 OID 16457)
-- Name: movie_cast movie_cast_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_cast
    ADD CONSTRAINT movie_cast_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.actor(id);


--
-- TOC entry 4670 (class 2606 OID 16452)
-- Name: movie_cast movie_cast_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_cast
    ADD CONSTRAINT movie_cast_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);


--
-- TOC entry 4667 (class 2606 OID 16442)
-- Name: movie_category movie_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_category
    ADD CONSTRAINT movie_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- TOC entry 4668 (class 2606 OID 16437)
-- Name: movie_category movie_category_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_category
    ADD CONSTRAINT movie_category_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movie(id);


-- Completed on 2024-07-06 21:22:24

--
-- PostgreSQL database dump complete
--


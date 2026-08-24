--
-- PostgreSQL database dump
--

\restrict ha9bkcamHjbExsp5m8XFbFHFgLllYeLBPf0tMiMFqlwFPe2JcLgIjccBL3iu84I

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

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
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: lamiae
--

CREATE TABLE public.chat_messages (
    id character varying(36) NOT NULL,
    session_id character varying(36),
    role character varying(20) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE public.chat_messages OWNER TO lamiae;

--
-- Name: chat_sessions; Type: TABLE; Schema: public; Owner: lamiae
--

CREATE TABLE public.chat_sessions (
    id character varying(36) NOT NULL,
    user_id character varying(100) NOT NULL,
    title character varying(200) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.chat_sessions OWNER TO lamiae;

--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: lamiae
--

COPY public.chat_messages (id, session_id, role, content, created_at) FROM stdin;
aede7c9b-8d2e-4a3b-b660-cccbb23d757c	7dada57c-1c19-427b-b654-adfcb6712edc	user	bonjour	2026-08-05 16:41:56.272318
d020c1a1-e31b-45d1-a1b2-5fa0fc03b022	7dada57c-1c19-427b-b654-adfcb6712edc	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'bonjour'. Veuillez préciser votre demande.	2026-08-05 16:41:56.290553
a208c7bb-8a1b-45db-aabf-a216938a9a24	372597ba-893e-42fc-9770-ffff84084eeb	user	hello	2026-08-05 16:54:04.919265
6e34b038-abe3-4a4f-9423-33ee072d88cf	372597ba-893e-42fc-9770-ffff84084eeb	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'hello'. Veuillez préciser votre demande.	2026-08-05 16:54:04.930985
16296957-3f5d-453d-84f4-cd35c2f87645	4c3ffc64-2e9c-459e-b0bf-0c44ab9caf14	user	hi	2026-08-05 18:21:06.448597
4043ac3e-6388-4335-97ec-3353e7cf6c66	4c3ffc64-2e9c-459e-b0bf-0c44ab9caf14	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'hi'. Veuillez préciser votre demande.	2026-08-05 18:21:06.457619
53720361-74fc-422f-9d9e-bd2a7b5c8f89	39113902-b5c1-4f42-9920-de42fd3286c9	user	cc	2026-08-05 18:25:42.286157
c22ce25a-e4ad-486d-b314-b51eeba3a8e6	39113902-b5c1-4f42-9920-de42fd3286c9	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'cc'. Veuillez préciser votre demande.	2026-08-05 18:25:42.301038
fb25b42f-de80-4d9f-96f7-d5a2323645c9	15839e01-38f9-47de-a7f0-c6ce49f94385	user	hello	2026-08-13 13:02:59.056531
a2a3f24f-f5c3-4cc7-ab0c-0da325e669eb	15839e01-38f9-47de-a7f0-c6ce49f94385	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'hello'. Veuillez préciser votre demande.	2026-08-13 13:02:59.06694
d39efa98-a003-4b87-81fd-c5939ea69edf	0986a492-ba05-420e-8342-e08350b41831	user	bonjour	2026-08-13 19:03:37.669784
1672b01a-e08a-4c21-962f-c540881bce1c	0986a492-ba05-420e-8342-e08350b41831	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'bonjour'. Veuillez préciser votre demande.	2026-08-13 19:03:37.683155
019de102-9471-4256-8b55-f123ab9d88fe	d5b2fe77-8468-4af6-a8fb-aed84fa0bdf8	user	cc	2026-08-14 13:23:37.715759
699b9fa8-5c63-407c-843c-5a658f7c8434	d5b2fe77-8468-4af6-a8fb-aed84fa0bdf8	assistant	Je n'ai pas trouvé de documents pertinents pour votre question : 'cc'. Veuillez préciser votre demande.	2026-08-14 13:23:37.730663
3599e981-d481-4a61-8f33-e46be1d21004	6e359783-b086-47d9-b819-3f908dd09a05	user	هل يمكنك تلخيص الخطوات الرئيسية لتقديم شكاية رسمية لدى الوزارة	2026-08-17 15:35:47.10811
0b451ebb-ba02-4eea-877b-1640921f0ee7	6e359783-b086-47d9-b819-3f908dd09a05	assistant	**ملخص الخطوات الرئيسية لتقديم شكاية رسمية لدى الوزارة وفقاً للنص المتوفر**\n\n1. **إرسال الشكاية**  \n   - يمكن تقديم الشكاية **ورقياً أو شفهياً** عبر أي من القنوات المتاحة (مكاتب الضبط، الهاتف، البريد الإلكتروني، …).  \n\n2. **تسجيل الشكاية في البوابة الوطنية**  \n   - على الجهة المستقبلة (مكتب الضبط) **تدوين الشكاية وإدخالها** في **المنصة الخلفية للبوابة الوطنية للشكايات**.  \n   - هذا التسجيل يضمن إمكانية **تتبع المعالجة** وتوفير بيانات إحصائية لاحقاً.  \n\n3. **معالجة الشكاية من قبل الجهة المختصة**  \n   - يجب على الإدارة **معالجة الشكاية والرد عليها** خلال **حد أقصى 60 يوماً** من تاريخ استلامها.  \n\n4. **الإخطار في حال نقص المعلومات**  \n   - إذا كانت الشكاية غير واضحة أو تفتقر إلى الوثائق والحجج اللازمة، **تُبلّغ الجهة المرتفق** بذلك خلال **15 يوماً** من تاريخ إيداع الشكاية عبر نظام البوابة، مع طلب التوضيحات أو المستندات المطلوبة.  \n\n5. **استلام الرد النهائي**  \n   - بعد إكمال المعالجة، يتلقى المرتفق **الرد النهائي** على شكايته ضمن الإطار الزمني المحدد (60 يوماً).  \n\n**ملاحظة:** الوزارة وفرت دليل عملي لتلقي وتتبع ومعالجة الشكايات، كما نظمت ورشات تكوينية بالتعاون مع مؤسسة الوسيط لتدريب المكوّنين على هذه العملية. لذا فإن اتباع الخطوات أعلاه يضمن الالتزام بالإجراءات الرسمية والجدول الزمني المنصوص عليه.	2026-08-17 15:35:47.224773
53234d13-3fa1-4fa7-a673-0987f45bff07	0986a492-ba05-420e-8342-e08350b41831	user	bonjour	2026-08-17 15:52:33.628808
d1f11f8c-f3bd-4197-a624-699ba78c1ec4	0986a492-ba05-420e-8342-e08350b41831	assistant	عذرًا، لا يمكنني تقديم إجابة مدعومة من النص المرفق لأن المحتوى المتوفر لا يتضمن معلومات تتعلق بالتحية أو الرد عليها. إذا كان لديك سؤال محدد حول موضوع الرقمنة أو الإجراءات الإدارية المذكورة في النص، يرجى طرحه وسأحاول المساعدة بناءً على ما هو موجود في السياق.	2026-08-17 15:52:46.054944
98b4a9e9-93f7-42b2-975e-8c9077d362f5	dfa997cc-4451-4d2e-9739-3e215c10607f	user	bonjour	2026-08-17 15:58:22.307925
d66fe6c8-99fa-4d70-b3b7-701f03d7821c	dfa997cc-4451-4d2e-9739-3e215c10607f	assistant	عذرًا، لا يمكنني تقديم إجابة مدعومة من النص المرفق لأن المحتوى المتوفر لا يتضمن معلومات تتعلق بالتحية أو الرد عليها. إذا كان لديك سؤال محدد حول موضوع الرقمنة أو الإجراءات الإدارية المذكورة في النص، يرجى طرحه وسأحاول المساعدة بناءً على ما هو موجود في السياق.	2026-08-17 15:58:22.420093
\.


--
-- Data for Name: chat_sessions; Type: TABLE DATA; Schema: public; Owner: lamiae
--

COPY public.chat_sessions (id, user_id, title, created_at, updated_at) FROM stdin;
7dada57c-1c19-427b-b654-adfcb6712edc	6b159447-432a-4a95-9de5-c64cc420e07a	bonjour	2026-08-05 16:41:56.246483	2026-08-05 16:41:56.246498
372597ba-893e-42fc-9770-ffff84084eeb	6b159447-432a-4a95-9de5-c64cc420e07a	hello	2026-08-05 16:54:04.895513	2026-08-05 16:54:04.895527
4c3ffc64-2e9c-459e-b0bf-0c44ab9caf14	6b159447-432a-4a95-9de5-c64cc420e07a	hi	2026-08-05 18:21:06.431136	2026-08-05 18:21:06.431147
39113902-b5c1-4f42-9920-de42fd3286c9	6b159447-432a-4a95-9de5-c64cc420e07a	cc	2026-08-05 18:25:42.255803	2026-08-05 18:25:42.255815
15839e01-38f9-47de-a7f0-c6ce49f94385	6b159447-432a-4a95-9de5-c64cc420e07a	hello	2026-08-13 13:02:59.036602	2026-08-13 13:02:59.077358
d5b2fe77-8468-4af6-a8fb-aed84fa0bdf8	6b159447-432a-4a95-9de5-c64cc420e07a	cc	2026-08-14 13:23:37.700977	2026-08-14 13:23:37.740378
6e359783-b086-47d9-b819-3f908dd09a05	6b159447-432a-4a95-9de5-c64cc420e07a	هل يمكنك تلخيص الخطوات الرئيسية لتقديم ش...	2026-08-17 15:35:47.093647	2026-08-17 15:35:47.238638
0986a492-ba05-420e-8342-e08350b41831	ba1516af-d50f-4bd5-a17c-4a9de531908a	bonjour	2026-08-13 19:03:37.647994	2026-08-17 15:52:46.076707
dfa997cc-4451-4d2e-9739-3e215c10607f	ba1516af-d50f-4bd5-a17c-4a9de531908a	bonjour	2026-08-17 15:58:22.292777	2026-08-17 15:58:22.430623
\.


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: lamiae
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: chat_sessions chat_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: lamiae
--

ALTER TABLE ONLY public.chat_sessions
    ADD CONSTRAINT chat_sessions_pkey PRIMARY KEY (id);


--
-- Name: ix_chat_messages_id; Type: INDEX; Schema: public; Owner: lamiae
--

CREATE INDEX ix_chat_messages_id ON public.chat_messages USING btree (id);


--
-- Name: ix_chat_sessions_id; Type: INDEX; Schema: public; Owner: lamiae
--

CREATE INDEX ix_chat_sessions_id ON public.chat_sessions USING btree (id);


--
-- Name: ix_chat_sessions_user_id; Type: INDEX; Schema: public; Owner: lamiae
--

CREATE INDEX ix_chat_sessions_user_id ON public.chat_sessions USING btree (user_id);


--
-- Name: chat_messages chat_messages_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lamiae
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO lamiae;


--
-- PostgreSQL database dump complete
--

\unrestrict ha9bkcamHjbExsp5m8XFbFHFgLllYeLBPf0tMiMFqlwFPe2JcLgIjccBL3iu84I


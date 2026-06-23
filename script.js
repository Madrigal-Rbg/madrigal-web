/* ============================================================
   MADRIGAL — Liquid Intelligence  (classic script, file://-safe)
   Bilingual EN/IT, with dynamic grids + canvas visuals.
   ============================================================ */
(function () {
  "use strict";

  var REDUCED = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var PALETTE = {
    cyan: "#23B4EC",
    blue: "#1379C2",
    deep: "#0C5FB0",
    accent: "#6E8BFF",
    text: "#EAF2FF"
  };

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function on(el, ev, fn, o) { if (el) el.addEventListener(ev, fn, o || false); }

  /* ============================================================
     LANGUAGE STATE + DICTIONARY
     ============================================================ */
  var LANG = "en";
  try {
    var saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "it") LANG = saved;
  } catch (e) {}

  function t(key) {
    var d = I18N[LANG] || I18N.en;
    return (key in d) ? d[key] : (I18N.en[key] || "");
  }

  var I18N = {
    en: {
      "skip": "Skip to content",
      "nav.ai": "AI", "nav.services": "Services", "nav.software": "Software",
      "nav.work": "Work", "nav.approach": "Approach", "nav.reach": "Reach",
      "nav.contact": "Contact", "nav.cta": "Start a project",
      "nav.open": "Open menu", "nav.close": "Close menu",

      "hero.eyebrow": "// MADRIGAL · HONG KONG · SWITZERLAND · ITALY",
      "hero.title1": "We don't just use AI.",
      "hero.title2": "We architect intelligence.",
      "hero.sub": "A premium creative, technology & AI consultancy with three equal hubs across Asia and Europe. From electric brand worlds to autonomous AI systems, we engineer the breakthroughs that turn ambitious companies into category-defining icons — at planetary scale.",
      "hero.cta1": "Architect Your Future",
      "hero.cta2": "Explore the AI practice",
      "hero.stat1v": "3 Continents", "hero.stat1l": "Global Delivery Network",
      "hero.stat2v": "9 AI Disciplines", "hero.stat2l": "From LLMs to MLOps",
      "hero.stat3l": "Ambition, Engineered",

      "academy.pill": "Our developers are all certified by Anthropic Academy",
      "academy.badge": "Anthropic Academy Certified Engineers",
      "academy.strip": "Every developer at Madrigal is certified by Anthropic Academy — frontier-trained to build with Claude and architect production-grade AI that thinks, reasons, and ships. Credentialed expertise, not improvisation.",
      "orbit.sr": "The Intelligence Orbit shows Madrigal's nine AI capabilities orbiting the core: Generative AI, Machine Learning and Deep Learning, Natural Language Processing, Computer Vision, Predictive Analytics, Autonomous Agents, RAG Systems, MLOps, and AI Strategy.",

      "marquee": "GENERATIVE AI · LLM APPS · COMPUTER VISION · NLP · RAG SYSTEMS · MLOps · AUTONOMOUS AGENTS · PREDICTIVE ANALYTICS · DEEP LEARNING · AI STRATEGY · ",

      "band.continents": " Continents", "band.specialists": "+ Specialists", "band.disciplines": " AI Disciplines",
      "band.l1": "Global delivery network", "band.l2": "Creative, engineering & AI",
      "band.l3": "From LLMs to MLOps", "band.l4": "Global delivery, always on",

      "manifesto.eyebrow": "// GLOBAL BY DESIGN · BORDERLESS BY NATURE",
      "manifesto.title": "Creative vision, deep tech, and AI — <span class=\"gradient-text\">forged into one force.</span>",
      "manifesto.lead": "Unlocking Minds, Driving Brands.",
      "manifesto.body": "Madrigal Consulting was forged to engineer the future of how brands think, move, and win. We are a single force where creative vision, deep technology, and frontier artificial intelligence converge — and where the line between imagination and execution disappears. From identity to infrastructure, from a campaign that captivates millions to autonomous systems that run while the world sleeps, we build the intelligence behind the brands that define their categories. Our reach spans continents; our standard answers to nothing less than extraordinary. This is consulting reimagined as a creative-tech-AI powerhouse — relentless, precise, and engineered to make the ambitious inevitable.",
      "manifesto.card1t": "Intelligence Is Our Medium",
      "manifesto.card1d": "Generative AI, autonomous agents, computer vision, and predictive systems aren't features we bolt on — they're the architecture we build from. We design intelligence that learns, decides, and compounds, turning every dataset into a decisive advantage.",
      "manifesto.card2t": "Beauty Is Non-Negotiable",
      "manifesto.card2d": "Brilliance that nobody feels is wasted. Every brand we shape, every interface we craft, every story we tell is engineered to be unforgettable — cinematic, exact, and impossible to ignore. We treat aesthetics as strategy, because attention is the rarest currency on earth.",
      "manifesto.card3t": "No Borders, No Ceilings",
      "manifesto.card3d": "Across our global studios, we command an engine of elite talent and full-stack capability — strategy, software, hardware, data, and AI under one roof. Wherever ambition lives, we deliver it at scale, without compromise.",

      "ai.index": "01 — ARTIFICIAL INTELLIGENCE",
      "ai.title": "Intelligence is the new <span class=\"gradient-text\">infrastructure.</span>",
      "ai.lead": "From frontier models to autonomous systems — engineered to think, learn, and move your brand at the speed of imagination.",
      "ai.body": "Intelligence is the new infrastructure, and we build it to last. Madrigal designs AI systems that don't sit beside your business — they become its nervous system. We fuse generative models, deep learning, and autonomous agents into living architectures that reason in real time, learn from every interaction, and compound their advantage with each passing day. This is not automation bolted onto old workflows. It is intelligence engineered from first principles, tuned for production, and built to scale across continents. Where others experiment, we deploy. Where others prototype, we transform. The future belongs to the brands that command intelligence — and we put that power in your hands.",
      "ai.line": "We architect intelligence.",
      "ai.b1": "Frontier AI disciplines under one roof", "ai.b2": "Autonomous agents that never sleep",
      "ai.b3": "Production-grade, built to scale", "ai.b4": "Continents, singular vision",
      "ai.cta": "Architect Your Intelligence", "ai.tag": "AI Capability",

      "img.ai": "Abstract artificial-intelligence visual with flowing blue digital forms",
      "img.crypto": "Close-up of a cryptocurrency trading screen showing price charts and candlesticks",
      "img.fintech": "Person using a smartphone for fintech banking and digital payments",
      "img.datacenter": "Rows of illuminated server racks in a dark modern data center",
      "img.blockchain": "Abstract glowing blockchain network of connected blue nodes and links",

      "services.index": "02 — THE FULL ARSENAL",
      "services.title": "Intelligence, engineered across every <span class=\"gradient-text\">surface of your brand</span>",
      "services.lead": "AI is the engine. This is the machine it powers.",
      "services.body": "Beyond our flagship AI practice lies a complete creative and engineering powerhouse — a single, vertically integrated force that takes a brand from first spark to global scale. Strategy, story, software, and signal, fused into one relentless pursuit of excellence. From three equal hubs to a borderless delivery network that spans the globe, Madrigal builds the brands that define their categories. Every service below is sharpened by the same intelligence layer — so nothing we touch is ordinary.",
      "services.cta": "Build Your Category-Defining Brand",

      "hosting.index": "03 — INFRASTRUCTURE & HOSTING",
      "hosting.title": "Your empire needs <span class=\"gradient-text\">somewhere to live.</span>",
      "hosting.lead": "From the domain name to the data center — the full stack, owned and operated.",
      "hosting.body": "Brilliance is nothing if it goes offline. Madrigal runs the entire backbone beneath your brand — domains, hosting, websites, and raw iron — engineered for uptime that borders on obsession. Blazing-fast, hardened, and globally distributed, our infrastructure carries everything we build and everything you dream up next. One partner, total ownership, zero excuses.",

      "software.index": "04 — ENGINEERED SOFTWARE",
      "software.title": "We've built the hardest software on earth. <span class=\"gradient-text\">Yours is next.</span>",
      "software.lead": "Exchanges, wallets, banks, and blockchain intelligence — shipped to production, trusted with real money.",
      "software.body": "When the stakes are highest — millions in motion, milliseconds that decide, regulators watching every byte — companies come to Madrigal. We've engineered the full crypto, fintech and data stack end to end: trading engines, custody, core banking, gaming intelligence and the AI that hunts illicit flows across the chain. If it can be coded, we can build it — faster, cleaner, and at a price the market simply cannot match.",

      "sw1.tag": "Trading Infrastructure", "sw1.t": "Crypto Exchanges", "sw1.d": "Matching engines, order books, custody, liquidity and KYC — complete spot & derivatives platforms tuned for microsecond latency and millions of concurrent users without breaking a sweat.",
      "sw2.tag": "Cold Custody", "sw2.t": "Crypto Hardware Wallets", "sw2.d": "Secure-element firmware, seed isolation and tamper-proof signing. Self-custody devices engineered so private keys are born — and stay — beyond the reach of the outside world.",
      "sw3.tag": "On-Chain Custody", "sw3.t": "Crypto Hot Wallets", "sw3.d": "Lightning-fast multi-chain hot wallets with MPC & multisig, real-time balances and hardened key management — built to move billions in daily volume, securely and instantly.",
      "sw4.tag": "Core Banking", "sw4.t": "Fintech & Banking", "sw4.d": "Core banking, payments, cards, ledgers and onboarding — regulator-ready financial software engineered to move money flawlessly, reconcile to the cent, and scale to a nation.",
      "sw5.tag": "Real-Time Intelligence", "sw5.t": "Gaming Big Data & AI", "sw5.d": "Player analytics, live recommendation and anti-fraud AI crunching billions of events in real time — turning raw game telemetry into retention, revenue and decisive advantage.",
      "sw6.tag": "RegTech", "sw6.t": "AML & Compliance", "sw6.d": "Sanctions & PEP screening, transaction monitoring, KYC/KYB and case management — compliance engines engineered to satisfy the strictest regulators on the planet.",
      "sw7.tag": "On-Chain Forensics", "sw7.t": "Blockchain Analysis", "sw7.d": "Wallet attribution, fund tracing and cross-chain risk scoring — forensic intelligence that follows the money wherever it tries to hide, and surfaces the truth in seconds.",

      "pitch.eyebrow": "// NO LIMITS, NO EXCUSES",
      "pitch.line": "Any software. Built faster. Priced to win.",
      "pitch.sub": "You bring the idea — we make it reality. Whatever you can imagine, we can engineer: at unbeatable prices, in timelines that look impossible, with production-grade quality that never blinks. From a napkin sketch to a category-defining product, Madrigal turns ambition into shipped software.",
      "pitch.cta": "Bring Us Your Idea",

      "work.index": "05 — THE MADRIGAL DIFFERENCE",
      "work.title": "Where creativity meets <span class=\"gradient-text\">intelligence at scale</span>",
      "work.lead": "Not an agency. Not a software shop. A force multiplier for ambitious brands.",
      "work.body": "Most consultancies pick a lane. We refuse to. Madrigal fuses world-class creative, hard engineering, and frontier AI under one roof — forged across our global studios, delivered across the globe. We don't just use AI; we architect intelligence. The result is work that thinks faster, scales further, and moves brands from where they are to where they were always meant to be. Unlocking minds. Driving brands.",
      "work.b1": "Data points processed every day", "work.b2": "Countries reached through global delivery",
      "work.b3": "Client retention, year after year", "work.b4": "Creative, engineering & AI experts",

      "process.index": "06 — HOW WE WORK",
      "process.title": "From first spark to <span class=\"gradient-text\">global scale</span>",
      "process.lead": "A precision methodology engineered for ambition.",
      "process.body": "Brilliance is not an accident. Behind every breakthrough we ship lies a discipline as rigorous as it is bold. Four movements take you from the unknown to the unstoppable — discovery that sees what others miss, design that bends the future to your will, engineering that turns intelligence into infrastructure, and scale that knows no horizon. This is how vision becomes velocity.",
      "process.cta": "Begin Your Ascent",

      "global.index": "07 — GLOBAL REACH",
      "global.title": "Three command centers. <span class=\"gradient-text\">Borderless delivery.</span>",
      "global.lead": "From Hong Kong to Lugano to Italy — and every market that matters.",
      "global.body": "Three command centers of equal weight — Hong Kong, Switzerland, and Italy — anchor us across Asia and Europe, at the crossroads of global capital, culture, and code. Together they orchestrate elite talent and deliver around the clock to every market on earth. While one continent sleeps, another ships — intelligence, creativity, and engineering moving in perfect sequence, anywhere in the world, at the speed your ambition demands.",
      "global.b1": "Follow-the-sun delivery across every time zone",
      "global.b2v": "3 Offices", "global.b2": "Hong Kong · Lugano · Italy",
      "global.b3": "Languages spoken across our global teams",

      "reach.c1t": "Three Equal Hubs", "reach.c1d": "Hong Kong, Switzerland, and Italy carry equal weight — three command centers spanning Asia and Europe, fluent in East and West and wired into the markets that define tomorrow.",
      "reach.c2t": "Delivered Worldwide", "reach.c2d": "From our hubs we deliver to every corner of the globe — no market too distant, no time zone out of reach. Wherever your ambition lives, we are already there.",
      "reach.c3t": "The Sun Never Sets", "reach.c3d": "Follow-the-sun delivery turns time zones into momentum. Work advances while the world sleeps, so progress is relentless and deadlines bend to us.",

      "contact.eyebrow": "// LET'S BUILD WHAT'S NEXT",
      "contact.title": "The future doesn't wait.<br /><span class=\"gradient-text\">Neither should you.</span>",
      "contact.lead": "From three continents to every corner of the globe — intelligence, delivered.",
      "contact.body": "Every empire begins with a single conversation. Tell us the future you're chasing, and we'll architect the intelligence to reach it — faster, bolder, and further than you imagined possible. One message is all it takes to set extraordinary in motion.",
      "contact.name": "Name", "contact.namePh": "Your name",
      "contact.email": "Email", "contact.emailPh": "you@company.com",
      "contact.company": "Company", "contact.companyPh": "Company (optional)",
      "contact.message": "What future are you chasing?", "contact.messagePh": "Tell us about your ambition…",
      "contact.submit": "Start the Conversation",
      "contact.metaEmail": "Email", "contact.metaHq": "Offices", "contact.metaHqV": "Hong Kong · Switzerland · Italy",
      "contact.metaEu": "Delivery", "contact.metaEuV": "Worldwide",
      "contact.metaWorld": "Hours", "contact.metaWorldV": "24/7 · follow-the-sun",
      "contact.tagline": "Unlocking Minds, Driving Brands",

      "footer.brand": "Unlocking Minds, Driving Brands. A premium creative, technology & AI consultancy.",
      "footer.practice": "Practice", "footer.p1": "Artificial Intelligence", "footer.p2": "Digital Marketing",
      "footer.p3": "Hosting & Infrastructure", "footer.p4": "Engineered Software", "footer.p5": "Data & Analytics",
      "footer.company": "Company", "footer.c1": "Why Madrigal", "footer.c2": "Our Approach", "footer.c3": "Global Reach", "footer.c4": "Contact",
      "footer.offices": "Our Offices",
      "footer.off1t": "Hong Kong", "footer.off1r": "Asia",
      "footer.off2t": "Lugano", "footer.off2r": "Switzerland",
      "footer.off3t": "Milan", "footer.off3r": "Italy",
      "footer.off.delivery": "Global delivery · 24/7",
      "footer.copyright": "© 2026 Madrigal Consulting Limited — Hong Kong · Lugano · Italy",
      "footer.fine": "This site uses no tracking cookies.",

      "form.err": "Please add your name, email, and message.",
      "form.opening": "Opening your email app… if nothing happens, write to hello@madrigalconsulting.io",
      "form.subj": "New project inquiry — ", "form.q": "What future are you chasing?",
      "form.fName": "Name", "form.fEmail": "Email", "form.fCompany": "Company"
    },

    it: {
      "skip": "Vai al contenuto",
      "nav.ai": "AI", "nav.services": "Servizi", "nav.software": "Software",
      "nav.work": "Lavori", "nav.approach": "Metodo", "nav.reach": "Presenza",
      "nav.contact": "Contatti", "nav.cta": "Avvia un progetto",
      "nav.open": "Apri menu", "nav.close": "Chiudi menu",

      "hero.eyebrow": "// MADRIGAL · HONG KONG · SVIZZERA · ITALIA",
      "hero.title1": "Non usiamo solo l'AI.",
      "hero.title2": "Progettiamo l'intelligenza.",
      "hero.sub": "Una consulenza premium di creatività, tecnologia e AI con tre hub di pari importanza tra Asia ed Europa. Da mondi di brand elettrizzanti a sistemi AI autonomi, ingegnerizziamo le svolte che trasformano le aziende ambiziose in icone di categoria — su scala planetaria.",
      "hero.cta1": "Progetta il tuo futuro",
      "hero.cta2": "Esplora la practice AI",
      "hero.stat1v": "3 Continenti", "hero.stat1l": "Rete di delivery globale",
      "hero.stat2v": "9 Discipline AI", "hero.stat2l": "Dagli LLM agli MLOps",
      "hero.stat3l": "Ambizione, ingegnerizzata",

      "academy.pill": "I nostri sviluppatori sono tutti certificati Anthropic Academy",
      "academy.badge": "Ingegneri Certificati Anthropic Academy",
      "academy.strip": "Ogni sviluppatore di Madrigal è certificato Anthropic Academy — formato alla frontiera per costruire con Claude e progettare AI production-grade che pensa, ragiona e va in produzione. Competenza certificata, non improvvisazione.",
      "orbit.sr": "L'Orbita dell'Intelligenza mostra le nove competenze AI di Madrigal che orbitano attorno al nucleo: AI Generativa, Machine Learning e Deep Learning, Natural Language Processing, Visione Artificiale, Analisi Predittiva, Agenti Autonomi, Sistemi RAG, MLOps e Strategia AI.",

      "marquee": "AI GENERATIVA · APP LLM · COMPUTER VISION · NLP · SISTEMI RAG · MLOps · AGENTI AUTONOMI · ANALISI PREDITTIVA · DEEP LEARNING · STRATEGIA AI · ",

      "band.continents": " Continenti", "band.specialists": "+ Specialisti", "band.disciplines": " Discipline AI",
      "band.l1": "Rete di delivery globale", "band.l2": "Creatività, ingegneria e AI",
      "band.l3": "Dagli LLM agli MLOps", "band.l4": "Delivery globale, sempre attiva",

      "manifesto.eyebrow": "// GLOBALE PER NATURA · SENZA CONFINI",
      "manifesto.title": "Visione creativa, tecnologia profonda e AI — <span class=\"gradient-text\">fuse in un'unica forza.</span>",
      "manifesto.lead": "Liberiamo le menti, guidiamo i brand.",
      "manifesto.body": "Madrigal Consulting è nata per ingegnerizzare il futuro di come i brand pensano, si muovono e vincono. Siamo un'unica forza in cui visione creativa, tecnologia profonda e intelligenza artificiale di frontiera convergono — e dove il confine tra immaginazione ed esecuzione svanisce. Dall'identità all'infrastruttura, da una campagna che cattura milioni di persone a sistemi autonomi che lavorano mentre il mondo dorme, costruiamo l'intelligenza dietro i brand che definiscono la loro categoria. La nostra portata abbraccia i continenti; il nostro standard non si accontenta di meno dello straordinario. Questa è la consulenza reinventata come potenza creativa-tech-AI — implacabile, precisa e progettata per rendere inevitabile ciò che è ambizioso.",
      "manifesto.card1t": "L'intelligenza è il nostro mezzo",
      "manifesto.card1d": "AI generativa, agenti autonomi, computer vision e sistemi predittivi non sono funzioni che aggiungiamo — sono l'architettura da cui partiamo. Progettiamo un'intelligenza che apprende, decide e si rafforza, trasformando ogni dataset in un vantaggio decisivo.",
      "manifesto.card2t": "La bellezza non è negoziabile",
      "manifesto.card2d": "Una brillantezza che nessuno percepisce è sprecata. Ogni brand che plasmiamo, ogni interfaccia che creiamo, ogni storia che raccontiamo è ingegnerizzata per essere indimenticabile — cinematografica, esatta, impossibile da ignorare. Trattiamo l'estetica come strategia, perché l'attenzione è la valuta più rara sulla terra.",
      "manifesto.card3t": "Niente confini, niente limiti",
      "manifesto.card3d": "Attraverso i nostri studi globali, comandiamo un motore di talenti d'élite e capacità full-stack — strategia, software, hardware, dati e AI sotto un unico tetto. Ovunque viva l'ambizione, la realizziamo su scala, senza compromessi.",

      "ai.index": "01 — INTELLIGENZA ARTIFICIALE",
      "ai.title": "L'intelligenza è la nuova <span class=\"gradient-text\">infrastruttura.</span>",
      "ai.lead": "Dai modelli di frontiera ai sistemi autonomi — progettati per pensare, apprendere e muovere il tuo brand alla velocità dell'immaginazione.",
      "ai.body": "L'intelligenza è la nuova infrastruttura, e la costruiamo per durare. Madrigal progetta sistemi AI che non stanno accanto alla tua azienda — ne diventano il sistema nervoso. Fondiamo modelli generativi, deep learning e agenti autonomi in architetture vive che ragionano in tempo reale, apprendono da ogni interazione e accrescono il loro vantaggio giorno dopo giorno. Non è automazione applicata a vecchi flussi di lavoro. È intelligenza ingegnerizzata da principi primi, ottimizzata per la produzione e costruita per scalare tra i continenti. Dove altri sperimentano, noi rilasciamo. Dove altri prototipano, noi trasformiamo. Il futuro appartiene ai brand che comandano l'intelligenza — e noi mettiamo quel potere nelle tue mani.",
      "ai.line": "Progettiamo l'intelligenza.",
      "ai.b1": "Discipline AI di frontiera sotto un unico tetto", "ai.b2": "Agenti autonomi che non dormono mai",
      "ai.b3": "Production-grade, costruito per scalare", "ai.b4": "Continenti, una visione sola",
      "ai.cta": "Progetta la tua intelligenza", "ai.tag": "Competenza AI",

      "img.ai": "Visual astratto di intelligenza artificiale con forme digitali blu fluide",
      "img.crypto": "Primo piano di uno schermo di trading di criptovalute con grafici e candele",
      "img.fintech": "Persona che usa lo smartphone per fintech, banking e pagamenti digitali",
      "img.datacenter": "File di server illuminati in un moderno data center scuro",
      "img.blockchain": "Rete blockchain astratta e luminosa di nodi blu collegati",

      "services.index": "02 — L'ARSENALE COMPLETO",
      "services.title": "Intelligenza, ingegnerizzata su ogni <span class=\"gradient-text\">superficie del tuo brand</span>",
      "services.lead": "L'AI è il motore. Questa è la macchina che alimenta.",
      "services.body": "Oltre alla nostra practice AI di punta c'è una potenza creativa e ingegneristica completa — un'unica forza verticalmente integrata che porta un brand dalla prima scintilla alla scala globale. Strategia, storia, software e segnale, fusi in un'incessante ricerca dell'eccellenza. Da tre hub di pari importanza a una rete di delivery senza confini che abbraccia il mondo, Madrigal costruisce i brand che definiscono la loro categoria. Ogni servizio qui sotto è affinato dallo stesso strato di intelligenza — così nulla di ciò che tocchiamo è ordinario.",
      "services.cta": "Costruisci il tuo brand di categoria",

      "hosting.index": "03 — INFRASTRUTTURA & HOSTING",
      "hosting.title": "Il tuo impero ha bisogno di <span class=\"gradient-text\">un posto dove vivere.</span>",
      "hosting.lead": "Dal nome a dominio al data center — l'intero stack, di proprietà e gestito.",
      "hosting.body": "La brillantezza non vale nulla se va offline. Madrigal gestisce l'intera spina dorsale sotto il tuo brand — domini, hosting, siti web e ferro puro — ingegnerizzata per un uptime che rasenta l'ossessione. Velocissima, blindata e distribuita globalmente, la nostra infrastruttura porta tutto ciò che costruiamo e tutto ciò che immaginerai. Un solo partner, proprietà totale, zero scuse.",

      "software.index": "04 — SOFTWARE INGEGNERIZZATO",
      "software.title": "Abbiamo costruito il software più difficile al mondo. <span class=\"gradient-text\">Il tuo è il prossimo.</span>",
      "software.lead": "Exchange, wallet, banche e intelligence blockchain — portati in produzione, affidati a denaro reale.",
      "software.body": "Quando la posta è più alta — milioni in movimento, millisecondi che decidono, regolatori che osservano ogni byte — le aziende vengono da Madrigal. Abbiamo ingegnerizzato l'intero stack crypto, fintech e dati end-to-end: motori di trading, custodia, core banking, intelligence di gaming e l'AI che dà la caccia ai flussi illeciti sulla catena. Se si può programmare, possiamo costruirlo — più velocemente, più pulito e a un prezzo che il mercato semplicemente non può eguagliare.",

      "sw1.tag": "Infrastruttura di Trading", "sw1.t": "Crypto Exchange", "sw1.d": "Matching engine, order book, custodia, liquidità e KYC — piattaforme complete spot e derivati ottimizzate per latenze da microsecondi e milioni di utenti simultanei, senza scomporsi.",
      "sw2.tag": "Custodia a Freddo", "sw2.t": "Wallet Hardware Crypto", "sw2.d": "Firmware su secure element, isolamento del seed e firma a prova di manomissione. Dispositivi di self-custody progettati perché le chiavi private nascano — e restino — fuori dalla portata del mondo esterno.",
      "sw3.tag": "Custodia On-Chain", "sw3.t": "Wallet Hot Crypto", "sw3.d": "Wallet hot multi-chain velocissimi con MPC e multisig, saldi in tempo reale e gestione delle chiavi blindata — costruiti per muovere miliardi di volume giornaliero, in modo sicuro e istantaneo.",
      "sw4.tag": "Core Banking", "sw4.t": "Fintech & Banking", "sw4.d": "Core banking, pagamenti, carte, ledger e onboarding — software finanziario pronto per i regolatori, ingegnerizzato per muovere denaro impeccabilmente, riconciliare al centesimo e scalare a livello nazionale.",
      "sw5.tag": "Intelligence in Tempo Reale", "sw5.t": "Gaming Big Data & AI", "sw5.d": "Analisi dei giocatori, raccomandazione live e AI anti-frode che elaborano miliardi di eventi in tempo reale — trasformando la telemetria di gioco grezza in retention, ricavi e vantaggio decisivo.",
      "sw6.tag": "RegTech", "sw6.t": "AML & Compliance", "sw6.d": "Screening sanzioni e PEP, transaction monitoring, KYC/KYB e case management — motori di compliance ingegnerizzati per soddisfare i regolatori più severi del pianeta.",
      "sw7.tag": "Forensics On-Chain", "sw7.t": "Analisi Blockchain", "sw7.d": "Attribuzione dei wallet, tracciamento dei fondi e risk scoring cross-chain — intelligence forense che segue il denaro ovunque tenti di nascondersi, e fa emergere la verità in pochi secondi.",

      "pitch.eyebrow": "// NESSUN LIMITE, NESSUNA SCUSA",
      "pitch.line": "Qualsiasi software. Costruito più in fretta. A un prezzo che vince.",
      "pitch.sub": "Tu porti l'idea — noi la rendiamo realtà. Qualunque cosa tu possa immaginare, possiamo ingegnerizzarla: a prezzi imbattibili, in tempistiche che sembrano impossibili, con una qualità production-grade che non vacilla mai. Da uno schizzo su un tovagliolo a un prodotto che definisce la categoria, Madrigal trasforma l'ambizione in software consegnato.",
      "pitch.cta": "Portaci la tua idea",

      "work.index": "05 — LA DIFFERENZA MADRIGAL",
      "work.title": "Dove la creatività incontra <span class=\"gradient-text\">l'intelligenza su scala</span>",
      "work.lead": "Non un'agenzia. Non una software house. Un moltiplicatore di forza per brand ambiziosi.",
      "work.body": "La maggior parte delle consulenze sceglie una corsia. Noi ci rifiutiamo. Madrigal fonde creatività di livello mondiale, ingegneria solida e AI di frontiera sotto un unico tetto — forgiata nei nostri studi globali, consegnata in tutto il mondo. Non usiamo solo l'AI; progettiamo l'intelligenza. Il risultato è un lavoro che pensa più veloce, scala più lontano e porta i brand da dove sono a dove erano sempre destinati a essere. Liberiamo le menti. Guidiamo i brand.",
      "work.b1": "Punti dati elaborati ogni giorno", "work.b2": "Paesi raggiunti tramite delivery globale",
      "work.b3": "Retention dei clienti, anno dopo anno", "work.b4": "Esperti di creatività, ingegneria e AI",

      "process.index": "06 — COME LAVORIAMO",
      "process.title": "Dalla prima scintilla alla <span class=\"gradient-text\">scala globale</span>",
      "process.lead": "Una metodologia di precisione ingegnerizzata per l'ambizione.",
      "process.body": "La brillantezza non è un caso. Dietro ogni svolta che rilasciamo c'è una disciplina tanto rigorosa quanto audace. Quattro movimenti ti portano dall'ignoto all'inarrestabile — una scoperta che vede ciò che gli altri mancano, un design che piega il futuro alla tua volontà, un'ingegneria che trasforma l'intelligenza in infrastruttura, e una scala che non conosce orizzonte. È così che la visione diventa velocità.",
      "process.cta": "Inizia la tua ascesa",

      "global.index": "07 — PRESENZA GLOBALE",
      "global.title": "Tre centri di comando. <span class=\"gradient-text\">Delivery senza confini.</span>",
      "global.lead": "Da Hong Kong a Lugano all'Italia — e ogni mercato che conta.",
      "global.body": "Tre centri di comando di pari peso — Hong Kong, Svizzera e Italia — ci ancorano tra Asia ed Europa, al crocevia di capitale, cultura e codice globali. Insieme orchestrano talenti d'élite e consegnano 24 ore su 24 a ogni mercato del pianeta. Mentre un continente dorme, un altro consegna — intelligenza, creatività e ingegneria che si muovono in perfetta sequenza, ovunque nel mondo, alla velocità che la tua ambizione richiede.",
      "global.b1": "Delivery follow-the-sun su ogni fuso orario",
      "global.b2v": "3 Sedi", "global.b2": "Hong Kong · Lugano · Italia",
      "global.b3": "Lingue parlate nei nostri team globali",

      "reach.c1t": "Tre Hub di Pari Peso", "reach.c1d": "Hong Kong, Svizzera e Italia hanno lo stesso peso — tre centri di comando tra Asia ed Europa, fluenti tra Oriente e Occidente e connessi ai mercati che definiscono il domani.",
      "reach.c2t": "Consegniamo nel Mondo", "reach.c2d": "Dai nostri hub consegniamo in ogni angolo del pianeta — nessun mercato troppo lontano, nessun fuso orario fuori portata. Ovunque viva la tua ambizione, noi siamo già lì.",
      "reach.c3t": "Il Sole Non Tramonta Mai", "reach.c3d": "La delivery follow-the-sun trasforma i fusi orari in slancio. Il lavoro avanza mentre il mondo dorme, così il progresso è incessante e le scadenze si piegano a noi.",

      "contact.eyebrow": "// COSTRUIAMO IL FUTURO",
      "contact.title": "Il futuro non aspetta.<br /><span class=\"gradient-text\">E nemmeno tu dovresti.</span>",
      "contact.lead": "Da tre continenti a ogni angolo del mondo — intelligenza, consegnata.",
      "contact.body": "Ogni impero inizia con una sola conversazione. Raccontaci il futuro che stai inseguendo e progetteremo l'intelligenza per raggiungerlo — più veloce, più audace e più lontano di quanto credessi possibile. Basta un messaggio per mettere in moto lo straordinario.",
      "contact.name": "Nome", "contact.namePh": "Il tuo nome",
      "contact.email": "Email", "contact.emailPh": "tu@azienda.com",
      "contact.company": "Azienda", "contact.companyPh": "Azienda (facoltativo)",
      "contact.message": "Quale futuro stai inseguendo?", "contact.messagePh": "Raccontaci la tua ambizione…",
      "contact.submit": "Inizia la conversazione",
      "contact.metaEmail": "Email", "contact.metaHq": "Sedi", "contact.metaHqV": "Hong Kong · Svizzera · Italia",
      "contact.metaEu": "Delivery", "contact.metaEuV": "In tutto il mondo",
      "contact.metaWorld": "Orari", "contact.metaWorldV": "24/7 · follow-the-sun",
      "contact.tagline": "Liberiamo le menti, guidiamo i brand",

      "footer.brand": "Liberiamo le menti, guidiamo i brand. Una consulenza premium di creatività, tecnologia e AI.",
      "footer.practice": "Practice", "footer.p1": "Intelligenza Artificiale", "footer.p2": "Digital Marketing",
      "footer.p3": "Hosting & Infrastruttura", "footer.p4": "Software Ingegnerizzato", "footer.p5": "Dati & Analytics",
      "footer.company": "Azienda", "footer.c1": "Perché Madrigal", "footer.c2": "Il nostro metodo", "footer.c3": "Presenza globale", "footer.c4": "Contatti",
      "footer.offices": "Le nostre sedi",
      "footer.off1t": "Hong Kong", "footer.off1r": "Asia",
      "footer.off2t": "Lugano", "footer.off2r": "Svizzera",
      "footer.off3t": "Milano", "footer.off3r": "Italia",
      "footer.off.delivery": "Delivery globale · 24/7",
      "footer.copyright": "© 2026 Madrigal Consulting Limited — Hong Kong · Lugano · Italia",
      "footer.fine": "Questo sito non usa cookie di tracciamento.",

      "form.err": "Inserisci nome, email e messaggio.",
      "form.opening": "Apertura dell'app email… se non succede nulla, scrivi a hello@madrigalconsulting.io",
      "form.subj": "Nuova richiesta di progetto — ", "form.q": "Quale futuro stai inseguendo?",
      "form.fName": "Nome", "form.fEmail": "Email", "form.fCompany": "Azienda"
    }
  };

  /* ---------- DATA (bilingual) ---------- */
  var AI_CAPS = [
    { g: "spark", en: { t: "Generative AI & LLM Applications", d: "Custom large language models, copilots, and generative engines fine-tuned to your domain — producing content, code, and decisions with human-grade fluency and machine-grade scale." }, it: { t: "AI Generativa & Applicazioni LLM", d: "Large language model su misura, copilot e motori generativi messi a punto sul tuo dominio — producono contenuti, codice e decisioni con fluidità umana e scala da macchina." } },
    { g: "net", en: { t: "Machine Learning & Deep Learning", d: "Neural architectures engineered to find the signal in the noise — recognizing patterns, predicting outcomes, and sharpening their edge with every dataset they touch." }, it: { t: "Machine Learning & Deep Learning", d: "Architetture neurali ingegnerizzate per trovare il segnale nel rumore — riconoscono pattern, prevedono risultati e affinano il loro vantaggio con ogni dataset che toccano." } },
    { g: "chat", en: { t: "Natural Language Processing", d: "Systems that read, comprehend, and converse across languages — turning unstructured text and voice into structured intelligence your business can act on instantly." }, it: { t: "Natural Language Processing", d: "Sistemi che leggono, comprendono e conversano in più lingue — trasformano testo e voce non strutturati in intelligenza strutturata su cui la tua azienda può agire all'istante." } },
    { g: "eye", en: { t: "Computer Vision", d: "Perception engines that see and interpret the physical world — detection, recognition, and real-time analysis that give machines the gift of sight." }, it: { t: "Computer Vision", d: "Motori di percezione che vedono e interpretano il mondo fisico — rilevamento, riconoscimento e analisi in tempo reale che donano alle macchine il dono della vista." } },
    { g: "chart", en: { t: "Predictive & Prescriptive Analytics", d: "Models that don't just forecast the future — they tell you what to do about it, converting raw data into decisive, revenue-shaping action." }, it: { t: "Analisi Predittiva & Prescrittiva", d: "Modelli che non si limitano a prevedere il futuro — ti dicono cosa farne, convertendo dati grezzi in azioni decisive che plasmano i ricavi." } },
    { g: "agent", en: { t: "Autonomous AI Agents & Workflow Automation", d: "Self-directed agents that plan, execute, and orchestrate complex work end to end — a tireless digital workforce that runs your operations around the clock." }, it: { t: "Agenti AI Autonomi & Automazione dei Flussi", d: "Agenti auto-diretti che pianificano, eseguono e orchestrano lavori complessi end-to-end — una forza lavoro digitale instancabile che gestisce le tue operazioni 24 ore su 24." } },
    { g: "book", en: { t: "RAG & Knowledge Systems", d: "Retrieval-augmented architectures that ground every answer in your proprietary knowledge — eliminating hallucination and turning institutional memory into instant intelligence." }, it: { t: "RAG & Sistemi di Conoscenza", d: "Architetture retrieval-augmented che ancorano ogni risposta alla tua conoscenza proprietaria — eliminano le allucinazioni e trasformano la memoria aziendale in intelligenza istantanea." } },
    { g: "gear", en: { t: "MLOps & Data Engineering", d: "Industrial-grade pipelines that take models from notebook to production and keep them there — versioned, monitored, and bulletproof at planetary scale." }, it: { t: "MLOps & Data Engineering", d: "Pipeline di livello industriale che portano i modelli dal notebook alla produzione e li mantengono lì — versionati, monitorati e a prova di proiettile su scala planetaria." } },
    { g: "compass", en: { t: "AI Strategy & Transformation", d: "Boardroom to backend, we chart the roadmap and build the reality — embedding intelligence into the core of your enterprise as durable competitive advantage." }, it: { t: "Strategia AI & Trasformazione", d: "Dal consiglio di amministrazione al backend, tracciamo la roadmap e costruiamo la realtà — integrando l'intelligenza nel cuore della tua impresa come vantaggio competitivo duraturo." } }
  ];

  var ORBIT_LABELS = {
    en: ["Generative AI", "ML & Deep Learning", "NLP", "Computer Vision", "Predictive Analytics", "Autonomous Agents", "RAG Systems", "MLOps", "AI Strategy"],
    it: ["AI Generativa", "ML & Deep Learning", "NLP", "Visione Artificiale", "Analisi Predittiva", "Agenti Autonomi", "Sistemi RAG", "MLOps", "Strategia AI"]
  };

  var SERVICES = [
    { en: { t: "Digital Marketing", d: "SEO, social, PPC, and content orchestrated as one weapon. We don't chase audiences — we engineer demand, dominate search, and turn attention into compounding growth." }, it: { t: "Digital Marketing", d: "SEO, social, PPC e contenuti orchestrati come un'unica arma. Non rincorriamo il pubblico — ingegnerizziamo la domanda, dominiamo la ricerca e trasformiamo l'attenzione in crescita composta." } },
    { en: { t: "Brand Development & Identity", d: "We forge identities that command the room before a word is spoken. Naming, positioning, and visual systems built to outlast trends and outclass every competitor in sight." }, it: { t: "Brand Development & Identità", d: "Forgiamo identità che dominano la scena prima ancora di una parola. Naming, posizionamento e sistemi visivi costruiti per sopravvivere alle mode e surclassare ogni concorrente in vista." } },
    { en: { t: "Content Creation", d: "Cinematic content engineered for impact at scale. Words, visuals, and motion crafted to stop the scroll, move the market, and make your brand impossible to ignore." }, it: { t: "Creazione di Contenuti", d: "Contenuti cinematografici ingegnerizzati per l'impatto su scala. Parole, immagini e movimento creati per fermare lo scroll, muovere il mercato e rendere il tuo brand impossibile da ignorare." } },
    { en: { t: "Data & Analytics", d: "We convert raw data into decisive advantage. Real-time intelligence, predictive modeling, and dashboards that don't just report the future — they help you author it." }, it: { t: "Dati & Analytics", d: "Convertiamo i dati grezzi in vantaggio decisivo. Intelligence in tempo reale, modelli predittivi e dashboard che non si limitano a riportare il futuro — ti aiutano a scriverlo." } },
    { en: { t: "IT Outsourcing & Software", d: "Mission-grade engineering in Java, Python, and C++, backed by elite systems architects. A borderless global talent network, building software that simply doesn't break." }, it: { t: "IT Outsourcing & Software", d: "Ingegneria mission-grade in Java, Python e C++, sostenuta da architetti di sistema d'élite. Una rete globale di talenti senza confini, che costruisce software che semplicemente non si rompe." } },
    { en: { t: "Mobile & IoT", d: "Flawless iOS and Android experiences, connected hardware, and IoT ecosystems engineered as one. We wire the physical and digital worlds into a single, intelligent fabric." }, it: { t: "Mobile & IoT", d: "Esperienze iOS e Android impeccabili, hardware connesso ed ecosistemi IoT ingegnerizzati come un tutt'uno. Colleghiamo il mondo fisico e quello digitale in un unico tessuto intelligente." } }
  ];

  var HOSTING = [
    { g: "server", en: { tag: "Managed Hosting", t: "Web Hosting", d: "Blazing-fast, hardened, globally-distributed hosting with elite uptime. Your sites and apps served at the speed of light and watched around the clock." }, it: { tag: "Hosting Gestito", t: "Web Hosting", d: "Hosting velocissimo, blindato e distribuito globalmente con uptime d'élite. Siti e app serviti alla velocità della luce e monitorati 24 ore su 24." } },
    { g: "globe", en: { tag: "Domains", t: "Domain Registration", d: "Claim, transfer, and manage domains across every TLD — with DNS, SSL, and privacy handled end to end. Your name on the internet, secured for good." }, it: { tag: "Domini", t: "Registrazione Domini", d: "Registra, trasferisci e gestisci domini su ogni TLD — con DNS, SSL e privacy gestiti end-to-end. Il tuo nome su internet, messo al sicuro per sempre." } },
    { g: "window", en: { tag: "Web Development", t: "Websites", d: "Striking, lightning-fast websites engineered to convert — from landing pages to full platforms, designed and built to outclass the competition." }, it: { tag: "Sviluppo Web", t: "Siti Web", d: "Siti web straordinari e velocissimi progettati per convertire — dalle landing page alle piattaforme complete, disegnati e costruiti per surclassare la concorrenza." } },
    { g: "rack", en: { tag: "Infrastructure", t: "Shared & Dedicated Servers", d: "From cost-efficient shared environments to raw dedicated iron — provisioned, secured, and scaled to your exact workload. Total power, zero compromise." }, it: { tag: "Infrastruttura", t: "Server Condivisi e Dedicati", d: "Da ambienti condivisi convenienti al ferro dedicato puro — provisioning, sicurezza e scalabilità sul tuo carico esatto. Potenza totale, zero compromessi." } }
  ];

  var WHY = [
    { en: { t: "AI Architected, Not Borrowed", d: "While others bolt on chatbots, we build the intelligence layer itself — generative systems, autonomous agents, computer vision, and predictive engines designed around your business, not the other way around." }, it: { t: "AI Progettata, Non Presa in Prestito", d: "Mentre altri aggiungono chatbot, noi costruiamo lo strato di intelligenza stesso — sistemi generativi, agenti autonomi, computer vision e motori predittivi progettati attorno alla tua azienda, non il contrario." } },
    { en: { t: "One Roof, Three Disciplines", d: "Creative vision, engineering rigor, and AI mastery converge in a single team. No handoffs, no finger-pointing, no seams — just brilliance executed end to end." }, it: { t: "Un Tetto, Tre Discipline", d: "Visione creativa, rigore ingegneristico e padronanza dell'AI convergono in un unico team. Nessun passaggio di consegne, nessun rimpallo, nessuna cucitura — solo brillantezza eseguita end-to-end." } },
    { en: { t: "A Truly Borderless Bench", d: "Elite talent spanning continents, orchestrated as one global delivery machine that never sleeps and never settles." }, it: { t: "Una Squadra Davvero Senza Confini", d: "Talenti d'élite distribuiti tra i continenti, orchestrati come un'unica macchina di delivery globale che non dorme mai e non si accontenta mai." } },
    { en: { t: "Obsessed With the Outcome", d: "We measure ourselves in market share, not deliverables. Every pixel, every model, every line of code is built to move the metric that matters most to you." }, it: { t: "Ossessionati dal Risultato", d: "Ci misuriamo in quote di mercato, non in deliverable. Ogni pixel, ogni modello, ogni riga di codice è costruito per muovere la metrica che conta di più per te." } }
  ];

  var PROCESS = [
    { i: "01", en: { t: "Discover", d: "We immerse ourselves in your world until we understand it better than the competition ever will. Deep market intelligence, audience truth, and data archaeology surface the signal beneath the noise — and the opportunity nobody else has dared to name." }, it: { t: "Scoperta", d: "Ci immergiamo nel tuo mondo finché non lo comprendiamo meglio di quanto farà mai la concorrenza. Market intelligence profonda, verità sul pubblico e archeologia dei dati fanno emergere il segnale sotto il rumore — e l'opportunità che nessun altro ha osato nominare." } },
    { i: "02", en: { t: "Design", d: "We architect the blueprint for dominance. Brand, experience, and intelligence converge into a singular strategy — every pixel, every model, every word engineered to move minds and command markets." }, it: { t: "Progettazione", d: "Progettiamo il piano per il dominio. Brand, esperienza e intelligenza convergono in un'unica strategia — ogni pixel, ogni modello, ogni parola ingegnerizzati per muovere le menti e comandare i mercati." } },
    { i: "03", en: { t: "Build", d: "We forge it into reality. World-class engineers and AI architects ship production-grade systems — from generative models and autonomous agents to brand worlds that breathe — built to perform from day one." }, it: { t: "Costruzione", d: "Lo forgiamo in realtà. Ingegneri di livello mondiale e architetti AI rilasciano sistemi production-grade — da modelli generativi e agenti autonomi a mondi di brand che respirano — costruiti per performare dal primo giorno." } },
    { i: "04", en: { t: "Scale", d: "We turn momentum into empire. Continuous optimization, MLOps, and global delivery compound your advantage relentlessly — so your reach expands, your edge sharpens, and your growth never stops." }, it: { t: "Scala", d: "Trasformiamo lo slancio in impero. Ottimizzazione continua, MLOps e delivery globale accrescono il tuo vantaggio senza sosta — così la tua portata si espande, il tuo vantaggio si affina e la tua crescita non si ferma mai." } }
  ];

  var OFFICES = [
    { photo: "assets/img/city-hongkong.jpg", skyline: "assets/img/skyline-hongkong.svg", en: { role: "Asia", city: "Hong Kong", line: "Our Asian hub — at the crossroads of global capital, culture, and code.", alt: "Hong Kong skyline illuminated at night" }, it: { role: "Asia", city: "Hong Kong", line: "Il nostro hub asiatico — al crocevia di capitale, cultura e codice globali.", alt: "Skyline di Hong Kong illuminato di notte" } },
    { photo: "assets/img/city-lugano.jpg", skyline: "assets/img/skyline-lugano.svg", en: { role: "Switzerland", city: "Lugano", line: "Our Swiss hub — at the heart of European finance, precision, and discretion.", alt: "Lake Lugano and the surrounding Swiss mountains" }, it: { role: "Svizzera", city: "Lugano", line: "Il nostro hub svizzero — nel cuore della finanza, della precisione e della discrezione europee.", alt: "Il lago di Lugano e le montagne svizzere" } },
    { photo: "assets/img/city-milan.jpg", skyline: "assets/img/skyline-milan.svg", en: { role: "Italy", city: "Milan", line: "Our Italian hub — wired into European design, industry, and ambition.", alt: "View over Milan with the Duomo" }, it: { role: "Italia", city: "Milano", line: "Il nostro hub italiano — connesso al design, all'industria e all'ambizione europei.", alt: "Veduta di Milano con il Duomo" } }
  ];

  var REACH_HUBS = [
    { x: 0.68, y: 0.40, en: "Hong Kong", it: "Hong Kong" },
    { x: 0.40, y: 0.30, en: "Switzerland", it: "Svizzera" },
    { x: 0.46, y: 0.50, en: "Italy", it: "Italia" }
  ];
  var REACH_DESTS = [
    { x: 0.10, y: 0.26 }, { x: 0.14, y: 0.66 }, { x: 0.30, y: 0.80 },
    { x: 0.62, y: 0.74 }, { x: 0.88, y: 0.60 }, { x: 0.86, y: 0.20 }
  ];

  /* ---------- SVG GLYPHS (petal motif) ---------- */
  function glyph(kind) {
    var s = '<svg viewBox="0 0 32 32" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">';
    var c = PALETTE.cyan;
    var base = '<rect x="11" y="11" width="10" height="10" rx="3" stroke="' + c + '"/>';
    var paths = {
      spark: '<path stroke="' + c + '" d="M16 4v6M16 22v6M4 16h6M22 16h6M8 8l4 4M24 24l-4-4M24 8l-4 4M8 24l4-4"/>' + base,
      net: '<circle cx="6" cy="6" r="2.4" stroke="' + c + '"/><circle cx="26" cy="6" r="2.4" stroke="' + c + '"/><circle cx="6" cy="26" r="2.4" stroke="' + c + '"/><circle cx="26" cy="26" r="2.4" stroke="' + c + '"/><path stroke="' + c + '" d="M8 8l6 6M24 8l-6 6M8 24l6-6M24 24l-6-6"/>' + base,
      chat: '<path stroke="' + c + '" d="M5 8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H12l-5 5v-5H8a3 3 0 0 1-3-3z"/><path stroke="' + c + '" d="M11 11h10M11 15h6"/>',
      eye: '<path stroke="' + c + '" d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16z"/><circle cx="16" cy="16" r="4" stroke="' + c + '"/>',
      chart: '<path stroke="' + c + '" d="M5 27V5M5 27h22"/><path stroke="' + c + '" d="M9 22l5-7 4 4 6-10"/>',
      agent: '<circle cx="16" cy="10" r="4" stroke="' + c + '"/><path stroke="' + c + '" d="M8 27c0-5 3.6-8 8-8s8 3 8 8M16 6V3M22 9l2-2M10 9L8 7"/>',
      book: '<path stroke="' + c + '" d="M6 5h9a3 3 0 0 1 3 3v19a4 4 0 0 0-4-4H6zM26 5h-9a3 3 0 0 0-3 3v19a4 4 0 0 1 4-4h8z"/>',
      gear: '<circle cx="16" cy="16" r="4" stroke="' + c + '"/><path stroke="' + c + '" d="M16 3v4M16 25v4M3 16h4M25 16h4M6.5 6.5l2.8 2.8M22.7 22.7l2.8 2.8M25.5 6.5l-2.8 2.8M9.3 22.7l-2.8 2.8"/>',
      compass: '<circle cx="16" cy="16" r="12" stroke="' + c + '"/><path stroke="' + c + '" d="M21 11l-3 7-7 3 3-7z"/>',
      server: '<rect x="5" y="6" width="22" height="8" rx="2" stroke="' + c + '"/><rect x="5" y="18" width="22" height="8" rx="2" stroke="' + c + '"/><path stroke="' + c + '" d="M9 10h.01M9 22h.01M13 10h.01M13 22h.01"/>',
      globe: '<circle cx="16" cy="16" r="12" stroke="' + c + '"/><path stroke="' + c + '" d="M4 16h24M16 4c4.5 4 4.5 20 0 24M16 4c-4.5 4-4.5 20 0 24"/>',
      window: '<rect x="4" y="6" width="24" height="20" rx="2.5" stroke="' + c + '"/><path stroke="' + c + '" d="M4 12h24M8 9h.01M11 9h.01M14 9h.01"/>',
      rack: '<rect x="8" y="4" width="16" height="24" rx="2.5" stroke="' + c + '"/><path stroke="' + c + '" d="M11 9h10M11 14h10M11 19h6"/><path stroke="' + c + '" d="M20 19h1.5"/>'
    };
    return s + (paths[kind] || base) + '</svg>';
  }

  /* ---------- dynamic-text updaters (re-applied on language switch) ---------- */
  var dynUpdaters = [];
  function applyDynamic() {
    for (var i = 0; i < dynUpdaters.length; i++) dynUpdaters[i]();
  }

  /* ============================================================
     BUILD DOM
     ============================================================ */
  function buildAI() {
    var grid = $("#aiGrid");
    if (!grid) return;
    AI_CAPS.forEach(function (c) {
      var el = document.createElement("article");
      el.className = "glass-card ai-card tilt reveal";
      el.innerHTML =
        '<div class="ai-card__glyph">' + glyph(c.g) + "</div>" +
        '<span class="tag"></span><h3></h3><p></p>';
      var tag = el.querySelector(".tag"), h3 = el.querySelector("h3"), p = el.querySelector("p");
      dynUpdaters.push(function () {
        tag.textContent = t("ai.tag");
        h3.textContent = c[LANG].t;
        p.textContent = c[LANG].d;
      });
      grid.appendChild(el);
    });
  }

  function buildHosting() {
    var grid = $("#hostingGrid");
    if (!grid) return;
    HOSTING.forEach(function (c) {
      var el = document.createElement("article");
      el.className = "glass-card ai-card tilt reveal";
      el.innerHTML =
        '<div class="ai-card__glyph">' + glyph(c.g) + "</div>" +
        '<span class="tag"></span><h3></h3><p></p>';
      var tag = el.querySelector(".tag"), h3 = el.querySelector("h3"), p = el.querySelector("p");
      dynUpdaters.push(function () {
        tag.textContent = c[LANG].tag;
        h3.textContent = c[LANG].t;
        p.textContent = c[LANG].d;
      });
      grid.appendChild(el);
    });
  }

  function buildServices() {
    var ul = $("#serviceRows");
    if (!ul) return;
    SERVICES.forEach(function (s, i) {
      var li = document.createElement("li");
      li.className = "row reveal";
      var idx = ("0" + (i + 1)).slice(-2);
      var bodyId = "row-body-" + (i + 1);
      li.innerHTML =
        '<button type="button" class="row__top" aria-expanded="false" aria-controls="' + bodyId + '">' +
        '<span class="row__idx">' + idx + "</span>" +
        '<h3 class="row__title"></h3>' +
        '<span class="row__plus" aria-hidden="true">+</span></button>' +
        '<div class="row__body" id="' + bodyId + '"><p></p></div>';
      var title = li.querySelector(".row__title"), body = li.querySelector(".row__body p");
      dynUpdaters.push(function () {
        title.textContent = s[LANG].t;
        body.textContent = s[LANG].d;
      });
      var btn = li.querySelector(".row__top");
      on(btn, "click", function () {
        var open = li.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      ul.appendChild(li);
    });
  }

  function buildWhy() {
    var grid = $("#whyGrid");
    if (!grid) return;
    WHY.forEach(function (w) {
      var el = document.createElement("article");
      el.className = "glass-card tilt reveal";
      el.innerHTML = "<h3></h3><p></p>";
      var h3 = el.querySelector("h3"), p = el.querySelector("p");
      dynUpdaters.push(function () {
        h3.textContent = w[LANG].t;
        p.textContent = w[LANG].d;
      });
      grid.appendChild(el);
    });
  }

  function buildFlow() {
    var ol = $("#flow");
    if (!ol) return;
    var fill = document.createElement("span");
    fill.className = "flow__fill";
    ol.appendChild(fill);
    PROCESS.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "flow__node reveal";
      li.innerHTML =
        '<span class="flow__dot" aria-hidden="true"></span>' +
        '<span class="flow__idx">' + p.i + "</span>" +
        '<h3 class="flow__title"></h3><p></p>';
      var h3 = li.querySelector(".flow__title"), pp = li.querySelector("p");
      dynUpdaters.push(function () {
        h3.textContent = p[LANG].t;
        pp.textContent = p[LANG].d;
      });
      ol.appendChild(li);
    });
  }

  function buildOffices() {
    var wrap = $("#offices");
    if (!wrap) return;
    OFFICES.forEach(function (o) {
      var el = document.createElement("article");
      el.className = "office-card reveal";
      el.innerHTML =
        '<div class="office-card__media">' +
        '<img loading="lazy" decoding="async" src="' + o.photo + '" alt="" />' +
        '<img class="office-card__skyline" src="' + o.skyline + '" alt="" aria-hidden="true" loading="lazy" decoding="async" />' +
        '</div>' +
        '<div class="office-card__body">' +
        '<p class="office-card__role"></p>' +
        '<h3 class="office-card__city"></h3>' +
        '<p class="office-card__line"></p>' +
        '</div>';
      var img = el.querySelector(".office-card__media img");
      var role = el.querySelector(".office-card__role");
      var city = el.querySelector(".office-card__city");
      var line = el.querySelector(".office-card__line");
      dynUpdaters.push(function () {
        role.textContent = o[LANG].role;
        city.textContent = o[LANG].city;
        line.textContent = o[LANG].line;
        img.setAttribute("alt", o[LANG].alt);
      });
      wrap.appendChild(el);
    });
  }

  /* ============================================================
     I18N APPLY + LANGUAGE SWITCH
     ============================================================ */
  function applyI18n() {
    document.documentElement.lang = LANG;

    $all("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    $all("[data-i18n-html]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-html"));
      if (v) el.innerHTML = v;
    });
    $all("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var seg = pair.split(":");
        if (seg.length < 2) return;
        var attr = seg[0].trim(), key = seg[1].trim();
        var v = t(key);
        if (v) el.setAttribute(attr, v);
      });
    });
    $all("[data-suffix-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-suffix-i18n"));
      if (!v) return;
      el.setAttribute("data-suffix", v);
      if (el.textContent !== "0" && el.hasAttribute("data-count")) {
        el.textContent = el.getAttribute("data-count") + v;
      }
    });

    $all(".lang-switch__btn").forEach(function (b) {
      var active = b.getAttribute("data-lang") === LANG;
      b.setAttribute("aria-pressed", active ? "true" : "false");
      b.classList.toggle("active", active);
    });

    applyDynamic();
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "it") return;
    LANG = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    applyI18n();
  }

  function initLang() {
    $all(".lang-switch__btn").forEach(function (b) {
      on(b, "click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }

  /* ============================================================
     NAV
     ============================================================ */
  function initNav() {
    var nav = $("#nav");
    var toggle = $("#navToggle");
    var menu = $("#mobileMenu");

    on(window, "scroll", function () {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
    });

    function setMenu(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? t("nav.close") : t("nav.open"));
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) menu.removeAttribute("inert");
      else menu.setAttribute("inert", "");
    }

    on(toggle, "click", function () {
      var willOpen = !menu.classList.contains("open");
      setMenu(willOpen);
      if (willOpen) {
        var first = $("#mobileMenu a");
        if (first) first.focus();
      }
    });

    on(menu, "keydown", function (e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        setMenu(false);
        toggle.focus();
      }
    });

    $all("#mobileMenu a").forEach(function (a) {
      on(a, "click", function () { setMenu(false); });
    });
  }

  /* ============================================================
     REVEAL + COUNTERS + FLOW FILL
     ============================================================ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (REDUCED || isNaN(target)) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $all(".reveal").forEach(function (e) { e.classList.add("in"); });
      $all("[data-count]").forEach(function (e) { e.textContent = e.getAttribute("data-count") + (e.getAttribute("data-suffix") || ""); });
      var f0 = $(".flow__fill"); if (f0) f0.style.width = "88%";
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $all("[data-count]", en.target).forEach(animateCount);
        if (en.target.hasAttribute("data-count")) animateCount(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    $all(".reveal").forEach(function (e) { io.observe(e); });
    $all("[data-count]").forEach(function (e) { io.observe(e); });

    var flow = $("#flow");
    if (flow) {
      var fio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var fill = $(".flow__fill");
            if (fill) fill.style.width = "88%";
            fio.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      fio.observe(flow);
    }
  }

  /* ============================================================
     TILT + SPECULAR GLARE
     ============================================================ */
  function initTilt() {
    if (REDUCED) return;
    $all(".tilt").forEach(function (card) {
      on(card, "pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        var rx = (0.5 - py) * 8;
        var ry = (px - 0.5) * 8;
        card.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
      });
      on(card, "pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ============================================================
     CONTACT FORM -> mailto
     ============================================================ */
  function initForm() {
    var form = $("#contactForm");
    if (!form) return;
    var note = $("#formNote");
    on(form, "submit", function (e) {
      e.preventDefault();
      var name = $("#cf-name").value.trim();
      var email = $("#cf-email").value.trim();
      var company = $("#cf-company").value.trim();
      var message = $("#cf-message").value.trim();
      if (!name || !email || !message) {
        if (note) note.textContent = t("form.err");
        return;
      }
      var subject = t("form.subj") + name + (company ? " (" + company + ")" : "");
      var body =
        t("form.fName") + ": " + name + "\n" +
        t("form.fEmail") + ": " + email + "\n" +
        t("form.fCompany") + ": " + (company || "—") + "\n\n" +
        t("form.q") + "\n" + message + "\n";
      var href = "mailto:hello@madrigalconsulting.io" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      if (note) note.textContent = t("form.opening");
    });
  }

  /* ============================================================
     RAF MANAGER (pauses on hidden tab)
     ============================================================ */
  var loops = [];
  function addLoop(fn) { loops.push(fn); }
  (function runner() {
    function frame() {
      if (!document.hidden) {
        for (var i = 0; i < loops.length; i++) loops[i]();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  function fitCanvas(canvas) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(r.width * dpr));
    canvas.height = Math.max(1, Math.floor(r.height * dpr));
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: r.width, h: r.height };
  }

  /* ============================================================
     HERO PARTICLE DUST (petal squares)
     ============================================================ */
  function initDust() {
    var canvas = $("#dustCanvas");
    if (!canvas || REDUCED) return;
    var dim = fitCanvas(canvas);
    var ctx = dim.ctx, W = dim.w, H = dim.h;
    var N = Math.min(46, Math.floor(W / 26));
    var dots = [];
    for (var i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * W, y: Math.random() * H,
        s: 1.5 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: 0.15 + Math.random() * 0.4,
        rot: Math.random() * Math.PI
      });
    }
    on(window, "resize", function () {
      var d = fitCanvas(canvas); ctx = d.ctx; W = d.w; H = d.h;
    });
    addLoop(function () {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < dots.length; i++) {
        var p = dots[i];
        p.x += p.vx; p.y += p.vy; p.rot += 0.004;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = "rgba(35,180,236," + p.a + ")";
        var s = p.s;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-s, -s, s * 2, s * 2, s * 0.6);
        else ctx.rect(-s, -s, s * 2, s * 2);
        ctx.fill();
        ctx.restore();
      }
    });
  }

  /* ============================================================
     INTELLIGENCE ORBIT
     ============================================================ */
  function initOrbit() {
    var canvas = $("#orbitCanvas");
    var wrap = $("#orbit");
    var tooltip = $("#orbitTooltip");
    if (!canvas || !wrap) return;

    var dim = fitCanvas(canvas);
    var ctx = dim.ctx, W = dim.w, H = dim.h;
    var cx = W / 2, cy = H / 2;

    var nodes = [];
    var rings = [0.42, 0.66, 0.9];
    var perRing = [3, 3, 3];
    var idx = 0;
    for (var r = 0; r < rings.length; r++) {
      for (var k = 0; k < perRing[r]; k++) {
        var ang = (Math.PI * 2 / perRing[r]) * k + r * 0.6;
        nodes.push({
          ring: rings[r], baseAng: ang, ang: ang,
          speed: (0.12 - r * 0.03) * (r % 2 ? -1 : 1),
          labelIdx: idx, x: 0, y: 0, glow: 0, paused: false
        });
        idx++;
      }
    }

    function labelFor(n) {
      var arr = ORBIT_LABELS[LANG] || ORBIT_LABELS.en;
      return arr[n.labelIdx] || "AI";
    }

    var mouse = { x: -999, y: -999, inside: false };
    var thought = 0;
    var hovered = -1;

    function resize() {
      var d = fitCanvas(canvas); ctx = d.ctx; W = d.w; H = d.h; cx = W / 2; cy = H / 2;
    }
    on(window, "resize", resize);

    function nodePos(n) {
      var half = Math.min(W, H) / 2;
      return {
        x: cx + Math.cos(n.ang) * n.ring * half,
        y: cy + Math.sin(n.ang) * n.ring * half
      };
    }

    on(wrap, "pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
      thought = 1;
      hovered = -1;
      for (var i = 0; i < nodes.length; i++) {
        var p = nodePos(nodes[i]);
        var dx = mouse.x - p.x, dy = mouse.y - p.y;
        if (dx * dx + dy * dy < 26 * 26) { hovered = i; break; }
      }
      if (hovered >= 0) {
        tooltip.textContent = labelFor(nodes[hovered]);
        tooltip.style.left = mouse.x + "px";
        tooltip.style.top = (mouse.y - 18) + "px";
        tooltip.classList.add("show");
      } else {
        tooltip.classList.remove("show");
      }
    });
    on(wrap, "pointerleave", function () {
      mouse.inside = false; hovered = -1;
      tooltip.classList.remove("show");
    });

    function drawPetal(x, y, size, glow) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.globalCompositeOperation = "lighter";
      var g = ctx.createLinearGradient(-size, -size, size, size);
      g.addColorStop(0, PALETTE.cyan);
      g.addColorStop(1, PALETTE.accent);
      ctx.fillStyle = g;
      ctx.shadowColor = "rgba(35,180,236," + (0.4 + glow * 0.5) + ")";
      ctx.shadowBlur = 10 + glow * 22;
      var s = size;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-s, -s, s * 2, s * 2, s * 0.5);
      else ctx.rect(-s, -s, s * 2, s * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      var half = Math.min(W, H) / 2;
      ctx.lineWidth = 1;
      for (var i = 0; i < nodes.length; i++) {
        var p = nodePos(nodes[i]);
        ctx.strokeStyle = "rgba(35,180,236,0.25)";
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();
        drawPetal(p.x, p.y, 11, 1);
      }
      for (var rr = 0; rr < rings.length; rr++) {
        ctx.strokeStyle = "rgba(120,170,255,0.10)";
        ctx.beginPath(); ctx.arc(cx, cy, rings[rr] * half, 0, Math.PI * 2); ctx.stroke();
      }
    }

    if (REDUCED) { resize(); drawStatic(); return; }

    addLoop(function () {
      ctx.clearRect(0, 0, W, H);
      var half = Math.min(W, H) / 2;
      thought *= 0.94;

      for (var rr = 0; rr < rings.length; rr++) {
        ctx.strokeStyle = "rgba(120,170,255,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, rings[rr] * half, 0, Math.PI * 2); ctx.stroke();
      }

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var isHover = (i === hovered);
        if (!isHover) n.ang += n.speed * 0.016 * 2;

        var p = nodePos(n);

        if (mouse.inside) {
          var dx = mouse.x - p.x, dy = mouse.y - p.y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 140) {
            var pull = (1 - dist / 140) * 8;
            p.x += (dx / dist) * pull;
            p.y += (dy / dist) * pull;
            n.glow = Math.min(1, n.glow + 0.12);
          }
        }
        n.glow *= 0.92;
        if (isHover) n.glow = 1;

        var br = 0.12 + n.glow * 0.5 + thought * 0.3;
        ctx.strokeStyle = "rgba(35,180,236," + br + ")";
        ctx.lineWidth = 1 + n.glow * 1.4;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();

        var tt = ((Date.now() / 1400) + i * 0.27) % 1;
        var pulseT = 1 - tt;
        var pxp = cx + (p.x - cx) * pulseT;
        var pyp = cy + (p.y - cy) * pulseT;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = "rgba(110,139,255," + (0.5 + n.glow * 0.4) + ")";
        ctx.beginPath(); ctx.arc(pxp, pyp, 1.8 + n.glow * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        drawPetal(p.x, p.y, isHover ? 15 : 11, n.glow);
      }

      var coreGlow = 0.3 + thought * 0.5;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, half * 0.42);
      cg.addColorStop(0, "rgba(35,180,236," + coreGlow + ")");
      cg.addColorStop(1, "rgba(35,180,236,0)");
      ctx.fillStyle = cg;
      ctx.beginPath(); ctx.arc(cx, cy, half * 0.42, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  /* ============================================================
     GLOBAL REACH MAP — HK hub + flight arcs
     ============================================================ */
  function initReach() {
    var canvas = $("#reachCanvas");
    if (!canvas) return;
    var dim = fitCanvas(canvas);
    var ctx = dim.ctx, W = dim.w, H = dim.h;

    function resize() { var d = fitCanvas(canvas); ctx = d.ctx; W = d.w; H = d.h; }
    on(window, "resize", resize);

    function P(p) { return { x: p.x * W, y: p.y * H }; }

    function drawStars() {
      for (var i = 0; i < 60; i++) {
        var x = (Math.sin(i * 12.9898) * 43758.5453) % 1; x = (x + 1) % 1;
        var y = (Math.sin(i * 78.233) * 12543.123) % 1; y = (y + 1) % 1;
        ctx.fillStyle = "rgba(157,178,216," + (0.1 + (x * 0.2)) + ")";
        ctx.fillRect(x * W, y * H, 1.2, 1.2);
      }
    }

    function arcLink(a, b, br, pulse, now, seed) {
      var mx = (a.x + b.x) / 2;
      var my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.26;
      ctx.strokeStyle = "rgba(35,180,236," + br + ")";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(mx, my, b.x, b.y);
      ctx.stroke();
      if (pulse && !REDUCED) {
        var tt = ((now * 0.3) + seed) % 1;
        var qx = (1 - tt) * (1 - tt) * a.x + 2 * (1 - tt) * tt * mx + tt * tt * b.x;
        var qy = (1 - tt) * (1 - tt) * a.y + 2 * (1 - tt) * tt * my + tt * tt * b.y;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = "rgba(110,139,255,0.9)";
        ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(qx, qy, 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }

    function hubCore(p, now) {
      var pulse = REDUCED ? 0.5 : (0.5 + 0.5 * Math.sin(now * 2 + p.x * 0.05));
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 24 + pulse * 8);
      g.addColorStop(0, "rgba(35,180,236,0.9)");
      g.addColorStop(1, "rgba(35,180,236,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, 24 + pulse * 8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.fillStyle = PALETTE.cyan;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      drawStars();
      var now = Date.now() / 1000;
      var hubs = [], dests = [], i, j;
      for (i = 0; i < REACH_HUBS.length; i++) hubs.push(P(REACH_HUBS[i]));
      for (i = 0; i < REACH_DESTS.length; i++) dests.push(P(REACH_DESTS[i]));

      // faint arcs: each equal hub -> every worldwide destination
      for (i = 0; i < hubs.length; i++) {
        for (j = 0; j < dests.length; j++) {
          arcLink(hubs[i], dests[j], 0.12, (j % 2 === 0), now, i * 0.13 + j * 0.21);
        }
      }
      // brighter arcs connecting the three equal hubs
      for (i = 0; i < hubs.length; i++) {
        arcLink(hubs[i], hubs[(i + 1) % hubs.length], 0.34, true, now, i * 0.33);
      }
      // worldwide destination dots (unlabeled)
      for (j = 0; j < dests.length; j++) {
        ctx.fillStyle = "rgba(157,178,216,0.8)";
        ctx.beginPath(); ctx.arc(dests[j].x, dests[j].y, 2.6, 0, Math.PI * 2); ctx.fill();
      }
      // three equal hubs + labels
      for (i = 0; i < hubs.length; i++) {
        hubCore(hubs[i], now);
        ctx.fillStyle = PALETTE.text;
        ctx.font = "bold 11px monospace";
        ctx.fillText(REACH_HUBS[i][LANG] || REACH_HUBS[i].en, hubs[i].x + 9, hubs[i].y - 7);
      }
    }

    if (REDUCED) { resize(); frame(); return; }
    addLoop(frame);
  }

  /* ============================================================
     FOOTER STARFIELD
     ============================================================ */
  function initStars() {
    var canvas = $("#starCanvas");
    if (!canvas) return;
    var dim = fitCanvas(canvas);
    var ctx = dim.ctx, W = dim.w, H = dim.h;
    var stars = [];
    var N = Math.min(70, Math.floor(W / 18));
    for (var i = 0; i < N; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, s: Math.random() * 1.6 + 0.3, p: Math.random() * Math.PI * 2 });
    }
    on(window, "resize", function () { var d = fitCanvas(canvas); ctx = d.ctx; W = d.w; H = d.h; });

    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!REDUCED) s.p += 0.02;
        var tw = REDUCED ? 0.4 : (0.3 + 0.3 * Math.sin(s.p));
        ctx.fillStyle = "rgba(35,180,236," + tw + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (REDUCED) { frame(); return; }
    addLoop(frame);
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    buildAI();
    buildHosting();
    buildServices();
    buildWhy();
    buildFlow();
    buildOffices();

    initLang();
    initNav();
    applyI18n();      // sets all static + dynamic text in current language
    initReveal();     // counters read the now-localized data-suffix
    initTilt();
    initForm();
    initDust();
    initOrbit();
    initReach();
    initStars();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

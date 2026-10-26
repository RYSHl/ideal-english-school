/* Extracted from the original Ideal English School website. Logic retained. */
const LOGO="images/logo.png";

/* ======================================================================
   SITE CONTENT. Edit this object to update the website. Nothing outside
   this block needs to change for routine updates. See the "Content guide"
   page (link in the footer) for step-by-step instructions.
   ====================================================================== */
const SITE={
  name:"Ideal English School, Dholai Bazar",
  established:1999,
  address:{village:"Sadagram",po:"Dholai",district:"Cachar",state:"Assam",pin:"788114",country:"India"},
  contact:{phone:"",email:"",officeHours:""},          /* fill in only verified details */
  formEndpoint:"",                                     /* URL of the school's form service; empty = not connected */
  /* Figures reported in school directories. Keep show:false until the school confirms and gives an "as of" date. */
  stats:{show:false,asOf:"",students:345,teachers:22,classrooms:13},
  notices:[
    {id:"admission-enquiry",title:"Admissions enquiry: contact the school office",date:"",category:"Admission",
     summary:"Parents and guardians can ask the school office about availability and eligibility for each class.",
     body:"This is draft wording waiting for the school's approval. After approval, add the opening date, office hours and contact number here.",draft:true,file:""}
  ],
  noticeCategories:["Admission","Academic","Examination","Holiday","Parent meeting","Event","Circular"],
  documents:[],                                        /* approved admission documents, e.g. "Birth certificate" */
  staff:[],                                            /* {name,role,photo,qualification} only when approved */
  gallery:[{"src": "images/gallery/photo-01.webp", "alt": "Teachers and staff standing in front of the Ideal English School, Dholai banner", "caption": "Teachers and staff at the school entrance", "category": "Campus", "date": ""}, {"src": "images/gallery/photo-02.webp", "alt": "Students holding drawings and posters, with teachers and staff standing in the school yard", "caption": "Assembly with student drawings and posters", "category": "Events", "date": ""}, {"src": "images/gallery/photo-03.webp", "alt": "Guests seated on the stage at the Independence Day celebration programme at Dholai", "caption": "Independence Day celebration programme", "category": "Events", "date": ""}, {"src": "images/gallery/photo-04.webp", "alt": "Students seated in front, with teachers and staff behind them in the school yard", "caption": "Students with teachers and staff", "category": "Events", "date": ""}, {"src": "images/gallery/photo-05.webp", "alt": "Students of Ideal English School seated in a crowd watching a programme", "caption": "Students at a community programme", "category": "Events", "date": ""}, {"src": "images/gallery/photo-06.webp", "alt": "Students and teachers standing together under the pink school veranda", "caption": "Students and teachers at school", "category": "Campus", "date": ""}, {"src": "images/gallery/photo-07.webp", "alt": "Students and two teachers standing on a paved lane lined with areca palms", "caption": "Students and teachers on the way to a programme", "category": "Events", "date": ""}, {"src": "images/gallery/photo-08.webp", "alt": "Teachers and staff standing near the flagpole on Independence Day", "caption": "Flag-hoisting day, teachers and staff", "category": "Events", "date": ""}, {"src": "images/gallery/photo-09.webp", "alt": "Women teachers in colourful sarees standing together in the school yard", "caption": "Our teachers", "category": "Campus", "date": ""}, {"src": "images/gallery/photo-10.webp", "alt": "Students, teachers and staff gathered under a pink and white canopy with a garlanded portrait", "caption": "Teachers’ Day celebration", "category": "Cultural programmes", "date": ""}, {"src": "images/gallery/photo-11.webp", "alt": "Guests and staff seated at a felicitation table with gift bags, with an audience behind", "caption": "Felicitation programme at school", "category": "Events", "date": ""}, {"src": "images/gallery/photo-12.webp", "alt": "Three students in uniform standing in front of a Quiz, Art and Speech Competition banner", "caption": "Students at the district quiz, art and speech competition", "category": "Academic activities", "date": ""}, {"src": "images/gallery/photo-13.webp", "alt": "Flag hoisting at school, with young children holding tricolour flags around the flagpole", "caption": "Flag hoisting with our youngest learners", "category": "Events", "date": ""}, {"src": "images/gallery/photo-14.webp", "alt": "Two students in traditional dress and headpieces standing with a teacher in front of the school gate", "caption": "Students in traditional dress", "category": "Cultural programmes", "date": ""}, {"src": "images/gallery/photo-15.webp", "alt": "A student receiving a memento from a teacher at a felicitation ceremony", "caption": "Felicitation ceremony", "category": "Events", "date": ""}, {"src": "images/gallery/photo-16.webp", "alt": "Staff presenting a bouquet and a framed portrait to a colleague in the school office", "caption": "Felicitation in the school office", "category": "Events", "date": ""}, {"src": "images/gallery/photo-17.webp", "alt": "Teachers and a guest standing together in the school office", "caption": "Teachers in the school office", "category": "Events", "date": ""}, {"src": "images/gallery/photo-18.webp", "alt": "A young student in a red costume with a teacher at the Teachers’ Day programme", "caption": "Teachers’ Day programme", "category": "Cultural programmes", "date": ""}, {"src": "images/gallery/photo-19.webp", "alt": "A young student in a red costume shaking hands with a teacher at the Teachers’ Day programme", "caption": "Teachers’ Day programme", "category": "Cultural programmes", "date": ""}],                                          /* {src,alt,caption,category,date} */
  galleryCategories:["Campus","Classrooms","Academic activities","Events","Sports","Cultural programmes"],
  vision:"To create a supportive learning environment where every child can develop knowledge, confidence, responsibility, and a lifelong love of learning.",
  mission:"To provide meaningful educational opportunities, encourage curiosity, develop strong foundations in essential subjects, and support the academic and personal growth of every learner.",
  values:["Respect","Responsibility","Curiosity","Integrity","Cooperation","Discipline","Lifelong learning"],
  stages:[
    {id:"pre",classes:"Nursery stage",title:"Pre-primary",img:"preprimary.jpg",
     text:"The first years in school are about settling in, listening, speaking and playing together. Early literacy, early numeracy, communication and creative activity are introduced in ways suited to young children.",
     points:["Early reading and writing readiness","Numbers and counting through play","Songs, stories and drawing"]},
    {id:"pri",classes:"Classes 1 to 5",title:"Primary",img:"primary.jpg",
     text:"Primary classes build the foundations for later learning: reading with understanding, writing, arithmetic and an introduction to the world around us, taught in English.",
     points:["English language and reading","Mathematics","Environment and general knowledge"]},
    {id:"upp",classes:"Classes 6 to 8",title:"Upper primary",img:"upper-primary.jpg",
     text:"Learners move to separate subjects, begin to work more independently and take part in practical activities that connect lessons to everyday life.",
     points:["Subject-wise learning","Projects and practical work","Study habits and self-reliance"]},
    {id:"sec",classes:"Classes 9 and 10",title:"Secondary",img:"secondary.jpg",
     text:"Secondary classes prepare learners for the Class 10 board examination and for the choices that follow. Parents should ask the school office which board and which subjects apply.",
     points:["Examination preparation","Subject options, where offered","Guidance for the next stage"]}
  ],
  facilities:[
    {id:"cls",icon:"building",title:"Classrooms",text:"Learning spaces for pre-primary through Class 10. The number of classrooms will be shown once the school confirms it."},
    {id:"lib",icon:"book",title:"Library",text:"A library that supports reading alongside classroom lessons. The collection size will be added once confirmed."},
    {id:"ply",icon:"ball",title:"Playground",text:"Open space for play, physical activity and school events."},
    {id:"wat",icon:"drop",title:"Drinking water and handwashing",text:"Arrangements for safe drinking water and handwashing at school."},
    {id:"ict",icon:"laptop",title:"Computer and ICT",text:"Computer-related facilities for learners. The school will confirm what is in use today."},
    {id:"toi",icon:"users",title:"Toilets",text:"Toilet facilities for boys and girls."},
    {id:"ele",icon:"bolt",title:"Electricity and infrastructure",text:"Electricity supply and other amenities, listed here after the school confirms each one."}
  ],
  pendingFacilities:["Ramps","Internet","Medical check-ups","Solar panels","Rainwater harvesting","DTH access","Science-related facilities"],
  activities:["Classroom learning","Reading and library","Cultural programmes","Art and creativity","Sports and outdoor play","School assemblies","Educational events","Celebrations and community events"],
  faqs:[
    {q:"Which classes does the school offer?",a:"The school serves children from pre-primary through Class 10. The school office can tell you whether seats are open in a particular class.",link:["#admissions","Admissions"]},
    {q:"Where is the school located?",a:"Ideal English School, Dholai Bazar is at Vill Sadagram, PO Dholai, District Cachar, Assam, PIN 788114.",link:["#contact","Contact and map link"]},
    {q:"What is the medium of instruction?",a:"English. School directory records also mention Bengali and Manipuri; the school will confirm how these are used."},
    {q:"How can parents enquire about admission?",a:"Use the enquiry form on the Admissions page or contact the school office. Submitting an enquiry does not guarantee a seat.",link:["#admissions","Admissions"]},
    {q:"How can parents get the current fee structure?",a:"Ask the school office. No fee amounts are published on this website until the school approves a fee schedule."},
    {q:"How can parents contact the school?",a:"The address is on the Contact page. The school's telephone number and email will be added once the school has verified them.",link:["#contact","Contact"]},
    {q:"How can parents receive school notices?",a:"Official notices are posted on the Notices page. Ask the school office whether notices are also shared in other ways.",link:["#notices","Notices"]}
  ]
};

/* ---------------- CMS hooks (values come from the admin panel via js/cms.js) ---------------- */
const BASE_GAL=SITE.gallery.slice();
const CMSX=()=>SITE.cms||{};
const CV=(key, fallback='')=>{const v=CMSX()[key]; if(v==null||v==='') return fallback; try{return JSON.parse(v)}catch{return v}};
const CText=(key,fallback='')=>String(CV(key,fallback));
const T=(k,d)=>(CMSX()[k]||'').trim()||d;
const slotImg=(slot,fb,alt)=>{const u=(CMSX()['photo_'+slot]||'').trim();return u?{src:u,alt:(CMSX()['photo_'+slot+'_alt']||'').trim()||'Ideal English School'}:{src:fb.src,alt:alt||fb.alt}};

/* ---------------- helpers ---------------- */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nc=t=>`<span class="nc">${t}</span>`;
const ICON={
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  building:'<path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/><path d="M12 11h.01"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  drop:'<path d="M12 2.7s7 7.2 7 12.3a7 7 0 0 1-14 0C5 9.9 12 2.7 12 2.7z"/>',
  laptop:'<path d="M3 5h18v11H3z"/><path d="M2 20h20"/>',
  bolt:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
  ball:'<circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/><path d="M2 12h20"/>',
  pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<path d="M3 5h18v14H3z"/><path d="M3 6l9 7 9-7"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu:'<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  x:'<path d="M18 6L6 18"/><path d="M6 6l12 12"/>',
  chev:'<path d="M6 9l6 6 6-6"/>',
  arrow:'<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  left:'<path d="M15 6l-6 6 6 6"/>',
  right:'<path d="M9 6l6 6-6 6"/>',
  calendar:'<path d="M3 5h18v16H3z"/><path d="M3 10h18"/><path d="M8 2v6"/><path d="M16 2v6"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  image:'<path d="M3 3h18v18H3z"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  hand:'<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.4L3.4 16a2 2 0 0 1 3-2.7L8 15"/>'
};
const ic=(n,s=20)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]||''}</svg>`;
const ph=(label,file,cls='')=>`<div class="ph ${cls}" role="img" aria-label="Photo placeholder: ${esc(label)}">${ic('image',30)}<strong>${esc(label)}</strong><span>Replace with an authentic school photograph (${esc(file)})</span></div>`;
const A=SITE.address;
const addrLine=`Vill&ndash;${A.village}, PO&ndash;${A.po}, District&ndash;${A.district}, ${A.state}, ${A.country} &ndash; ${A.pin}`;
const mapUrl="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(`Ideal English School Dholai Bazar ${A.village} ${A.po} ${A.district} ${A.state} ${A.pin}`);
const head=(h,lead,crumb)=>`<section class="phead"><div class="wrap"><nav class="crumb" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><span>${crumb||h}</span></nav><h1>${h}</h1>${lead?`<p class="lead">${lead}</p>`:''}</div></section>`;
const fmtDate=d=>{if(!d)return 'Date to be set';try{return new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}catch(e){return d}};
const noticeList=(n)=>!n.length?'<p class="fnote">No notices at the moment. Please check again soon.</p>':`<ul class="alist">${n.map(x=>`<li><a href="#notices">${x.draft?'<span class="badge">Draft</span>':''}${esc(x.title)}</a><small>${esc(x.category)} &middot; ${esc(fmtDate(x.date))}</small></li>`).join('')}</ul>`;

/* ---------------- pages ---------------- */
function home(){
  const st=SITE.stats.show?`
    <div class="fact"><div class="k">${ic('users',16)}Students</div><div class="v">${SITE.stats.students}</div><small class="fnote">As of ${esc(SITE.stats.asOf)}</small></div>`:'';
  const nots=SITE.notices.slice(0,3);
  const firstSentence=t=>{const i=t.indexOf('. ');return i>0?t.slice(0,i+1):t};
  const faqs=SITE.faqs.slice(0,4).map(f=>`<details><summary>${f.q}${ic('chev',20)}</summary><div class="body"><p>${nc(f.a)}</p>${f.link?`<p style="margin-top:8px"><a href="${f.link[0]}">${f.link[1]}</a></p>`:''}</div></details>`).join('');
  const gal=(SITE.homeStrip&&SITE.homeStrip.length?SITE.homeStrip:[1,2,9,11].map(i=>BASE_GAL[i])).filter(Boolean);
  const heroImg=slotImg('hero',BASE_GAL[5],'Students and a teacher standing in front of the pink and yellow school building at Ideal English School');
  const welcImg=slotImg('welcome',BASE_GAL[3],'Students seated in front with teachers and staff standing behind them in the school yard');
  return `<div class="page">
  <section class="hero" aria-labelledby="h1"><div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${esc(CText('hero_badge','Pre-primary to Class 10 · Co-educational'))}</p>
      <h1 id="h1">${esc(T('hero_heading','A Strong Foundation for a Brighter Future.'))}</h1>
      <p class="lead">${esc(T('hero_lead','Ideal English School provides an English-medium learning environment where students are encouraged to develop knowledge, confidence, discipline, and a lifelong love of learning.'))}</p>
      <div class="btns"><a class="btn btn-red" href="${esc(CText('hero_cta1_link','#about'))}">${esc(CText('hero_cta1_text','Explore Our School'))} ${ic('arrow',18)}</a><a class="btn btn-line" href="${esc(CText('hero_cta2_link','#admissions'))}">${esc(CText('hero_cta2_text','Admission Enquiry'))}</a></div>
      <p class="trust">${ic('users',18)} ${esc(CText('site_classes_summary','Pre-primary to Class 10'))} · Co-educational</p>
    </div>
    <img class="hero-media" src="${esc(heroImg.src)}" width="1000" height="750" fetchpriority="high" decoding="async" alt="${esc(heroImg.alt)}">
  </div></section>

  <section class="strip" aria-label="The school at a glance"><div class="wrap">
    <div class="facts">
      <div class="fact"><div class="k">${ic('calendar',16)}Established</div><div class="v">${esc(String(SITE.established||1999))}</div></div>
      <div class="fact"><div class="k">${ic('pencil',16)}Medium</div><div class="v">${nc(CText('site_medium','English'))}</div></div>
      <div class="fact"><div class="k">${ic('book',16)}Classes</div><div class="v">${nc(CText('site_classes_summary','Pre-primary to Class 10'))}</div></div>
      <div class="fact"><div class="k">${ic('pin',16)}Location</div><div class="v">${nc(CText('site_location_summary','Dholai Bazar, Cachar, Assam'))}</div></div>
    </div>
    ${SITE.stats.show?`<p class="fnote" style="margin-top:12px">Students: ${SITE.stats.students}. Teachers: ${SITE.stats.teachers}. Classrooms: ${SITE.stats.classrooms}. As of ${esc(SITE.stats.asOf)}.</p>`:`<p class="ro fnote" style="margin-top:12px">Review note: student, teacher and classroom counts from directory records are hidden until the school confirms them with an &ldquo;as of&rdquo; date (SITE.stats).</p>`}
  </div></section>

  <section class="sec" aria-labelledby="welc"><div class="wrap welcome">
    <div>
      <p class="eyebrow">ABOUT THE SCHOOL</p>
      <h2 id="welc">${esc(CText('welcome_heading','Welcome to Ideal English School'))}</h2>
      <p class="prose">${T('welcome_text','')?esc(T('welcome_text','')):nc('Ideal English School, Dholai Bazar, is a co-educational school located in Sadagram, Dholai, Cachar, Assam. The school serves learners from pre-primary through Class 10, with an emphasis on learning, personal development, and preparation for the next stages of education.')}</p>
      <p style="margin-top:20px"><a class="more" href="#about">Discover our school ${ic('arrow',16)}</a></p>
    </div>
    <img src="${esc(welcImg.src)}" width="1000" height="750" alt="${esc(welcImg.alt)}" loading="lazy" decoding="async" class="pic">
  </div></section>

  <section class="sec soft" aria-labelledby="acad"><div class="wrap">
    <div class="sec-h"><div><h2 id="acad">Academic learning</h2><p>From the first years in school to the Class 10 board stage.</p></div><a class="more" href="#academics">All stages ${ic('arrow',16)}</a></div>
    <div class="stages-grid">${SITE.stages.map(s=>`<a class="card stage-card" href="#academics"><span class="eyebrow">${s.classes.toUpperCase()}</span><h3>${s.title}</h3><p>${nc(firstSentence(s.text))}</p><span class="go">Learn more ${ic('arrow',16)}</span></a>`).join('')}</div>
  </div></section>

  <section class="sec" aria-labelledby="fac"><div class="wrap">
    <div class="sec-h"><div><h2 id="fac">School facilities</h2><p>${nc('Facilities are listed here after the school confirms each one.')}</p></div><a class="more" href="#facilities">All facilities ${ic('arrow',16)}</a></div>
    <div class="fac">${SITE.facilities.slice(0,6).map(f=>`<article class="card"><span class="ico">${ic(f.icon,24)}</span><h3>${f.title}</h3><p>${nc(f.text)}</p></article>`).join('')}</div>
  </div></section>

  <section class="ann-band" aria-labelledby="newsh"><div class="wrap ann-grid">
    <div class="card panel"><h2 id="newsh">${ic('bell',22)}Latest notices</h2>${noticeList(nots)}<p style="margin-top:14px"><a class="more" href="#notices">All notices ${ic('arrow',16)}</a></p></div>
    <div class="card panel"><h2>${ic('info',22)}For parents</h2><ul class="ql">
      <li><a href="#admissions">Admission enquiry ${ic('arrow',16)}</a></li>
      <li><a href="#admissions">Fee information from the office ${ic('arrow',16)}</a></li>
      <li><a href="#faq">Frequently asked questions ${ic('arrow',16)}</a></li>
      <li><a href="#contact">Address and contact ${ic('arrow',16)}</a></li></ul></div>
  </div></section>

  <section class="sec" aria-labelledby="sl"><div class="wrap">
    <div class="sec-h"><div><h2 id="sl">Life at school</h2><p>Moments from school programmes, celebrations and activities.</p></div><a class="more" href="#gallery">Full gallery ${ic('arrow',16)}</a></div>
    <div class="home-gal">${gal.map(g=>`<figure><a href="#gallery" aria-label="Open the gallery: ${esc(g.caption)}"><img src="${esc(g.src)}" width="1000" height="750" alt="${esc(g.alt)}" loading="lazy" decoding="async"></a><figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}</div>
    <p class="fnote" style="margin-top:14px">Student photographs are published only with the school's authorisation and parental or guardian consent.</p>
  </div></section>

  <section class="cta" aria-labelledby="ctah"><div class="wrap">
    <div><h2 id="ctah">Thinking about admission?</h2><p>Contact the school office to ask about availability and eligibility for your child's class.</p></div>
    <div class="btns"><a class="btn btn-red" href="#admissions">Admission Enquiry</a><a class="btn btn-ghost-w" href="#contact">Contact the school</a></div>
  </div></section>

  <section class="sec soft" aria-labelledby="faqh"><div class="wrap">
    <div class="sec-h"><div><h2 id="faqh">Frequently asked questions</h2></div><a class="more" href="#faq">All questions ${ic('arrow',16)}</a></div>
    <div class="faq">${faqs}</div>
  </div></section></div>`;
}

function about(){
  const aboutImg=slotImg('about',BASE_GAL[0],'Teachers and staff standing in front of the Ideal English School, Dholai banner');
  return `<div class="page">${head(CText('about_lead','About Us'),'','About Us')}
  <section class="sec"><div class="wrap two" style="align-items:center">
    <div class="prose"><h2 style="margin-bottom:14px;font-size:30px">${esc(CText('welcome_heading','School overview'))}</h2>
      <p>${nc(CText('about_overview','The school is in the village of Sadagram, under Dholai Post Office in Cachar district, Assam. It serves learners from pre-primary through Class 10 and has done so since 1999.'))}</p>
      <p>${nc('Medium of instruction: '+CText('site_medium','English')+'. The school is co-educational.')}</p>
      <p style="margin-top:18px"><a class="more" href="#history">Read our history ${ic('arrow',16)}</a></p></div>
    <img src="${esc(aboutImg.src)}" width="1000" height="750" alt="${esc(aboutImg.alt)}" loading="lazy" decoding="async" class="pic wide">
  </div></section>
  <section class="sec soft" aria-labelledby="vm"><div class="wrap">
    <div class="sec-h"><div><h2 id="vm">Vision and mission</h2><p>Proposed statements. They become official only when the school approves them.</p></div></div>
    <div class="vm">
      <div class="card"><h3>${ic('eye',22)||''}Vision</h3><blockquote>${nc(SITE.vision)}</blockquote></div>
      <div class="card"><h3>Mission</h3><blockquote>${nc(SITE.mission)}</blockquote></div>
    </div>
  </div></section>
  <section class="sec" aria-labelledby="vals"><div class="wrap">
    <div class="sec-h"><div><h2 id="vals">School values</h2><p>${nc('Themes proposed for the school to consider. They are not yet confirmed as officially adopted values.')}</p></div></div>
    <ul class="vals">${(Array.isArray(SITE.values)?SITE.values:[]).map(v=>`<li>${nc(v)}</li>`).join('')}</ul>
  </div></section></div>`;
}

function history(){
  const h=SITE.history||{};
  const milestones=Array.isArray(h.milestones)?h.milestones:[];
  const story=h.story||'';
  return `<div class="page">${head(CText('history_lead','Our History'), 'The story of how Ideal English School began.','Our History')}
  <section class="sec"><div class="wrap two" style="align-items:start">
    <div class="prose">
      ${story?`<p style="white-space:pre-line">${nc(story)}</p>`:`<p>The emblem of Ideal English School carries the year ${esc(String(SITE.established||1999))}, the year the school was established.</p><p>${nc(h.founder?`According to the school history, the school was founded by ${h.founder}.`:'The school history will be updated when the school confirms its account.')}</p><p>${nc(h.principal?`${h.principal} is listed as the first Principal.`:'')}</p><p>${nc(h.vp?`${h.vp} is listed as the first Vice Principal.`:'')}</p>`}
    </div><div><ol class="tl">${milestones.map(m=>`<li><div class="yr">${esc(m.year||'')}</div><p>${nc(m.desc||'')}</p></li>`).join('') || `<li><div class="yr">${esc(String(SITE.established||1999))}</div><p>School established.</p></li>`}</ol></div>
  </div></section></div>`;
}

function academics(){
  const rows=(Array.isArray(SITE.stages)?SITE.stages:[]).map((s,i)=>`<article class="edit ${i%2?'rev':''}" aria-labelledby="st-${s.id}">
    ${ph(s.title+' classes',s.img)}
    <div><p class="eyebrow">${s.classes.toUpperCase()}</p><h2 id="st-${s.id}">${s.title}</h2><p class="prose">${nc(s.text)}</p>
      <ul>${s.points.map(p=>`<li>${nc(p)}</li>`).join('')}</ul>
      <a class="more" href="#notices">Related notices ${ic('arrow',16)}</a></div></article>`).join('');
  return `<div class="page">${head(CText('academics_lead','From the first year in school to Class 10, learning is organised in four stages.'),'', 'Academics')}
  <section class="sec"><div class="wrap">
    <div class="note">${ic('info',20)}<span><strong>Board and subjects.</strong> ${nc(CText('academics_board_note','The school will confirm the examination board and subjects.'))}</span></div>
    ${rows}
  </div></section></div>`;
}

const CLASSES=['Pre-primary','Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10'];
function formHTML(kind){
  const enq=kind==='enquiry';
  return `<form class="card form" id="f-${kind}" novalidate aria-labelledby="ft-${kind}">
    <h3 id="ft-${kind}">${enq?'Admission enquiry form':'Send a message'}</h3>
    <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="fld"><label for="${kind}-name">${enq?'Parent or guardian name':'Your name'}</label><input id="${kind}-name" name="name" type="text" autocomplete="name" required aria-describedby="${kind}-name-e"><div class="err" id="${kind}-name-e" aria-live="polite"></div></div>
    ${enq?`<div class="row2"><div class="fld"><label for="enquiry-student">Student's name</label><input id="enquiry-student" name="student" type="text" required aria-describedby="enquiry-student-e"><div class="err" id="enquiry-student-e" aria-live="polite"></div></div>
    <div class="fld"><label for="enquiry-class">Class of interest</label><select id="enquiry-class" name="cls" required aria-describedby="enquiry-class-e"><option value="">Select a class</option>${(Array.isArray(SITE.classes)&&SITE.classes.length?SITE.classes:CLASSES).map(c=>`<option>${esc(c)}</option>`).join('')}</select><div class="err" id="enquiry-class-e" aria-live="polite"></div></div></div>`:''}
    <div class="row2"><div class="fld"><label for="${kind}-phone">Contact number</label><input id="${kind}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required aria-describedby="${kind}-phone-e"><div class="err" id="${kind}-phone-e" aria-live="polite"></div></div>
    <div class="fld"><label for="${kind}-email">Email <small>(optional)</small></label><input id="${kind}-email" name="email" type="email" autocomplete="email" aria-describedby="${kind}-email-e"><div class="err" id="${kind}-email-e" aria-live="polite"></div></div></div>
    <div class="fld"><label for="${kind}-msg">Message ${enq?'<small>(optional)</small>':''}</label><textarea id="${kind}-msg" name="msg" maxlength="600" ${enq?'':'required'} aria-describedby="${kind}-msg-e"></textarea><div class="err" id="${kind}-msg-e" aria-live="polite"></div></div>
    <p class="fnote">We ask only for what the office needs to reply. Please do not enter a child's date of birth, home address or ID numbers. ${enq?'Sending an enquiry does not guarantee admission. ':''}<a href="#privacy">Privacy notice</a></p>
    <div><button class="btn btn-red" type="submit">${enq?'Send enquiry':'Send message'}</button></div>
    <div id="${kind}-status" role="status" aria-live="polite"></div>
  </form>`;
}

function admissions(){
  const docs=SITE.documents.length?`<ul class="checks">${SITE.documents.map(d=>`<li>${ic('check',18)}${esc(d)}</li>`).join('')}</ul>`:`<div class="empty"><strong>Document list coming soon</strong>The school has not yet approved a list of required documents. Please ask the school office before you visit.</div>`;
  return `<div class="page">${head(CText('admissions_lead','Answers for parents and guardians who are thinking about admission.'),'','Admissions')}
  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><h2>Admission enquiries</h2><p>Contact the school office to ask about availability and eligibility. The office will tell you what applies to your child's class.</p></div><button type="button" class="btn btn-red" data-scroll="enq">Go to the enquiry form</button></div>
    <h3 style="margin-bottom:12px">Classes offered</h3>
    <ul class="chips">${(Array.isArray(SITE.classes)&&SITE.classes.length?SITE.classes:CLASSES).map(c=>`<li>${nc(c)}</li>`).join('')}</ul>
    <p class="fnote" style="margin-top:10px">${nc(CText('admissions_status_note','Intake for each class changes every year. Ask the office whether seats are open.'))}</p>
  </div></section>

  <section class="sec soft" aria-labelledby="proc"><div class="wrap">
    <div class="sec-h"><div><h2 id="proc">Admission process</h2><p>${nc('Admission process and steps approved by the school.')}</p></div></div>
    <ol class="steps">
      ${(Array.isArray(SITE.admissionsSteps)&&SITE.admissionsSteps.length?SITE.admissionsSteps:[{title:'Contact the school',desc:'Visit the office or send an enquiry through this website.'},{title:'Ask about availability and eligibility',desc:'Say which class your child is applying for.'},{title:'Collect the application form and document checklist',desc:'The office will give you the official form.'},{title:"Complete the school's process",desc:'Follow the steps the school sets for your child’s class.'},{title:'Receive confirmation from the school',desc:'Admission is confirmed only by the school itself.'}]).map(st=>`<li><div><strong>${nc(st.title||'')}</strong>${nc(st.desc||'')}</div></li>`).join('')}
    </ol>
  </div></section>

  <section class="sec" aria-labelledby="docs"><div class="wrap two">
    <div><h2 id="docs" style="margin-bottom:16px;font-size:28px">Required documents</h2>${docs}</div>
    <div class="grid" style="display:grid;gap:16px">
      <div class="card panel"><h3>${ic('calendar',22)}Admission dates</h3><p style="white-space:pre-line">${nc(CText('admissions_dates','No admission dates have been published. Dates will appear on the Notices page.'))}</p></div>
      <div class="card panel"><h3>${ic('info',22)}Fees</h3><p style="white-space:pre-line">${nc(CText('admissions_fees','Please ask the school office for current official fee information.'))}</p></div>
    </div>
  </div></section>

  <section class="sec tint" id="enq"><div class="wrap two" style="align-items:start">
    <div class="prose"><h2 style="margin-bottom:14px;font-size:30px">Send an enquiry</h2><p>Tell the office who you are and which class you are asking about. A member of staff will reply using the number you give.</p>
      <p class="fnote">${SITE.formEndpoint?'Your message goes to the school office.':'This form is not yet connected to the school office, so it will check your details and show you a summary to copy. Please contact the office directly until it is connected.'}</p></div>
    ${formHTML('enquiry')}
  </div></section></div>`;
}

function facilities(){
  const cards=SITE.facilities.map(f=>`<article class="card">${ph(f.title,'facility-'+f.id+'.jpg')}<span class="ico">${ic(f.icon,24)}</span><h3>${f.title}</h3><p>${nc(f.text)}</p></article>`).join('');
  return `<div class="page">${head(CText('facilities_lead','Spaces and amenities that support learning at the school.'),'','Facilities')}
  <section class="sec"><div class="wrap"><div class="fac">${cards}</div>
    <div class="ro note" style="margin-top:24px">${ic('info',20)}<span><strong>Review note.</strong> These items appear in school records but are not shown to the public until the school confirms each one: ${SITE.pendingFacilities.join(', ')}.</span></div>
  </div></section></div>`;
}

function staff(){
  const body=SITE.staff.length?`<div class="tiles">${SITE.staff.map(s=>`<div class="card panel">${s.photo?`<img src="${esc(s.photo)}" alt="${esc(s.name)}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;margin-bottom:12px">`:''}<h3>${esc(s.name)}</h3><p>${esc(s.role)}</p>${s.qualification?`<p class="fnote">${esc(s.qualification)}</p>`:''}</div>`).join('')}</div>`:`<div class="prose"><p>${nc('The school is taught by a team of teachers who work with children from pre-primary through Class 10, supported by administrative staff.')}</p><p>Individual profiles are not shown here. They will appear only after the school and each staff member approve what is published.</p></div>`;
  return `<div class="page">${head(CText('staff_lead','The people who teach and support learners every day.'),'','Teachers and Staff')}<section class="sec"><div class="wrap">${body}</div></section></div>`;
}

function studentLife(){
  return `<div class="page">${head('Student Life','Learning happens in the classroom, the library, the playground and at school events.','Student Life')}
  <section class="sec"><div class="wrap">
    <div class="tiles">${(Array.isArray(SITE.activities)?SITE.activities:[]).map(a=>`<div>${ph(a,a.toLowerCase().replace(/[^a-z]+/g,'-')+'.jpg')}<h3 style="font-size:17px;margin-top:10px">${nc(a)}</h3></div>`).join('')}</div>
    <div class="note" style="margin-top:28px">${ic('info',20)}<span>Only activities that really take place at the school will be published. Student photographs appear only with the school's authorisation and parental or guardian consent. We do not show student addresses or contact details.</span></div>
    <p style="margin-top:22px"><a class="more" href="#gallery">Go to the gallery ${ic('arrow',16)}</a></p>
  </div></section></div>`;
}

let local=[]; let galCat='All'; let lbIdx=-1;
function galItems(){return [...SITE.gallery,...local].filter(g=>galCat==='All'||g.category===galCat)}
function galleryGrid(){
  const items=galItems();
  if(!items.length) return `<div class="empty"><strong>The gallery is ready for photographs</strong>Approved school photographs will appear here, grouped by category. No stock images are used.</div>`;
  return `<div class="gal-grid">${items.map((g,i)=>`<figure style="margin:0"><button type="button" data-lb="${i}" aria-label="Enlarge photo: ${esc(g.alt)}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy">${g.caption?`<figcaption>${esc(g.caption)}</figcaption>`:''}</button></figure>`).join('')}</div>`;
}
function gallery(){
  return `<div class="page">${head('Gallery','Photographs from around the school, shared with permission.','Gallery')}
  <section class="sec"><div class="wrap">
    <div class="gal-tools" role="group" aria-label="Filter photographs by category">${['All',...SITE.galleryCategories].map(c=>`<button type="button" class="chip-b" data-gc="${esc(c)}" aria-pressed="${c===galCat}">${c}</button>`).join('')}</div>
    <div id="galGrid">${galleryGrid()}</div>
    <div class="card up ro" style="display:none"></div>
    <div class="card up">
      <h3>${ic('upload',20)} Try adding photographs</h3>
      <p class="fnote">Photos added here appear only on this device while this page is open, so staff can check how they will look. To publish them for everyone, add them to <code>SITE.gallery</code> as described in the <a href="#guide">Content guide</a>. Add only photographs that have consent.</p>
      <div class="row2"><div class="fld"><label for="upCat">Category</label><select id="upCat">${SITE.galleryCategories.map(c=>`<option>${c}</option>`).join('')}</select></div>
      <div class="fld"><label for="upCap">Caption <small>(optional)</small></label><input id="upCap" type="text" maxlength="120"></div></div>
      <div class="fld"><label for="upFiles">Choose photographs</label><input id="upFiles" type="file" accept="image/*" multiple></div>
      <div id="upStatus" role="status" aria-live="polite" class="fnote"></div>
    </div>
  </div></section></div>`;
}

let nCat='All';
function noticesPage(){
  const all=[...SITE.notices].sort((a,b)=>(b.date||'9').localeCompare(a.date||'9'));
  const cutoff=new Date();cutoff.setFullYear(cutoff.getFullYear()-1);
  const recent=all.filter(n=>!n.date||new Date(n.date)>=cutoff).filter(n=>nCat==='All'||n.category===nCat);
  const arch=all.filter(n=>n.date&&new Date(n.date)<cutoff).filter(n=>nCat==='All'||n.category===nCat);
  const item=n=>`<li><details><summary><div>${n.draft?'<span class="badge">Draft</span>':''}<span class="badge cat">${esc(n.category)}</span><h3>${esc(n.title)}</h3><small>${esc(fmtDate(n.date))}</small></div>${ic('chev',20)}</summary><div class="body">${n.summary?`<p><strong>${esc(n.summary)}</strong></p>`:''}<p style="margin-top:10px;white-space:pre-line">${esc(n.body)}</p>${n.file?`<p style="margin-top:12px"><a class="btn btn-line btn-sm" href="${esc(n.file)}" target="_blank" rel="noopener">Open attachment</a></p>`:''}${n.draft?'<p class="fnote" style="margin-top:10px">Not an official notice yet.</p>':''}</div></details></li>`;
  return `<div class="page">${head('Notices and Announcements','Official communications from the school office.','Notices')}
  <section class="sec"><div class="wrap">
    <div class="gal-tools" role="group" aria-label="Filter notices by category">${['All',...SITE.noticeCategories].map(c=>`<button type="button" class="chip-b" data-nc="${esc(c)}" aria-pressed="${c===nCat}">${c}</button>`).join('')}</div>
    <h2 style="font-size:24px;margin-bottom:14px">Recent notices</h2>
    ${recent.length?`<ul class="nl">${recent.map(item).join('')}</ul>`:`<div class="empty"><strong>No notices in this category</strong>Check another category or come back later.</div>`}
    ${arch.length?`<h2 style="font-size:24px;margin:36px 0 14px">Archive</h2><ul class="nl">${arch.map(item).join('')}</ul>`:''}
    <p class="fnote" style="margin-top:24px">The school publishes examination dates, holidays and admission deadlines here only after they are final.</p>
  </div></section></div>`;
}

function faq(){
  return `<div class="page">${head('Parent Information and FAQ','Quick answers to common questions.','FAQ')}
  <section class="sec"><div class="wrap"><div class="faq">${(Array.isArray(SITE.faqs)?SITE.faqs:[]).map(f=>`<details><summary>${f.q}${ic('chev',20)}</summary><div class="body"><p>${nc(f.a)}</p>${f.link?`<p style="margin-top:8px"><a href="${f.link[0]}">${f.link[1]}</a></p>`:''}</div></details>`).join('')}</div></div></section></div>`;
}

function contact(){
  const c=SITE.contact;
  return `<div class="page">${head('Contact','Find the school and reach the office.','Contact')}
  <section class="sec"><div class="wrap contact-grid">
    <div class="card cinfo">
      <div class="it">${ic('pin',22)}<div><h3>School address</h3><address style="font-style:normal">Ideal English School, Dholai Bazar<br>Village: ${A.village}<br>Post Office: ${A.po}<br>District: ${A.district}<br>State: ${A.state}<br>PIN: ${A.pin}<br>${A.country}</address></div></div>
      <div class="it">${ic('phone',22)}<div><h3>Telephone</h3>${c.phone?`<span>${esc(c.phone)}</span>`:'<span class="tbd">To be added once the school verifies its number.</span>'}</div></div>
      <div class="it">${ic('mail',22)}<div><h3>Email</h3>${c.email?`<span>${esc(c.email)}</span>`:'<span class="tbd">To be added once the school verifies its address.</span>'}</div></div>
      ${c.officeHours?`<div class="it">${ic('calendar',22)}<div><h3>Office hours</h3><span style="white-space:pre-line">${esc(c.officeHours)}</span></div></div>`:''}
      <div class="it">${ic('calendar',22)}<div><h3>Admission enquiries</h3><span>Ask the school office about availability and eligibility. See the <a href="#admissions"><strong>Admissions</strong></a> page.</span></div></div>
      <div><a class="btn btn-navy" href="${mapUrl}" target="_blank" rel="noopener">${ic('pin',18)} Open in Google Maps</a><p class="fnote" style="margin-top:8px">The link searches for the school by name and address. It does not use a fixed map pin.</p></div>
    </div>
    ${formHTML('contact')}
  </div></section></div>`;
}

function privacy(){
  return `<div class="page">${head('Privacy Notice','How this website treats personal information.','Privacy')}
  <section class="sec"><div class="wrap"><div class="prose">
    <h2 style="font-size:24px;margin-bottom:10px">What we collect</h2>
    <p>The enquiry and contact forms ask for a name, a contact number, an optional email address, and the class a child is interested in. We ask for nothing else, and we ask you not to enter a child's date of birth, home address or identity numbers.</p>
    <h2 style="font-size:24px;margin:24px 0 10px">How it is used</h2>
    <p>Details are used only so the school office can reply to your question. ${SITE.formEndpoint?'':'Right now the forms are not connected to a service, so nothing is sent or stored by this website.'}</p>
    <h2 style="font-size:24px;margin:24px 0 10px">Children's photographs</h2>
    <p>Photographs of students are published only with the school's authorisation and parental or guardian consent where required. We do not publish student contact details or private records, and we do not publish public student lists or results.</p>
    <h2 style="font-size:24px;margin:24px 0 10px">Questions</h2>
    <p>Ask the school office. ${nc('The school will add the name of the person responsible for privacy questions.')}</p>
  </div></div></section></div>`;
}

function guide(){
  const code=s=>`<code style="background:var(--tint);padding:2px 6px;border-radius:4px;font-size:.92em">${s}</code>`;
  return `<div class="page">${head('Content Guide for School Staff','How to keep this website up to date.','Content Guide')}
  <section class="sec"><div class="wrap"><div class="prose">
    <h2 style="font-size:24px;margin-bottom:10px">Where content lives</h2>
    <p>All text, notices, FAQs and contact details are stored in one block called ${code('SITE')} near the top of the page's script. Pages are built from it, so changing the block changes the website.</p>
    <h2 style="font-size:24px;margin:24px 0 10px">Common updates</h2>
    <ul style="padding-left:20px;display:grid;gap:8px">
      <li><strong>Add a notice.</strong> Add an item to ${code('SITE.notices')} with a title, a date written as YYYY-MM-DD, a category, a summary, a body, and a PDF link in ${code('file')} when you have one. Remove ${code('draft:true')} once the notice is approved.</li>
      <li><strong>Contact details.</strong> Fill in ${code('SITE.contact.phone')} and ${code('SITE.contact.email')} after the school has verified them.</li>
      <li><strong>Admission documents.</strong> List the approved items in ${code('SITE.documents')}.</li>
      <li><strong>Figures.</strong> Set ${code('SITE.stats.show')} to true and fill in ${code('asOf')} only when the numbers are confirmed.</li>
      <li><strong>Photographs.</strong> Add an item to ${code('SITE.gallery')} with ${code('src')}, ${code('alt')}, ${code('caption')}, ${code('category')} and ${code('date')}. To replace a caption or remove a photo, edit or delete its item. Use only photos with the right consent.</li>
      <li><strong>Staff profiles.</strong> Add approved people to ${code('SITE.staff')}.</li>
      <li><strong>Forms.</strong> Put the address of the school's form service in ${code('SITE.formEndpoint')}. Until then, forms only check the details.</li>
    </ul>
    <h2 style="font-size:24px;margin:24px 0 10px">Before going live</h2>
    <p>Turn off review marks, confirm every item marked &#9670;, and check that no placeholder photograph remains. Items to prepare for a full deployment: a sitemap, a robots file and a web address for the school.</p>
  </div></div></section></div>`;
}

const PAGES={
  home:{t:'Home',fn:home,kw:'welcome hero school'},
  about:{t:'About Us',fn:about,kw:'overview vision mission values'},
  history:{t:'Our History',fn:history,kw:'founded 1999 principal'},
  academics:{t:'Academics',fn:academics,kw:'pre-primary primary secondary classes curriculum board'},
  admissions:{t:'Admissions',fn:admissions,kw:'admission enquiry apply documents fees process'},
  facilities:{t:'Facilities',fn:facilities,kw:'classrooms library playground water computer toilets'},
  staff:{t:'Teachers and Staff',fn:staff,kw:'teachers principal'},
  'student-life':{t:'Student Life',fn:studentLife,kw:'activities sports culture'},
  gallery:{t:'Gallery',fn:gallery,kw:'photos pictures'},
  notices:{t:'Notices and Announcements',fn:noticesPage,kw:'circular holiday exam'},
  faq:{t:'Parent FAQ',fn:faq,kw:'questions answers'},
  contact:{t:'Contact',fn:contact,kw:'address map phone email location'},
  privacy:{t:'Privacy Notice',fn:privacy,kw:'data children photographs'},
  guide:{t:'Content Guide',fn:guide,kw:'update edit staff'}
};
const NAV=[
  {k:'home',l:'Home'},
  {k:'about',l:'About Us',sub:[['about','Overview'],['history','Our History'],['staff','Teachers and Staff']]},
  {k:'academics',l:'Academics'},
  {k:'admissions',l:'Admissions'},
  {k:'facilities',l:'Facilities',sub:[['facilities','Campus Facilities'],['student-life','Student Life']]},
  {k:'gallery',l:'Gallery'},
  {k:'notices',l:'Notices',sub:[['notices','All Notices'],['faq','Parent FAQ']]},
  {k:'contact',l:'Contact'}
];

/* ---------------- shell ---------------- */
let route='home';
function buildNav(){
  const on=(n)=>route===n.k||(n.sub&&n.sub.some(s=>s[0]===route));
  $('#dnavList').innerHTML=NAV.map(n=>n.sub?
    `<li><a class="lnk" href="#${n.k}" ${on(n)?'aria-current="page"':''} aria-haspopup="true">${n.l}${ic('chev',14)}</a><ul class="sub">${n.sub.map(s=>`<li><a href="#${s[0]}" ${route===s[0]?'aria-current="page"':''}>${s[1]}</a></li>`).join('')}</ul></li>`:
    `<li><a class="lnk" href="#${n.k}" ${on(n)?'aria-current="page"':''}>${n.l}</a></li>`).join('');
  $('#mnavList').innerHTML=NAV.map(n=>`<li><a href="#${n.k}" ${on(n)?'aria-current="page"':''}>${n.l}</a>${n.sub?`<ul class="sub">${n.sub.map(s=>`<li><a href="#${s[0]}" ${route===s[0]?'aria-current="page"':''}>${s[1]}</a></li>`).join('')}</ul>`:''}</li>`).join('');
}
function buildFooter(){
  $('#footer').innerHTML=`<div class="wrap f-top">
    <div class="f-brand"><div class="chip"><img data-logo alt="Ideal English School emblem"></div><div class="nm">${esc(SITE.name||'Ideal English School, Dholai Bazar')}</div>
      <p>Sadagram, Dholai, Cachar, Assam &ndash; ${A.pin}</p>
      <p>${nc(CText('footer_about','An English-medium, co-educational school serving children from pre-primary through Class 10.'))}</p>
      <p class="f-tag">${nc(CText('footer_tagline','Learning Today, Building Tomorrow.'))}</p></div>
    <div><h3>Quick links</h3><ul><li><a href="#about">About Us</a></li><li><a href="#academics">Academics</a></li><li><a href="#admissions">Admissions</a></li><li><a href="#facilities">Facilities</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#notices">Notices</a></li><li><a href="#contact">Contact</a></li></ul></div>
    <div><h3>For parents</h3><ul><li><a href="#admissions">Admission enquiry</a></li><li><a href="#faq">FAQ</a></li><li><a href="#student-life">Student life</a></li><li><a href="#staff">Teachers and staff</a></li><li><a href="#guide">Content guide (staff)</a></li></ul></div>
    <div><h3>Contact</h3><ul class="fc">
      <li>${ic('pin',18)}<span>Vill Sadagram, PO Dholai, District Cachar, Assam ${A.pin}</span></li>
      <li>${ic('phone',18)}<span class="${SITE.contact.phone?'':'tbd'}">${SITE.contact.phone?esc(SITE.contact.phone):'Number to be added'}</span></li>
      <li>${ic('mail',18)}<span class="${SITE.contact.email?'':'tbd'}">${SITE.contact.email?esc(SITE.contact.email):'Email to be added'}</span></li></ul></div>
  </div>
  <div class="f-bot"><div class="wrap"><span>&copy; ${new Date().getFullYear()} Ideal English School, Dholai Bazar. All rights reserved.</span><span class="links"><a href="#privacy">Privacy policy</a><a href="${mapUrl}" target="_blank" rel="noopener">Find us on the map</a></span></div></div>`;
}

function render(){
  const h=(location.hash||'#home').slice(1);
  route=PAGES[h]?h:'home';
  const p=PAGES[route];
  $('#main').innerHTML=p.fn();
  document.title=(route==='home'?'Ideal English School, Dholai Bazar':`${p.t} | Ideal English School, Dholai Bazar`);
  buildNav();
  setLogos();
  closeMenu();
  window.scrollTo(0,0);
  const first=$('#main h1'); if(first&&!introOn){$('#main').focus({preventScroll:true})}
  bindPage();
}
function setLogos(){$$('img[data-logo]').forEach(i=>{if(i.getAttribute('src')!==LOGO)i.src=LOGO})}

/* menu */
function closeMenu(){const m=$('#mnav');if(!m||m.hidden)return;m.hidden=true;$('#menuBtn').setAttribute('aria-expanded','false');$('#menuBtn').setAttribute('aria-label','Open menu');$('#mIc').innerHTML=ic('menu',24)}
function toggleMenu(){const m=$('#mnav');const open=m.hidden;m.hidden=!open;$('#menuBtn').setAttribute('aria-expanded',String(open));$('#menuBtn').setAttribute('aria-label',open?'Close menu':'Open menu');$('#mIc').innerHTML=ic(open?'x':'menu',24)}

/* forms */
function bindForm(kind){
  const f=$('#f-'+kind); if(!f)return;
  const status=$('#'+kind+'-status');
  const setErr=(id,msg)=>{const el=$('#'+kind+'-'+id)||$('#enquiry-'+id);const e=$('#'+(el?el.id:'')+'-e');if(!el)return;el.setAttribute('aria-invalid',msg?'true':'false');if(e)e.textContent=msg||''};
  f.addEventListener('submit',async ev=>{
    ev.preventDefault();
    const d=Object.fromEntries(new FormData(f));
    if(d.website){return}
    let bad=null;const chk=(id,cond,msg)=>{setErr(id,cond?'':msg);if(!cond&&!bad)bad=id};
    const phone=(d.phone||'').replace(/[\s-]/g,'');
    chk('name',(d.name||'').trim().length>1,kind==='enquiry'?"Enter the parent or guardian's name.":'Enter your name.');
    if(kind==='enquiry'){chk('student',(d.student||'').trim().length>1,"Enter the student's name.");chk('class',!!d.cls,'Choose the class you are asking about.')}
    chk('phone',/^(\+91|0)?[6-9]\d{9}$/.test(phone),'Enter a 10-digit mobile number, for example 98765 43210.');
    chk('email',!d.email||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email),'Enter an email like name@example.com, or leave it empty.');
    if(kind==='contact')chk('msg',(d.msg||'').trim().length>2,'Write a short message.');
    if(bad){status.innerHTML='<div class="status bad"><strong>Please fix the highlighted fields.</strong></div>';const el=$('#'+(bad==='class'?'enquiry-class':bad==='student'?'enquiry-student':kind+'-'+bad));el&&el.focus();return}
    const summary=[`${kind==='enquiry'?'Admission enquiry':'Message'} for ${SITE.name}`,`Name: ${d.name}`,d.student?`Student: ${d.student}`:'',d.cls?`Class: ${d.cls}`:'',`Phone: ${d.phone}`,d.email?`Email: ${d.email}`:'',d.msg?`Message: ${d.msg}`:''].filter(Boolean).join('\n');
    if(SITE.formEndpoint){
      status.innerHTML='<div class="status">Sending...</div>';
      try{const r=await fetch(SITE.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,...d})});if(!r.ok)throw 0;f.reset();status.innerHTML='<div class="status"><strong>Thank you. The school office has your message.</strong>They will reply using the number you gave. An enquiry does not guarantee admission.</div>'}
      catch(e){status.innerHTML='<div class="status bad"><strong>Your message was not sent.</strong>Please try again, or contact the school office directly.</div>'}
      return;
    }
    status.innerHTML=`<div class="status"><strong>Details checked. Not sent.</strong><span>This website is not connected to the school office yet. Please copy this summary and share it with the office, or visit in person.</span><textarea readonly id="${kind}-sum" aria-label="Enquiry summary">${esc(summary)}</textarea><div><button type="button" class="btn btn-navy btn-sm" id="${kind}-copy">Copy summary</button> <span id="${kind}-cm" class="fnote"></span></div></div>`;
    $('#'+kind+'-copy').onclick=async()=>{const t=$('#'+kind+'-sum');try{await navigator.clipboard.writeText(t.value);$('#'+kind+'-cm').textContent='Copied.'}catch(e){t.focus();t.select();$('#'+kind+'-cm').textContent='Press Ctrl+C or long-press to copy.'}};
  });
}

/* gallery */
function bindGallery(){
  const refresh=()=>{$('#galGrid').innerHTML=galleryGrid();$$('[data-gc]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gc===galCat)))};
  $$('[data-gc]').forEach(b=>b.onclick=()=>{galCat=b.dataset.gc;refresh()});
  const inp=$('#upFiles');
  if(inp)inp.onchange=()=>{
    const cat=$('#upCat').value,cap=$('#upCap').value.trim();let n=0;
    [...inp.files].filter(f=>f.type.startsWith('image/')).forEach(f=>{const r=new FileReader();r.onload=()=>{local.push({src:r.result,alt:cap||'School photograph, '+cat,caption:cap,category:cat,date:''});n++;galCat='All';refresh();$('#upStatus').textContent=n+' photograph'+(n>1?'s':'')+' added for preview on this device.'};r.readAsDataURL(f)});
    inp.value='';
  };
  $('#galGrid').onclick=e=>{const b=e.target.closest('[data-lb]');if(b)openLb(+b.dataset.lb,b)};
}
let lbOpener=null;
function openLb(i,opener){
  lbOpener=opener;lbIdx=i;const items=galItems();
  const o=$('#overlay');
  const paint=()=>{const g=items[lbIdx];o.innerHTML=`<div class="lb" role="dialog" aria-modal="true" aria-label="Photo viewer"><div class="top"><button type="button" id="lbX" aria-label="Close photo viewer">${ic('x',22)}</button></div><div class="stage"><button type="button" id="lbP" aria-label="Previous photo">${ic('left',24)}</button><img src="${esc(g.src)}" alt="${esc(g.alt)}"><button type="button" id="lbN" aria-label="Next photo">${ic('right',24)}</button></div><div class="cap">${esc(g.caption||g.alt)} (${lbIdx+1} of ${items.length})</div></div>`;
    $('#lbX').onclick=closeOverlay;$('#lbP').onclick=()=>{lbIdx=(lbIdx-1+items.length)%items.length;paint();$('#lbP').focus()};$('#lbN').onclick=()=>{lbIdx=(lbIdx+1)%items.length;paint();$('#lbN').focus()};};
  paint();$('#lbX').focus();
}
function closeOverlay(){$('#overlay').innerHTML='';lbIdx=-1;if(lbOpener&&document.contains(lbOpener))lbOpener.focus();lbOpener=null;$('#searchBtn').dataset.open=''}

/* notices filter + scroll buttons */
function bindPage(){
  bindForm('enquiry');bindForm('contact');
  if(route==='gallery')bindGallery();
  if(route==='notices')$$('[data-nc]').forEach(b=>b.onclick=()=>{nCat=b.dataset.nc;const y=scrollY;$('#main').innerHTML=noticesPage();bindPage();window.scrollTo(0,y)});
  $$('[data-scroll]').forEach(b=>b.onclick=()=>{const t=document.getElementById(b.dataset.scroll);if(t){t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});const i=t.querySelector('input');i&&setTimeout(()=>i.focus({preventScroll:true}),400)}});
}

/* search */
function openSearch(){
  const o=$('#overlay');
  o.innerHTML=`<div class="search" role="dialog" aria-modal="true" aria-label="Search"><div class="box"><form id="sForm" role="search"><span aria-hidden="true">${ic('search',20)}</span><label class="sr" for="sQ">Search this website</label><input id="sQ" type="search" placeholder="Search pages, notices and FAQs" autocomplete="off"><button type="button" class="x" id="sX" aria-label="Close search">${ic('x',20)}</button></form><div id="sRes" aria-live="polite"></div></div></div>`;
  const idx=[...Object.entries(PAGES).filter(([k])=>!['guide','privacy'].includes(k)).map(([k,p])=>({t:p.t,h:'#'+k,s:'Page',k:p.kw})),...SITE.faqs.map(f=>({t:f.q,h:'#faq',s:'FAQ',k:f.a})),...SITE.notices.map(n=>({t:n.title,h:'#notices',s:'Notice',k:n.summary}))];
  const run=()=>{const q=$('#sQ').value.trim().toLowerCase();const r=$('#sRes');if(!q){r.innerHTML='<p class="none">Type a word such as admission, library or address.</p>';return}
    const words=q.split(/\s+/);const hit=idx.filter(i=>{const s=(i.t+' '+i.k).toLowerCase();return words.every(w=>s.includes(w))}).slice(0,8);
    r.innerHTML=hit.length?`<ul>${hit.map(i=>`<li><a href="${i.h}"><span>${esc(i.t)}</span><small>${i.s}</small></a></li>`).join('')}</ul>`:'<p class="none">Nothing found. Try a shorter word.</p>'};
  $('#sQ').oninput=run;run();$('#sForm').onsubmit=e=>{e.preventDefault();const a=$('#sRes a');if(a){a.click()}};
  $('#sX').onclick=closeOverlay;$('#sQ').focus();
  o.onclick=e=>{if(e.target.closest('a'))closeOverlay();else if(e.target.classList.contains('search'))closeOverlay()};
}

/* intro: emblem only, about 5 seconds, click or key to skip */
let introOn=true;
function startIntro(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let done=false;
  const end=()=>{if(done)return;done=true;const i=$('#intro');i.classList.add('leave');setTimeout(()=>{i.remove();introOn=false;const a=$('#app');a.removeAttribute('aria-hidden');a.inert=false;$('#main').focus({preventScroll:true})},reduce?20:450)};
  $('#intro').addEventListener('click',end);
  addEventListener('keydown',e=>{if(introOn&&(e.key==='Escape'||e.key==='Enter'||e.key===' ')){e.preventDefault();end()}});
  setTimeout(end,reduce?0:900);
}

/* init */
function init(){
  $('#sIc').innerHTML=ic('search',18);$('#mIc').innerHTML=ic('menu',24);
  $('#tIc').innerHTML=ic('sun',18);
  $('#app').inert=true;
  buildFooter();
  render();
  addEventListener('hashchange',render);
  $('#menuBtn').onclick=toggleMenu;
  addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#overlay').innerHTML)closeOverlay();else closeMenu()}
    if(lbIdx>=0){const g=galItems();if(e.key==='ArrowRight'){$('#lbN')&&$('#lbN').click()}if(e.key==='ArrowLeft'){$('#lbP')&&$('#lbP').click()}}});
  $('#searchBtn').onclick=openSearch;
  $('#themeBtn').onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dark?'light':'dark'};
  let rv=true;$('#rvBtn').onclick=()=>{rv=!rv;document.body.classList.toggle('review',rv);$('#rvBtn').textContent=rv?'Hide review marks':'Show review marks';$('#rvBtn').setAttribute('aria-pressed',String(rv))};
  if(SITE.live){const db=$('#draftbar');if(db)db.remove()}else{document.body.classList.add('review')}
  if(SITE.alert){const a=document.createElement('div');a.className='alertbar';a.setAttribute('role','status');
    a.innerHTML=`<div class="wrap"><span>${ic('bell',18)}${SITE.alert.link?`<a href="${esc(SITE.alert.link)}">${esc(SITE.alert.text)}</a>`:esc(SITE.alert.text)}</span></div>`;
    $('#app').prepend(a)}
  $('#main').addEventListener('click',()=>{});
  setLogos();
  startIntro();
}
/* Wait for the CMS request (bounded by the 8-second fetch timeout) before first render.
   This prevents a slow connection from rendering hardcoded content and then ignoring late CMS data. */
(function boot(){
  const ready=window.CMS_READY||Promise.resolve(null);
  ready.catch(e=>{console.warn('CMS load failed',e); return null;}).then(d=>{
    try { if(d && window.CMS_APPLY) window.CMS_APPLY(SITE,d); }
    catch(e) { console.error('CMS apply failed',e); }
    init();
    dispatchEvent(new Event('cms-ready'));
  });
})();

(function(){
  var ov=document.getElementById('overlay'),x=null,y=null;
  if(ov){
    ov.addEventListener('touchstart',function(e){if(e.touches.length===1){x=e.touches[0].clientX;y=e.touches[0].clientY}else{x=null}},{passive:true});
    ov.addEventListener('touchend',function(e){if(x===null)return;var t=e.changedTouches[0],dx=t.clientX-x,dy=t.clientY-y;x=null;
      if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){var b=document.getElementById(dx<0?'lbN':'lbP');if(b)b.click()}},{passive:true});
  }
  var bar=document.createElement('div');bar.id='mbar';bar.hidden=true;
  function setBar(){
    var ph=(typeof SITE!=='undefined'&&SITE.contact&&SITE.contact.phone)?String(SITE.contact.phone):'';
    var tel=ph.replace(/[^0-9+]/g,'');
    bar.innerHTML='<a class="btn btn-red" href="#admissions">Admission Enquiry</a>'+(tel?'<a class="btn btn-line" href="tel:'+tel+'">Call the School</a>':'<a class="btn btn-line" href="#contact">School Contact</a>');
  }
  setBar();addEventListener('cms-ready',setBar);
  document.body.appendChild(bar);
  function upd(){var h=(location.hash||'#home').replace('#','');var hide=(h==='admissions'||h==='contact');bar.hidden=hide;document.body.classList.toggle('hasbar',!hide)}
  addEventListener('hashchange',upd);upd();
  addEventListener('resize',function(){var m=document.getElementById('mnav'),b=document.getElementById('menuBtn');if(innerWidth>=1280&&m&&!m.hidden&&b)b.click()});
})();

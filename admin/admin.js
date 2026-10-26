(() => {
const URL_ = "https://dwgkbkjhasuekqezjsiy.supabase.co", KEY = "sb_publishable_Xp9VvpM_zp776di4YBCOxw_SIkwft_a";
const sb = supabase.createClient(URL_, KEY);
// A second, signed-out client: it sees the database the way a website visitor does.
const anon = supabase.createClient(URL_, KEY, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, storageKey: 'anon-check' } });
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => {
  const e = document.createElement(t);
  for (const k in a) { const v = a[k]; if (k === 'class') e.className = v; else if (k in e) e[k] = v; else e.setAttribute(k, v); }
  c.flat(9).filter(x => x != null && x !== false).forEach(x => e.append(x));
  return e;
};
const nice = m => /row-level|permission denied|violates/i.test(m) ? 'Not allowed yet. Run setup.sql in Supabase (SQL Editor), then try again.'
  : /does not exist|schema cache|unique or exclusion|Could not find|bucket not found/i.test(m) ? 'The database is not ready. Run setup.sql in Supabase (SQL Editor), then try again.' : m;
const toast = (m, bad) => { if (bad) { const raw = String(m), n = nice(raw); m = n === raw ? raw : n + ' (' + raw + ')'; } const t = $('#toast'); t.textContent = m; t.className = 'show' + (bad ? ' bad' : ''); clearTimeout(toast.t); toast.t = setTimeout(() => t.className = '', 3500); };
const g = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
const parse = s => { try { return JSON.parse(s); } catch { return null; } };
const rid = () => 'x' + Math.random().toString(36).slice(2, 7);
const main = $('#main');
let dirty = false, prev = location.hash;
main.addEventListener('input', () => dirty = true);
addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
let D = {}; // built-in website content, read from ../js/main.js so empty forms start with what the site already shows

async function loadDefaults() {
  try {
    const t = await (await fetch('../js/main.js')).text();
    D = new Function('return ' + t.match(/const SITE=(\{[\s\S]*?\n\});/)[1])();
  } catch (e) { console.warn('Could not read built-in content', e); }
}

/* Save page text: update or insert each key, and treat "0 rows changed" as a failure (that is how blocked saves look). */
async function saveRows(rows) {
  const { data, error } = await sb.from('site_content').select('content_key');
  if (error) return error;
  const have = new Set(data.map(r => r.content_key));
  const fresh = rows.filter(r => !have.has(r.content_key));
  if (fresh.length) { const { error } = await sb.from('site_content').insert(fresh); if (error) return error; }
  for (const r of rows.filter(r => have.has(r.content_key))) {
    const { data: d, error } = await sb.from('site_content').update({ content_value: r.content_value }).eq('content_key', r.content_key).select('content_key');
    if (error) return error;
    if (!(d && d.length)) return { message: 'row-level security blocked the save' };
  }
}

/* ---------- uploads (images are shrunk to 1600px WebP first) ---------- */
async function shrink(f) {
  const b = await createImageBitmap(f), s = Math.min(1, 1600 / Math.max(b.width, b.height));
  const c = document.createElement('canvas'); c.width = b.width * s; c.height = b.height * s;
  c.getContext('2d').drawImage(b, 0, 0, c.width, c.height);
  const bl = await new Promise(r => c.toBlob(r, 'image/webp', .82));
  return bl ? new File([bl], f.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' }) : f;
}
async function upload(file, folder) {
  if (/^image\/(jpeg|png|webp)$/.test(file.type)) file = await shrink(file);
  const p = `${folder}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_')}`;
  const { error } = await sb.storage.from('school-media').upload(p, file, { contentType: file.type });
  if (error) throw error;
  return sb.storage.from('school-media').getPublicUrl(p).data.publicUrl;
}

/* ---------- field builder: mk(field, value) -> {el, get()} ---------- */
function mk(f, v) {
  const T = f.t || 'text', lab = c => h('label', {}, h('span', {}, f.l), c, f.n && h('small', {}, f.n));
  if (T === 'area' || T === 'list') {
    const i = h('textarea', { rows: f.r || (T === 'list' ? 6 : 4), placeholder: f.p || '' });
    i.value = T === 'list' ? (Array.isArray(v) ? v : []).map(x => x && typeof x === 'object' ? x.title || '' : x).join('\n') : (v ?? '');
    return { el: lab(i), get: () => T === 'list' ? i.value.split('\n').map(s => s.trim()).filter(Boolean) : i.value.trim() };
  }
  if (T === 'sel' || T === 'yn') {
    const o = (T === 'yn' ? [['no', 'No'], ['yes', 'Yes']] : typeof f.o === 'function' ? f.o() : f.o).map(x => Array.isArray(x) ? x : [x, x]);
    const i = h('select', {}, o.map(([a, b]) => h('option', { value: a }, b)));
    i.value = o.some(x => x[0] === v) ? v : o[0][0];
    return { el: lab(i), get: () => i.value };
  }
  if (T === 'chk') {
    const i = h('input', { type: 'checkbox', checked: v == null ? !!f.def : !!v });
    return { el: h('label', { class: 'chk' }, i, f.l), get: () => i.checked };
  }
  if (T === 'img' || T === 'file') {
    const u = h('input', { type: 'text', placeholder: 'Paste a link, or upload below', value: v || '' }), pv = h('img', { class: 'pv', alt: '' });
    const sync = () => { const ok = /^https?:/.test(u.value); if (ok) pv.src = u.value; pv.hidden = T === 'file' || !ok; };
    const fi = h('input', { type: 'file', accept: T === 'img' ? 'image/*' : '.pdf,image/*', onchange: async () => {
      const x = fi.files[0]; if (!x) return;
      try { toast('Uploading...'); u.value = await upload(x, f.k || 'misc'); sync(); toast('Uploaded. Save to keep it.'); } catch (e) { toast(e.message, 1); }
      fi.value = '';
    } });
    u.oninput = sync; sync();
    return { el: lab(h('div', { class: 'imgf' }, pv, u, fi)), get: () => u.value.trim() };
  }
  if (T === 'objs') {
    const box = h('div');
    const add = o => {
      if (typeof o === 'string') o = { [f.str || 'title']: o };
      o = o || {};
      const subs = f.f.map(s => ({ s, ...mk(s, o[s.k]) }));
      const nm = () => String(subs[0].get() || '').trim() || 'New ' + f.item.toLowerCase();
      const ttl = h('span', { class: 'ttl' }, nm());
      const btn = (t, c, fn, tip) => h('button', { type: 'button', class: c, title: tip, onclick: e => { e.preventDefault(); e.stopPropagation(); fn(); } }, t);
      const it = h('details', { class: 'item', open: !Object.keys(o).length }, h('summary', {}, ttl,
        btn('\u2191', '', () => it.previousElementSibling && box.insertBefore(it, it.previousElementSibling), 'Move up'),
        btn('\u2193', '', () => it.nextElementSibling && box.insertBefore(it.nextElementSibling, it), 'Move down'),
        btn('Remove', 'del', () => confirm('Remove this ' + f.item.toLowerCase() + '?') && it.remove(), 'Remove')),
        h('div', { class: 'g' }, subs.map(x => x.el)));
      it.addEventListener('input', () => ttl.textContent = nm());
      it._id = o.id;
      it._g = () => { const r = Object.fromEntries(subs.map(x => [x.s.k, x.get()])); if (f.id) r.id = it._id || (it._id = rid()); return r; };
      box.append(it);
    };
    (Array.isArray(v) ? v : []).forEach(add);
    return { el: h('div', { class: 'grp' }, h('h3', {}, f.l), f.n && h('small', {}, f.n), box, h('button', { type: 'button', onclick: () => add({}) }, '+ Add ' + f.item.toLowerCase())), get: () => [...box.children].map(e => e._g()) };
  }
  if (T === 'obj') {
    const subs = f.f.map(s => ({ s, ...mk(s, (v || {})[s.k]) }));
    return { el: h('div', { class: 'grp' }, h('h3', {}, f.l), h('div', { class: 'g' }, subs.map(x => x.el))), get: () => Object.fromEntries(subs.map(x => [x.s.k, x.get()])) };
  }
  const i = h('input', { type: T === 'number' ? 'number' : T === 'date' ? 'date' : 'text', placeholder: f.p || '', value: v ?? '' });
  return { el: lab(i), get: () => { const x = i.value.trim(); return (T === 'date' || T === 'number') && x === '' ? null : T === 'number' ? +x : x; } };
}

/* ---------- page content structure: every section below is one admin page ---------- */
const x = (k, l, o = {}) => ({ k, l, ...o }), A = (k, l, o = {}) => ({ k, l, t: 'area', ...o });
const ICONS = ['building', 'book', 'ball', 'drop', 'laptop', 'users', 'bolt', 'pencil'];
const CL = ['Pre-primary', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const DV = {
  hero_badge: 'Pre-primary to Class 10 \u00b7 Co-educational', hero_heading: 'A Strong Foundation for a Brighter Future.',
  hero_lead: 'Ideal English School provides an English-medium learning environment where students are encouraged to develop knowledge, confidence, discipline, and a lifelong love of learning.',
  hero_cta1_text: 'Explore Our School', hero_cta1_link: '#about', hero_cta2_text: 'Admission Enquiry', hero_cta2_link: '#admissions',
  welcome_heading: 'Welcome to Ideal English School',
  welcome_text: 'Ideal English School, Dholai Bazar, is a co-educational school located in Sadagram, Dholai, Cachar, Assam. The school serves learners from pre-primary through Class 10, with an emphasis on learning, personal development, and preparation for the next stages of education.',
  site_medium: 'English', site_classes_summary: 'Pre-primary to Class 10', site_location_summary: 'Dholai Bazar, Cachar, Assam',
  about_lead: 'Ideal English School, Dholai Bazar is a co-educational school in Sadagram, Dholai, Cachar, Assam.',
  about_overview: 'The school is in the village of Sadagram, under Dholai Post Office in Cachar district, Assam. It serves learners from pre-primary through Class 10 and has done so since 1999.',
  history_lead: 'The story of how Ideal English School began.',
  site_history: { founder: 'Sir Tapu Dev and his team', principal: 'Mr. Jadupati Biswas (M.A.)', vp: 'Mrs. Tara Yadav', milestones: [{ year: '1999', desc: 'Ideal English School, Dholai Bazar is established.' }] },
  academics_lead: 'From the first year in school to Class 10, learning is organised in four stages.',
  academics_board_note: 'The examination board for Class 10 and the list of subjects will be added after the school confirms them. Please ask the school office for current details.',
  admissions_lead: 'Answers for parents and guardians who are thinking about admission.',
  admissions_status_note: "Contact the school office to ask about availability and eligibility. The office will tell you what applies to your child's class.",
  admissions_dates: 'No admission dates have been published. Dates will appear on the Notices page.',
  admissions_fees: 'Please ask the school office for current official fee information. This website shows no fee amounts until the school approves a schedule.',
  facilities_lead: 'Spaces and amenities that support learning at the school.', staff_lead: 'The people who teach and support learners every day.',
  student_life_lead: 'Learning happens in the classroom, the library, the playground and at school events.',
  footer_tagline: 'Learning Today, Building Tomorrow.', footer_about: 'An English-medium, co-educational school serving children from pre-primary through Class 10.'
};
const S = [
  { id: 'settings', l: 'Site settings', f: [
    x('site_status', 'Website status', { t: 'sel', o: [['draft', 'Draft (shows the review bar)'], ['live', 'Live']], n: 'Choose Live once the school has approved everything.' }),
    x('alert_text', 'Alert bar message', { n: 'Appears at the top of every page. Leave blank for no alert.' }),
    x('alert_link', 'Alert bar link (optional)', { p: '#notices' }),
    x('stats_show', 'Show student and teacher numbers', { t: 'yn' }),
    x('stats_students', 'Students', { d: 'stats.students' }), x('stats_teachers', 'Teachers', { d: 'stats.teachers' }), x('stats_classrooms', 'Classrooms', { d: 'stats.classrooms' }),
    x('stats_asof', 'Numbers are as of', { p: 'March 2026' }),
    x('gallery_managed', 'Control the whole gallery from admin', { t: 'yn', n: 'Yes: the website shows only photos from Gallery photos. No: new photos are added after the original ones.' }),
    x('footer_tagline', 'Footer tagline'), A('footer_about', 'Footer description', { r: 2 })] },
  { id: 'general', l: 'School info and contact', f: [
    x('site_name', 'School name', { d: 'name' }), x('established_year', 'Year established', { d: 'established' }),
    x('contact_phone', 'Phone number', { d: 'contact.phone' }), x('contact_email', 'Email', { d: 'contact.email' }),
    A('office_hours', 'Office hours', { r: 3, d: 'contact.officeHours' }),
    { k: 'site_address', l: 'Address', t: 'obj', d: 'address', f: [x('village', 'Village'), x('po', 'Post office'), x('district', 'District'), x('state', 'State'), x('pin', 'PIN code'), x('country', 'Country')] },
    x('site_medium', 'Medium of instruction', { p: 'English' }), x('site_classes_summary', 'Classes, short form', { p: 'Pre-primary to Class 10' }), x('site_location_summary', 'Location, short form', { p: 'Dholai Bazar, Cachar, Assam' })] },
  { id: 'home', l: 'Home page', f: [
    x('hero_badge', 'Line under the buttons', { p: 'Pre-primary to Class 10 · Co-educational' }), x('hero_heading', 'Main headline'), A('hero_lead', 'Headline paragraph'),
    x('hero_cta1_text', 'Button 1 text'), x('hero_cta1_link', 'Button 1 link', { p: '#about' }), x('hero_cta2_text', 'Button 2 text'), x('hero_cta2_link', 'Button 2 link', { p: '#admissions' }),
    x('photo_hero', 'Main photo', { t: 'img' }), x('photo_hero_alt', 'Main photo description (for screen readers)'),
    x('welcome_heading', 'Welcome heading'), A('welcome_text', 'Welcome text'),
    x('photo_welcome', 'Welcome photo', { t: 'img' }), x('photo_welcome_alt', 'Welcome photo description')] },
  { id: 'about', l: 'About us', f: [
    A('about_lead', 'Page introduction', { r: 2 }), A('about_overview', 'School overview'),
    x('photo_about', 'Photo', { t: 'img' }), x('photo_about_alt', 'Photo description'),
    A('vision', 'Vision', { d: 'vision' }), A('mission', 'Mission', { d: 'mission' }),
    x('site_values', 'School values', { t: 'list', d: 'values', n: 'One value per line.' })] },
  { id: 'history', l: 'Our history', f: [
    x('history_lead', 'Page introduction'),
    { k: 'site_history', l: 'History details', t: 'obj', f: [x('founder', 'Founder'), x('principal', 'First principal'), x('vp', 'First vice principal'), A('story', 'History in your own words', { r: 6, n: 'If filled, this replaces the standard sentences.' }),
      { k: 'milestones', l: 'Timeline', t: 'objs', item: 'Milestone', f: [x('year', 'Year'), A('desc', 'What happened', { r: 2 })] }] }] },
  { id: 'academics', l: 'Academics', f: [
    A('academics_lead', 'Page introduction', { r: 2 }), A('academics_board_note', 'Board and subjects note'),
    { k: 'site_stages', l: 'Stages of schooling', t: 'objs', d: 'stages', item: 'Stage', id: 1, f: [x('title', 'Stage name'), x('classes', 'Classes', { p: 'Classes 1 to 5' }), A('text', 'Description'), { k: 'points', l: 'Key points (one per line)', t: 'list', r: 3 }, x('img', 'Photo', { t: 'img' })] }] },
  { id: 'admissions', l: 'Admissions', f: [
    A('admissions_lead', 'Page introduction', { r: 2 }), A('admissions_status_note', 'Enquiry note'), A('admissions_dates', 'Admission dates'), A('admissions_fees', 'Fees note'),
    x('site_classes', 'Classes offered', { t: 'list', dv: CL, r: 11, n: 'One class per line. These also fill the enquiry form.' }),
    x('site_documents', 'Required documents', { t: 'list', d: 'documents', n: 'One document per line.' }),
    { k: 'site_admissions_steps', l: 'Admission process', t: 'objs', item: 'Step', f: [x('title', 'Step'), A('desc', 'Explanation', { r: 2 })], dv: [
      { title: 'Contact the school', desc: 'Visit the office or send an enquiry through this website.' }, { title: 'Ask about availability and eligibility', desc: 'Say which class your child is applying for.' },
      { title: 'Collect the application form and document checklist', desc: 'The office will give you the official form.' }, { title: "Complete the school's process", desc: "Follow the steps the school sets for your child's class." },
      { title: 'Receive confirmation from the school', desc: 'Admission is confirmed only by the school itself.' }] }] },
  { id: 'facilities', l: 'Facilities', f: [
    A('facilities_lead', 'Page introduction', { r: 2 }),
    { k: 'site_facilities', l: 'Facilities', t: 'objs', d: 'facilities', item: 'Facility', id: 1, f: [x('title', 'Name'), x('icon', 'Icon', { t: 'sel', o: ICONS }), A('text', 'Description'), x('img', 'Photo', { t: 'img' })] },
    x('site_pending_facilities', 'Review notes: items not yet confirmed', { t: 'list', d: 'pendingFacilities', r: 5, n: 'Only visible while the website is in Draft status.' })] },
  { id: 'staff', l: 'Teachers and staff', f: [
    A('staff_lead', 'Page introduction', { r: 2 }),
    { k: 'site_staff', l: 'People', t: 'objs', d: 'staff', item: 'Person', f: [x('name', 'Name'), x('role', 'Role'), x('qualification', 'Qualification'), x('photo', 'Photo', { t: 'img' })] }] },
  { id: 'life', l: 'Student life', f: [
    A('student_life_lead', 'Page introduction', { r: 2 }),
    { k: 'site_activities', l: 'Activities', t: 'objs', d: 'activities', str: 'title', item: 'Activity', f: [x('title', 'Activity'), A('desc', 'Short description', { r: 2 }), x('img', 'Photo', { t: 'img' })] }] },
  { id: 'faq', l: 'Parent FAQ', f: [
    { k: 'site_faqs', l: 'Questions and answers', t: 'objs', d: 'faqs', item: 'Question', f: [x('q', 'Question'), A('a', 'Answer')] }] }
];

/* ---------- editor for page sections (stored in site_content) ---------- */
async function section(sec) {
  const { data, error } = await sb.from('site_content').select('content_key,content_value');
  if (error) throw error;
  const C = Object.fromEntries(data.map(r => [r.content_key, r.content_value]));
  const els = sec.f.map(f => {
    const raw = C[f.k]; let v;
    if (['objs', 'obj', 'list'].includes(f.t)) { v = parse(raw); if (v == null || (Array.isArray(v) && !v.length)) v = f.d ? g(D, f.d) : (f.dv ?? DV[f.k]); }
    else { v = raw; if (!(v || '').trim()) v = f.d ? g(D, f.d) : DV[f.k]; }
    return { f, ...mk(f, v) };
  });
  const save = async () => {
    const rows = els.map(({ f, get }) => { const v = get(); return { content_key: f.k, content_value: typeof v === 'string' ? v : JSON.stringify(v) }; });
    const error = await saveRows(rows);
    toast(error ? error.message : 'Saved. Refresh the website to see it.', !!error); if (!error) dirty = false;
  };
  main.replaceChildren(h('h1', {}, sec.l), h('p', { class: 'sub' }, 'A blank field uses the website\u2019s built-in text.'),
    h('div', { class: 'form' }, els.map(e => e.el)),
    h('div', { class: 'bar' }, h('button', { class: 'pri', onclick: save }, 'Save changes')));
}

/* ---------- notices and gallery (own database tables) ---------- */
const TB = {
  notices: { t: 'school_notices', l: 'Notices', i: 'notice', o: ['notice_date', false], c: r => [r.title, r.category, r.notice_date || 'no date'], f: [
    x('title', 'Title', { req: 1 }), x('category', 'Category', { t: 'sel', o: () => D.noticeCategories || ['Admission', 'Academic', 'Examination', 'Holiday', 'Parent meeting', 'Event', 'Circular'] }),
    x('notice_date', 'Date', { t: 'date' }), A('summary', 'One-line summary', { r: 2 }), A('body', 'Full notice', { r: 7 }),
    x('file_url', 'Attachment (PDF or image)', { t: 'file' }), x('published', 'Show on the website', { t: 'chk', def: true })] },
  gallery: { t: 'school_gallery', l: 'Gallery photos', i: 'photo', o: ['display_order', true], c: r => [r.caption || '(no caption)', r.category], f: [
    x('image_url', 'Photo', { t: 'img', req: 1 }), x('caption', 'Caption'), x('alt_text', 'Description for screen readers', { n: 'Say what is in the photo.' }),
    x('category', 'Category', { t: 'sel', o: () => D.galleryCategories || ['Campus', 'Classrooms', 'Academic activities', 'Events', 'Sports', 'Cultural programmes'] }),
    x('display_order', 'Order (1 shows first)', { t: 'number' }), x('published', 'Show on the website', { t: 'chk', def: true })] }
};
async function tableView(id) {
  const T = TB[id];
  const { data, error } = await sb.from(T.t).select('*').order(T.o[0], { ascending: T.o[1], nullsFirst: false }).order('created_at', { ascending: false });
  if (error) throw error;
  const edit = r => {
    const els = T.f.map(f => ({ f, ...mk(f, r[f.k]) }));
    main.replaceChildren(h('h1', {}, (r.id ? 'Edit ' : 'New ') + T.i), h('div', { class: 'form' }, els.map(e => e.el)),
      h('div', { class: 'bar' }, h('button', { class: 'pri', onclick: async () => {
        const miss = els.find(e => e.f.req && !e.get()); if (miss) return toast(miss.f.l + ' is required', 1);
        const row = Object.fromEntries(els.map(e => [e.f.k, e.get()]));
        let { data: d, error } = r.id ? await sb.from(T.t).update(row).eq('id', r.id).select('id') : await sb.from(T.t).insert(row);
        if (!error && r.id && !(d && d.length)) error = { message: 'row-level security blocked the save' };
        if (error) return toast(error.message, 1);
        toast('Saved'); route();
      } }, 'Save'), h('button', { onclick: route }, 'Cancel')));
  };
  const bulk = id === 'gallery' && h('label', { class: 'btn' }, 'Upload many photos', h('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, onchange: async e => {
    const fs = [...e.target.files]; let n = data.length;
    for (const f of fs) {
      try { toast('Uploading ' + f.name + '...'); const u = await upload(f, 'gallery'); const { error } = await sb.from(T.t).insert({ image_url: u, caption: '', alt_text: '', category: 'Events', published: true, display_order: ++n }); if (error) throw error; }
      catch (x) { toast(x.message, 1); }
    }
    toast(fs.length + ' photo(s) added. Use Edit to add captions.'); route();
  } }));
  main.replaceChildren(
    h('div', { class: 'top' }, h('h1', {}, T.l), bulk, h('button', { class: 'pri', onclick: () => edit({}) }, '+ New ' + T.i)),
    h('div', {}, data.length ? data.map(r => h('div', { class: 'row' }, r.image_url && h('img', { class: 'th', src: r.image_url, alt: '' }),
      h('div', { class: 'grow' }, h('strong', {}, T.c(r)[0]), h('small', {}, T.c(r).slice(1).filter(Boolean).join(' \u00b7 ') + (r.published ? '' : ' \u00b7 HIDDEN'))),
      h('button', { onclick: () => edit(r) }, 'Edit'),
      h('button', { class: 'del', onclick: async () => {
        if (!confirm('Delete this ' + T.i + '? This cannot be undone.')) return;
        const { data: d, error } = await sb.from(T.t).delete().eq('id', r.id).select('id');
        error || !(d && d.length) ? toast(error ? error.message : 'row-level security blocked the delete', 1) : (toast('Deleted'), route());
      } }, 'Delete'))) : h('p', { class: 'sub' }, 'Nothing here yet. Add the first ' + T.i + '.')));
}

/* ---------- enquiries and dashboard ---------- */
async function enq() {
  const { data, error } = await sb.from('school_enquiries').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  main.replaceChildren(h('h1', {}, 'Enquiries and messages'), h('div', { class: 'form' }, data.length ? data.map(r => h('div', { class: 'card' },
    h('strong', {}, `${r.name || 'No name'} (${r.kind === 'enquiry' ? 'admission enquiry' : 'message'})`), h('small', {}, new Date(r.created_at).toLocaleString('en-IN')),
    h('p', {}, [r.student && 'Student: ' + r.student, r.cls && 'Class: ' + r.cls, r.phone && 'Phone: ' + r.phone, r.email && 'Email: ' + r.email].filter(Boolean).join(' \u00b7 ')),
    r.msg && h('p', {}, r.msg),
    h('div', { class: 'acts' },
      h('select', { onchange: async e => { const { data: d, error } = await sb.from('school_enquiries').update({ status: e.target.value }).eq('id', r.id).select('id'); const no = error || !(d && d.length); toast(no ? (error ? error.message : 'row-level security blocked the change') : 'Status updated', !!no); } },
        ['new', 'contacted', 'closed'].map(s => h('option', { value: s, selected: (r.status || 'new') === s }, s))),
      r.phone && h('a', { class: 'btn', href: 'tel:' + r.phone.replace(/[^\d+]/g, '') }, 'Call'),
      h('button', { class: 'del', onclick: async () => { if (!confirm('Delete this enquiry?')) return; await sb.from('school_enquiries').delete().eq('id', r.id); route(); } }, 'Delete')))) : h('p', { class: 'sub' }, 'No enquiries yet.')));
}
async function dash() {
  const c = async (t, f) => { let q = sb.from(t).select('*', { count: 'exact', head: true }); if (f) q = f(q); return (await q).count ?? 0; };
  const [n, p, e] = await Promise.all([c('school_notices'), c('school_gallery'), c('school_enquiries', q => q.eq('status', 'new'))]);
  const [sa, sv] = await Promise.all([sb.from('site_content').select('content_key', { count: 'exact', head: true }), anon.from('site_content').select('content_key', { count: 'exact', head: true })]);
  const warn = (sa.count || 0) > 0 && !(sv.count > 0);
  main.replaceChildren(h('h1', {}, 'Dashboard'),
    h('div', {}, warn && h('div', { class: 'card warn' }, h('strong', {}, 'The website cannot see the page text you saved.'), h('p', {}, 'Visitors are blocked from reading it, so changes to Academics, Staff and other pages will not show.'), h('a', { class: 'btn', href: '#/check' }, 'Open Connection check'))),
    h('div', { class: 'stats' }, [[n, 'Notices', 'notices'], [p, 'Gallery photos', 'gallery'], [e, 'New enquiries', 'enq']].map(([a, b, k]) => h('a', { class: 'stat', href: '#/' + k }, h('b', {}, a), b))),
    h('p', { class: 'sub' }, 'Choose a page on the left to edit its text, photos and lists. Changes appear on the website the next time it is opened or refreshed.'));
}

/* ---------- connection check ---------- */
const fix = (t, k) => `alter table ${t} enable row level security;\n` + (k === 'admin'
  ? `drop policy if exists admin_all on ${t};\ncreate policy admin_all on ${t} for all to authenticated using (true) with check (true);`
  : k === 'anon' ? `drop policy if exists pub_read on ${t};\ncreate policy pub_read on ${t} for select to anon using (${t === 'site_content' ? 'true' : 'published'});`
  : `drop policy if exists pub_insert on ${t};\ncreate policy pub_insert on ${t} for insert to anon with check (true);`);
async function check() {
  main.replaceChildren(h('h1', {}, 'Connection check'), h('p', { class: 'sub' }, 'Testing. This adds and removes a few test items, and takes a few seconds.'));
  const out = [], T = '__check_' + Date.now(), SQL = 'Run setup.sql from the admin folder in Supabase (SQL Editor). It adds the missing columns and storage.';
  const add = (name, ok, detail, f) => out.push({ name, ok, detail, fix: /column|does not exist|bucket/i.test(detail || '') ? SQL : f });
  const e = await saveRows([{ content_key: T, content_value: 'ok' }]);
  add('You can save page text (Home, Academics, Staff and the other pages)', !e, e && e.message, fix('site_content', 'admin'));
  if (!e) {
    const v = await anon.from('site_content').select('content_key').eq('content_key', T);
    add('Visitors can read that text, so the website shows what you save', !v.error && v.data.length > 0, v.error ? v.error.message : 'Visitors got an empty answer.', fix('site_content', 'anon'));
    await sb.from('site_content').delete().eq('content_key', T).select('content_key');
  }
  for (const [t, label, k, row] of [['school_notices', 'notices', 'title', { title: '__check', published: true }], ['school_gallery', 'gallery photos', 'image_url', { image_url: '__check', published: true }]]) {
    const i = await sb.from(t).insert(row);
    add('You can add ' + label, !i.error, i.error && i.error.message, fix(t, 'admin'));
    if (!i.error) {
      const v = await anon.from(t).select('*').eq(k, '__check');
      add('Visitors can see published ' + label, !v.error && v.data.length > 0, v.error ? v.error.message : 'Visitors got an empty answer.', fix(t, 'anon'));
      await sb.from(t).delete().eq(k, '__check').select('id');
    }
  }
  const q = await anon.from('school_enquiries').insert({ kind: 'check', name: '__check', phone: '0' });
  add('Visitors can send enquiries', !q.error, q.error && q.error.message, fix('school_enquiries', 'insert'));
  const rd = await sb.from('school_enquiries').select('id').eq('name', '__check');
  add('You can read enquiries', !rd.error && (q.error || rd.data.length > 0), rd.error ? rd.error.message : 'The enquiry was sent but you cannot see it.', fix('school_enquiries', 'admin'));
  await sb.from('school_enquiries').delete().eq('name', '__check').select('id');
  const path = '__check/' + T + '.txt', u = await sb.storage.from('school-media').upload(path, new Blob(['ok'], { type: 'text/plain' }), { contentType: 'text/plain' });
  add('You can upload photos and PDFs', !u.error, u.error && u.error.message, SQL);
  if (!u.error) await sb.storage.from('school-media').remove([path]);
  const bad = out.filter(o => !o.ok).length;
  main.replaceChildren(h('h1', {}, 'Connection check'),
    h('p', { class: bad ? 'del' : 'sub' }, bad ? bad + ' problem(s) found. Copy each fix into Supabase (SQL Editor), run it, then run this check again.' : 'Everything is connected. What you save here will show on the website.'),
    h('div', { class: 'form' }, out.map(o => h('div', { class: 'card' }, h('strong', {}, (o.ok ? '\u2713 ' : '\u2717 ') + o.name),
      !o.ok && o.detail && h('small', {}, o.detail), !o.ok && h('pre', {}, o.fix),
      !o.ok && h('button', { onclick: () => navigator.clipboard.writeText(o.fix).then(() => toast('Copied')) }, 'Copy')))),
    h('button', { class: 'pri', onclick: () => check().catch(x => toast(x.message, 1)) }, 'Run the check again'));
}

/* ---------- navigation, routing and sign-in ---------- */
function buildNav() {
  $('#nav').replaceChildren(h('a', { href: '#/dash', 'data-k': 'dash' }, 'Dashboard'), h('h4', {}, 'Website pages'),
    ...S.map(s => h('a', { href: '#/' + s.id, 'data-k': s.id }, s.l)), h('h4', {}, 'Posts and photos'),
    ...[['notices', 'Notices'], ['gallery', 'Gallery photos'], ['enq', 'Enquiries']].map(([k, l]) => h('a', { href: '#/' + k, 'data-k': k }, l)),
    h('h4', {}, 'Help'), h('a', { href: '#/check', 'data-k': 'check' }, 'Connection check'));
}
function route() {
  dirty = false;
  $('aside').classList.remove('open'); $('#mtoggle').setAttribute('aria-expanded', 'false');
  const id = location.hash.slice(2) || 'dash', sec = S.find(s => s.id === id);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.k === id));
  main.replaceChildren(h('p', { class: 'sub' }, 'Loading...'));
  (sec ? section(sec) : TB[id] ? tableView(id) : id === 'enq' ? enq() : id === 'check' ? check() : dash()).catch(e => { main.replaceChildren(h('h1', {}, 'Something went wrong'), h('p', {}, nice(e.message))); });
}
let shown = null;
async function show(session) {
  if (!!session === shown) return; shown = !!session;
  $('#login').hidden = !!session; $('#app').hidden = !session;
  if (session) { await loadDefaults(); buildNav(); route(); }
}
$('#lf').onsubmit = async e => {
  e.preventDefault(); $('#le').textContent = '';
  const { error } = await sb.auth.signInWithPassword({ email: $('#em').value.trim(), password: $('#pw').value });
  if (error) $('#le').textContent = 'Sign-in failed: ' + error.message;
};
$('#out').onclick = () => sb.auth.signOut();
$('#mtoggle').onclick = () => $('#mtoggle').setAttribute('aria-expanded', String($('aside').classList.toggle('open')));
addEventListener('hashchange', () => {
  if ($('#app').hidden) return;
  if (dirty && !confirm('You have unsaved changes. Leave this page without saving?')) { history.replaceState(null, '', prev); return; }
  prev = location.hash; route();
});
sb.auth.onAuthStateChange((_e, s) => show(s));
sb.auth.getSession().then(({ data }) => show(data.session));
})();

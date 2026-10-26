/* ======================================================================
   Ideal English School: CMS loader (public website)
   Loads notices, gallery photos and editable text that the school
   office saves in /admin, and applies them to the SITE object before
   the site starts. If anything fails the site simply shows its
   built-in content, so visitors never see an error.

   The key below is a *publishable* key, safe in the browser. Row Level
   Security in Supabase only lets visitors read published content.
   ====================================================================== */
(() => {
  const URL_ = "https://dwgkbkjhasuekqezjsiy.supabase.co";
  const KEY = "sb_publishable_Xp9VvpM_zp776di4YBCOxw_SIkwft_a";

  async function get(path) {
    const r = await fetch(`${URL_}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`${path.split("?")[0]} ${r.status}`);
    return r.json();
  }
  const safe = p => p.catch(e => { console.warn("CMS:", e.message); return null; });

  window.CMS_READY = Promise.all([
    safe(get("site_content?select=content_key,content_value")),
    safe(get("school_notices?select=id,title,body,summary,category,notice_date,published_at,created_at,file_url&published=eq.true&order=notice_date.desc.nullslast,created_at.desc")),
    safe(get("school_gallery?select=id,image_url,caption,alt_text,category&published=eq.true&order=display_order.asc,created_at.desc"))
  ]).then(([content, notices, gallery]) => (content || notices || gallery) ? { content, notices, gallery } : null);

  const isoDate = n => (n.notice_date || n.published_at || n.created_at || "").slice(0, 10);

  window.CMS_APPLY = (SITE, d) => {
    /* ---- editable text and settings ---- */
    if (d.content) {
      const c = {};
      d.content.forEach(r => { c[r.content_key] = r.content_value; });
      SITE.cms = c;
      const has = k => typeof c[k] === "string" && c[k].trim() !== "";
      const value = k => {
        if (!has(k)) return undefined;
        const raw = c[k];
        try { return JSON.parse(raw); } catch { return raw; }
      };
      // Apply the complete content model saved by the admin editor.
      const scalarMap = {
        site_name: 'name', established_year: 'established', site_medium: 'medium',
        site_classes_summary: 'classesSummary', site_location_summary: 'locationSummary',
        hero_badge: 'heroBadge', hero_heading: 'heroHeading', hero_lead: 'heroLead',
        hero_cta1_text: 'heroCta1Text', hero_cta1_link: 'heroCta1Link',
        hero_cta2_text: 'heroCta2Text', hero_cta2_link: 'heroCta2Link',
        welcome_heading: 'welcomeHeading', welcome_text: 'welcomeText',
        about_lead: 'aboutLead', about_overview: 'aboutOverview', history_lead: 'historyLead',
        academics_lead: 'academicsLead', academics_board_note: 'academicsBoardNote',
        admissions_lead: 'admissionsLead', admissions_status_note: 'admissionsStatusNote',
        admissions_dates: 'admissionsDates', admissions_fees: 'admissionsFees',
        facilities_lead: 'facilitiesLead', staff_lead: 'staffLead', student_life_lead: 'studentLifeLead',
        footer_tagline: 'footerTagline', footer_about: 'footerAbout',
        photo_hero: 'photoHero', photo_hero_alt: 'photoHeroAlt',
        photo_welcome: 'photoWelcome', photo_welcome_alt: 'photoWelcomeAlt',
        photo_about: 'photoAbout', photo_about_alt: 'photoAboutAlt'
      };
      Object.entries(scalarMap).forEach(([key, prop]) => { const v = value(key); if (v !== undefined && v !== '') SITE[prop] = v; });
      const jsonMap = {
        site_address: 'address', site_history: 'history', site_stages: 'stages',
        site_classes: 'classes', site_documents: 'documents', site_admissions_steps: 'admissionsSteps',
        site_facilities: 'facilities', site_pending_facilities: 'pendingFacilities',
        site_staff: 'staff', site_activities: 'activities', site_faqs: 'faqs', site_values: 'values'
      };
      Object.entries(jsonMap).forEach(([key, prop]) => {
        const v = value(key);
        if (v !== undefined && v !== null) {
          if (key === 'site_address' && typeof v === 'object' && v) Object.assign(SITE.address, v);
          else SITE[prop] = v;
          if (key === 'site_history' && typeof v === 'object') SITE.history = v;
          if (key === 'site_classes' && Array.isArray(v)) SITE.classes = v;
        }
      });
      if (has("contact_phone")) SITE.contact.phone = c.contact_phone.trim();
      if (has("contact_email")) SITE.contact.email = c.contact_email.trim();
      if (has("office_hours")) SITE.contact.officeHours = c.office_hours.trim();
      if (has("vision")) SITE.vision = c.vision.trim();
      if (has("mission")) SITE.mission = c.mission.trim();
      if (c.stats_show === "yes") {
        SITE.stats.show = true;
        if (has("stats_students")) SITE.stats.students = c.stats_students.trim();
        if (has("stats_teachers")) SITE.stats.teachers = c.stats_teachers.trim();
        if (has("stats_classrooms")) SITE.stats.classrooms = c.stats_classrooms.trim();
        if (has("stats_asof")) SITE.stats.asOf = c.stats_asof.trim();
      }
      SITE.live = c.site_status === "live";
      if (has("alert_text")) SITE.alert = { text: c.alert_text.trim(), link: (c.alert_link || "").trim() };
    }

    /* ---- notices: the admin panel is the source of truth once it answers ---- */
    if (Array.isArray(d.notices)) {
      SITE.notices = d.notices.map(n => ({
        id: n.id,
        title: n.title,
        date: isoDate(n),
        category: n.category || "Circular",
        summary: n.summary || "",
        body: n.body || "",
        draft: false,
        file: n.file_url || ""
      }));
    }

    /* ---- gallery ---- */
    if (Array.isArray(d.gallery)) {
      const photos = d.gallery.filter(p => p.image_url).map(p => ({
        src: p.image_url,
        alt: p.alt_text || p.caption || "School photograph",
        caption: p.caption || "",
        category: p.category || "Events",
        date: ""
      }));
      const managed = d.content && d.content.some(r => r.content_key === "gallery_managed" && r.content_value === "yes");
      if (managed) {
        SITE.gallery = photos;                      // admin controls the whole gallery
        SITE.homeStrip = photos.slice(0, 4);        // "Life at school" strip on the home page
      } else {
        SITE.gallery = [...SITE.gallery, ...photos]; // new uploads are added after the original photos
      }
    }
  };
})();

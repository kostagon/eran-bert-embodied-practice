// Bilingual UI dictionary. Hebrew (he) is the default; site_content (CMS) overrides he values.
// English (en) is sourced from this file. Add new keys here to expose them in both languages.
//
// Voice: calm, intelligent, grounded, reflective, evidence-informed.
// Brand: Eran Bert — Muay Thai coach. Martial arts as a laboratory for presence,
// regulation, resilience, embodiment, and freedom of action under pressure.
// Philosophical pillars woven through copy: Ma (間), Fudōshin (不動心),
// Shu–Ha–Ri (守破離), "slow is smooth, smooth is fast", body-keeps-the-score (hopeful).

export type Lang = "he" | "en";

export const LANG_CONFIG: Record<Lang, { dir: "rtl" | "ltr"; label: string; htmlLang: string }> = {
  he: { dir: "rtl", label: "עברית", htmlLang: "he" },
  en: { dir: "ltr", label: "English", htmlLang: "en" },
};

type Dict = Record<string, string>;

export const translations: Record<Lang, Dict> = {
  he: {
    // Nav
    "nav.brand": "ERAN BERT",
    "nav.about": "אודות",
    "nav.philosophy": "פילוסופיה",
    "nav.services": "אימון",
    "nav.programs": "תוכניות",
    "nav.blog": "כתיבה",
    "nav.contact": "צור קשר",
    "nav.menu": "תפריט",

    // Hero
    "hero.title": "מואיי תאי כמעבדה לנוכחות, ויסות וחירות תחת לחץ",
    "hero.subtitle": "אימון לחימה שמלמד את הגוף לנשום, להאזין ולבחור — במקום להגיב.",
    "hero.description": "אימון, ליווי והכשרה המשלבים מואיי תאי, תנועה ומדעי מערכת העצבים — לפיתוח מיומנות, חוסן וחופש פעולה בחיים היומיומיים.",
    "hero.cta_primary": "צור קשר",
    "hero.cta_secondary": "תוכניות אימון",

    // Intro
    "intro.title": "המרחב שבין גירוי לתגובה — שם מתחילה החירות",
    "intro.body_1": "מואיי תאי הוא לא רק טכניקה של מכות ובעיטות. בסטודיו, הוא הופך למרחב תרגול שבו אנחנו לומדים להישאר נוכחים תחת לחץ, לווסת עוררות, ולבחור תגובה במקום להגיב באוטומט. המיומנויות שמתפתחות על הפדים נמשכות הביתה — להורות, ליחסים, להובלה ולחיים תחת עומס.",
    "intro.body_2": "העבודה מבוססת על למידה הדרגתית בנוסח שו-הא-רי: קודם לומדים את הצורה, אחר כך מבינים את העקרונות, ובסוף מבטאים אותם בחופשיות. אטיות שהיא חלקה הופכת למהירות. דיוק קודם לכוח. מודעות קודמת לעוצמה.",
    "intro.quote": "״חופש מתחיל במרחב שבין מה שקורה לבין איך שאנחנו מגיבים״",

    // Philosophy
    "philosophy.title": "עקרונות מנחים",
    "philosophy.pillar_1_title": "Ma (間) — המרחב שבין גירוי לתגובה",
    "philosophy.pillar_1_text": "התרגול מפתח את היכולת לעצור רגע לפני שמגיבים — להאזין, לווסת ולבחור. החירות הזו נמשכת מהאימון אל ההורות, היחסים והעבודה תחת לחץ.",
    "philosophy.pillar_2_title": "Fudōshin (不動心) — תודעה שאינה מתערערת",
    "philosophy.pillar_2_text": "לא קשיחות אלא יציבות. נשארים מחוברים לעצמנו גם בתוך אי-ודאות, עייפות, אי-נוחות וכישלון. האימון הוא מרחב בטוח לתרגל זאת.",
    "philosophy.pillar_3_title": "Shu–Ha–Ri (守破離) — מצורה לחירות",
    "philosophy.pillar_3_text": "תחילה לומדים את הצורה. אחר כך מבינים מדוע היא עובדת. ולבסוף הופכים אותה לאישית, מסתגלת וטבעית. למידה רצינית בלי קיצורי דרך.",
    "philosophy.pillar_4_title": "אטי שהוא חלק — הופך מהיר",
    "philosophy.pillar_4_text": "מהירות נולדת מאיכות, לא מדחיפה. רוגע, תיאום, נשימה וארגון של מערכת העצבים יוצרים פעולה מדויקת — גם כשהקצב עולה.",

    // Services
    "services.title": "מסגרות אימון",
    "services.s1_title": "אימון אישי",
    "services.s1_text": "מסלול מותאם המשלב מואיי תאי, עבודת נשימה ועקרונות סומטיים — לפיתוח טכניקה נקייה, ויסות עוררות ובחירה תחת לחץ.",
    "services.s2_title": "אימון קבוצתי",
    "services.s2_text": "קבוצות קטנות בקצב מדוד. עובדים על יסודות, תזמון ומגע — בסביבה תומכת שמאפשרת ללמוד מבלי לאבד נוכחות.",
    "services.s3_title": "הכשרת מדריכים",
    "services.s3_text": "תוכנית למדריכים ומטפלים המבקשים לשלב כלים גופניים, עקרונות למידה ועבודה סומטית בעבודתם.",
    "services.s4_title": "הרצאות וסדנאות",
    "services.s4_text": "סדנאות חוויתיות לארגונים וצוותים — נוכחות, ויסות וקבלת החלטות תחת לחץ דרך עבודת גוף.",
    "services.s5_title": "ריטריטים",
    "services.s5_text": "צלילות עומק של מספר ימים — תרגול, שקט, טבע ואינטגרציה.",

    // Programs
    "programs.title": "תוכניות אימון",
    "programs.subtitle": "מסלולים נבחרים, כל אחד בנוי כדי לפגוש שלב אחר במסע התרגול.",
    "programs.cta": "לפרטים והרשמה",

    // Performance
    "performance.title": "ביצוע תחת לחץ",
    "performance.body": "אנשים שעובדים תחת עומס לא צריכים עוד טכניקה — הם צריכים מערכת עצבים שיודעת להישאר מאורגנת. בהירות, ויסות עוררות והחלטה מדויקת גם כשהדופק עולה.",
    "performance.footnote": "האימון מחבר בין תרגול גופני, נשימה ואסטרטגיות מנטליות, כדי לבנות יציבות פנימית שמאפשרת פעולה נקייה ברגע האמת.",
    "performance.aud_1": "אנשי ביצוע",
    "performance.aud_2": "ספורטאים",
    "performance.aud_3": "יחידות מבצעיות",
    "performance.aud_4": "מנהלים והורים",
    "performance.aud_5": "מגיבים ראשונים",

    // Retreats
    "retreats.title": "ריטריטים",
    "retreats.lead": "מרחב של מספר ימים לצלילה עמוקה — הרחק מהרעש.",
    "retreats.body": "שילוב של תרגול גופני, שקט, טבע, נשימה ועבודה פנימית. מרחב לאיפוס, חידוש הקשר עם הגוף ואינטגרציה. לא בריחה — חזרה אל עצמך.",
    "retreats.word_1": "עומק",
    "retreats.word_2": "שקט",
    "retreats.word_3": "נשימה",
    "retreats.word_4": "איפוס",
    "retreats.word_5": "אינטגרציה",
    "retreats.word_6": "גילום",

    // Blog
    "blog.title": "כתיבה ומחשבות",
    "blog.subtitle": "מאמרים, פודקאסטים ושיחות על תרגול, גוף, למידה ונוכחות.",
    "blog.empty": "תוכן יפורסם בקרוב.",
    "blog.read": "קריאה",
    "blog.listen": "האזנה",
    "blog.watch": "צפייה",
    "blog.open": "פתיחה",
    "blog.close": "סגירה",
    "blog.prev": "הקודם",
    "blog.next": "הבא",
    "blog.all": "כל הכתיבה",
    "blog.filter_all": "הכל",
    "blog.type.text": "מאמר",
    "blog.type.spotify": "פודקאסט",
    "blog.type.youtube": "וידאו",
    "blog.type.external": "קישור",

    // Contact
    "contact.title": "צור קשר",
    "contact.subtitle": "לאימון אישי, אימון קבוצתי, הכשרות או שיתופי פעולה — אשמח לשמוע.",
    "contact.email": "info@eranbert.com",
    "contact.cta": "שליחה",
    "contact.name": "שם",
    "contact.email_label": "אימייל",
    "contact.message": "הודעה",

    // Footer
    "footer.brand": "ERAN BERT",
    "footer.tagline": "מואיי תאי · נוכחות · ויסות · גילום",
    "footer.rights": "כל הזכויות שמורות",

    // Language
    "lang.switch": "שפה",
  },

  en: {
    // Nav
    "nav.brand": "ERAN BERT",
    "nav.about": "About",
    "nav.philosophy": "Philosophy",
    "nav.services": "Training",
    "nav.programs": "Programs",
    "nav.blog": "Writing",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    // Hero
    "hero.title": "Muay Thai as a laboratory for presence, regulation, and freedom under pressure",
    "hero.subtitle": "A martial practice that teaches the body to breathe, listen, and choose — instead of react.",
    "hero.description": "Training, mentoring and education weaving Muay Thai, movement and nervous-system science — to develop skill, resilience and freedom of action in everyday life.",
    "hero.cta_primary": "Get in touch",
    "hero.cta_secondary": "Training programs",

    // Intro
    "intro.title": "The space between stimulus and response — where freedom begins",
    "intro.body_1": "Muay Thai is more than punches and kicks. In the studio it becomes a place to practice staying present under pressure, regulating arousal, and choosing a response instead of reacting on autopilot. The skills we build on the pads travel home — into parenting, relationships, leadership, and life under load.",
    "intro.body_2": "The work follows a Shu–Ha–Ri arc: first we learn the form, then we understand the principles, and finally we make them our own. Slow becomes smooth, and smooth becomes fast. Precision before force. Awareness before intensity.",
    "intro.quote": "“Freedom begins in the space between what happens and how we respond.”",

    // Philosophy
    "philosophy.title": "Guiding principles",
    "philosophy.pillar_1_title": "Ma (間) — the space between stimulus and response",
    "philosophy.pillar_1_text": "Training builds the capacity to pause — to observe, regulate and choose before reacting. That freedom carries from the gym into parenting, relationships, and work under load.",
    "philosophy.pillar_2_title": "Fudōshin (不動心) — the unshaken mind",
    "philosophy.pillar_2_text": "Not rigidity, but stability. Staying connected to ourselves inside uncertainty, fatigue, discomfort and failure. The training environment is a safe place to rehearse this.",
    "philosophy.pillar_3_title": "Shu–Ha–Ri (守破離) — from form to freedom",
    "philosophy.pillar_3_text": "First we follow the form. Then we understand the principles. Finally we express them freely — adaptive, personal, natural. Serious learning, without shortcuts.",
    "philosophy.pillar_4_title": "Slow is smooth, smooth is fast",
    "philosophy.pillar_4_text": "Speed emerges from quality, not from rushing. Relaxation, timing, breath and nervous-system organization produce precise action — even as the tempo rises.",

    // Services
    "services.title": "Training formats",
    "services.s1_title": "One-on-one training",
    "services.s1_text": "A tailored path integrating Muay Thai, breath work and somatic principles — for clean technique, arousal regulation, and the capacity to choose under pressure.",
    "services.s2_title": "Group training",
    "services.s2_text": "Small groups at a measured pace. Fundamentals, timing, contact — in a supportive environment that lets people learn without losing presence.",
    "services.s3_title": "Coach education",
    "services.s3_text": "A program for instructors and therapists who want to weave embodied tools, learning principles and somatic work into their practice.",
    "services.s4_title": "Talks & workshops",
    "services.s4_text": "Experiential sessions for teams and organizations — presence, regulation and decision-making under pressure through body-based work.",
    "services.s5_title": "Retreats",
    "services.s5_text": "Multi-day deep dives — practice, silence, nature and integration.",

    // Programs
    "programs.title": "Training programs",
    "programs.subtitle": "Selected tracks, each designed to meet a different stage of the practice.",
    "programs.cta": "Details & registration",

    // Performance
    "performance.title": "Performance under pressure",
    "performance.body": "People who work under load don't need more technique — they need a nervous system that stays organized. Clarity, arousal regulation and precise decisions as the heart rate climbs.",
    "performance.footnote": "The work weaves physical practice, breath and mental strategy into the kind of inner stability that allows clean action in the real moment.",
    "performance.aud_1": "Performers",
    "performance.aud_2": "Athletes",
    "performance.aud_3": "Operational units",
    "performance.aud_4": "Leaders & parents",
    "performance.aud_5": "First responders",

    // Retreats
    "retreats.title": "Retreats",
    "retreats.lead": "A multi-day space for deep diving — far from the noise.",
    "retreats.body": "A weaving of physical practice, silence, nature, breath and inner work. A space for reset, for renewing the relationship with the body, and for integration. Not an escape — a return to yourself.",
    "retreats.word_1": "Depth",
    "retreats.word_2": "Silence",
    "retreats.word_3": "Breath",
    "retreats.word_4": "Reset",
    "retreats.word_5": "Integration",
    "retreats.word_6": "Embodiment",

    // Blog
    "blog.title": "Writing & thoughts",
    "blog.subtitle": "Essays, podcasts and conversations on practice, body, learning and presence.",
    "blog.empty": "Content coming soon.",
    "blog.read": "Read",
    "blog.listen": "Listen",
    "blog.watch": "Watch",
    "blog.open": "Open",
    "blog.close": "Close",
    "blog.prev": "Previous",
    "blog.next": "Next",
    "blog.all": "All writing",
    "blog.filter_all": "All",
    "blog.type.text": "Essay",
    "blog.type.spotify": "Podcast",
    "blog.type.youtube": "Video",
    "blog.type.external": "Link",

    // Contact
    "contact.title": "Get in touch",
    "contact.subtitle": "For one-on-one training, group classes, coach education or collaborations — I'd love to hear from you.",
    "contact.email": "info@eranbert.com",
    "contact.cta": "Send",
    "contact.name": "Name",
    "contact.email_label": "Email",
    "contact.message": "Message",

    // Footer
    "footer.brand": "ERAN BERT",
    "footer.tagline": "Muay Thai · Presence · Regulation · Embodiment",
    "footer.rights": "All rights reserved",

    // Language
    "lang.switch": "Language",
  },
};

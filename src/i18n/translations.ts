// Bilingual UI dictionary. Hebrew (he) is the default; site_content (CMS) overrides he values.
// English (en) is sourced from this file. Add new keys here to expose them in both languages.

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
    "nav.services": "שירותים",
    "nav.programs": "תוכניות",
    "nav.blog": "כתיבה",
    "nav.contact": "צור קשר",
    "nav.menu": "תפריט",

    // Hero
    "hero.title": "ערן ברט — תרגול, תנועה, לחימה, מודעות",
    "hero.subtitle": "ללמוד להתעגן בעצמי — תנועה, נשימה ולחימה ככלים לחוסן, ויסות ונוכחות.",
    "hero.description": "אימון, ליווי והכשרה המשלבים אומנויות לחימה, עבודה סומטית ומודעות גופנית.",
    "hero.cta_primary": "צור קשר",
    "hero.cta_secondary": "לתוכניות והכשרות",

    // Intro
    "intro.title": "הקשר בין גוף לתודעה הוא לא רעיון — הוא חוויה",
    "intro.body_1": "במשך שנים של תרגול הבנתי שמערכת העצבים היא המורה הגדול ביותר שלנו. תנועה, נשימה ולחימה הן לא רק כלים טכניים — הן דרך להקשיב לעצמנו, לווסת את הפנים, ולגלות יציבות שלא תלויה בנסיבות.",
    "intro.body_2": "אני עובד עם אנשים שמחפשים עומק — אנשי ביצוע, מטפלים, מדריכים ואנשים שפשוט מבקשים לחזור הביתה, לגוף. העבודה משלבת מסורות לחימה עתיקות עם הבנה מודרנית של טראומה, ויסות ומודעות גופנית.",
    "intro.quote": "״הניצחון האמיתי הוא הניצחון על עצמך״",

    // Philosophy
    "philosophy.title": "פילוסופיה",
    "philosophy.pillar_1_title": "איזון פנימי ושליטה עצמית",
    "philosophy.pillar_1_text": "לא שליטה מכוח כוח — אלא מתוך הקשבה. השליטה האמיתית נולדת מוויתור על ההתנגדות ומכוונון מדויק של מערכת העצבים.",
    "philosophy.pillar_2_title": "נוכחות והקשבה",
    "philosophy.pillar_2_text": "נוכחות היא יכולת פיזיולוגית. דרך תרגול מבוסס גוף, אנו מפתחים יכולת לשהות ברגע, להאזין מבפנים, ולהגיב בלי להגיב-יתר.",
    "philosophy.pillar_3_title": "גמישות ותנועה הרמונית",
    "philosophy.pillar_3_text": "תנועה הרמונית היא ביטוי של מערכת עצבים מווסתת. גמישות אמיתית היא היכולת לנוע בין מצבים ולזרום עם מה שמגיע.",
    "philosophy.pillar_4_title": "חוסן וויסות",
    "philosophy.pillar_4_text": "חוסן הוא לא הקשחה — הוא גמישות עמוקה. עבודה סומטית מלמדת את הגוף לווסת עוררות ולהתאושש מהר יותר.",

    // Services
    "services.title": "שירותים",
    "services.s1_title": "אימון אישי",
    "services.s1_text": "מסלול מותאם אישית המשלב תנועה, נשימה ועבודה סומטית — לפיתוח חוסן, ויסות ומודעות עצמית מעמיקה.",
    "services.s2_title": "סדנאות קבוצתיות",
    "services.s2_text": "סדנאות חוויתיות המשלבות לחימה, תרגול סומטי ועבודת מודעות לקבוצות וארגונים.",
    "services.s3_title": "הכשרות מקצועיות",
    "services.s3_text": "תוכניות הכשרה למדריכים ומטפלים המבקשים לשלב גישות גופניות בעבודתם.",
    "services.s4_title": "הרצאות וקורסים",
    "services.s4_text": "הרצאות וקורסים בנושאי גוף-נפש, ויסות, חוסן ומנהיגות מגולמת.",
    "services.s5_title": "ריטריטים",
    "services.s5_text": "צלילות עומק של מספר ימים — תרגול, שקט, טבע ואינטגרציה.",

    // Programs
    "programs.title": "תוכניות והכשרות",
    "programs.subtitle": "תוכניות נבחרות, כל אחת מעוצבת בקפידה כדי לתת מענה לצורך ייחודי.",
    "programs.cta": "לפרטים והרשמה",

    // Performance
    "performance.title": "ביצועים תחת לחץ",
    "performance.body": "אנשים שחיים בסביבות עתירות לחץ זקוקים ליותר מטכניקה — הם זקוקים לאינטליגנציה של מערכת העצבים. בהירות, ויסות עוררות ודיוק גם כשהלחץ עולה.",
    "performance.footnote": "העבודה משלבת תרגול פיזי, ויסות נשימתי ואסטרטגיות מנטליות ליציבות פנימית שמאפשרת ביצוע מדויק.",
    "performance.aud_1": "אנשי ביצוע",
    "performance.aud_2": "ספורטאים",
    "performance.aud_3": "יחידות עילית",
    "performance.aud_4": "מנהלים",
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
    "blog.subtitle": "מאמרים, פודקאסטים ושיחות על תרגול, גוף ונוכחות.",
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
    "contact.subtitle": "לאימון אישי, סדנאות, הכשרות או שיתופי פעולה — אשמח לשמוע.",
    "contact.email": "info@eranbert.com",
    "contact.cta": "שליחה",
    "contact.name": "שם",
    "contact.email_label": "אימייל",
    "contact.message": "הודעה",

    // Footer
    "footer.brand": "ERAN BERT",
    "footer.tagline": "תרגול · תנועה · לחימה · מודעות",
    "footer.rights": "כל הזכויות שמורות",

    // Language
    "lang.switch": "שפה",
  },

  en: {
    // Nav
    "nav.brand": "ERAN BERT",
    "nav.about": "About",
    "nav.philosophy": "Philosophy",
    "nav.services": "Services",
    "nav.programs": "Programs",
    "nav.blog": "Writing",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    // Hero
    "hero.title": "Eran Bert — Practice, Movement, Martial Arts, Awareness",
    "hero.subtitle": "Learning to anchor in the self — movement, breath and martial arts as tools for resilience, regulation and presence.",
    "hero.description": "Training, mentoring and education integrating martial arts, somatic work and embodied awareness.",
    "hero.cta_primary": "Get in touch",
    "hero.cta_secondary": "Programs & trainings",

    // Intro
    "intro.title": "The bond between body and mind is not a concept — it is an experience",
    "intro.body_1": "Through years of practice I came to see that the nervous system is our deepest teacher. Movement, breath and martial arts are not only technical tools — they are a way of listening inward, of regulating from within, and of finding stability that does not depend on circumstance.",
    "intro.body_2": "I work with people seeking depth — performers, therapists, instructors, and those simply returning home to their body. The work weaves ancient martial traditions with a modern understanding of trauma, regulation and embodied awareness.",
    "intro.quote": "“True victory is the victory over oneself.”",

    // Philosophy
    "philosophy.title": "Philosophy",
    "philosophy.pillar_1_title": "Inner balance & self-mastery",
    "philosophy.pillar_1_text": "Not control through force — but through listening. True mastery is born from releasing resistance and finely tuning the nervous system.",
    "philosophy.pillar_2_title": "Presence & listening",
    "philosophy.pillar_2_text": "Presence is a physiological capacity. Through body-based practice we cultivate the ability to stay in the moment, listen inward, and respond without over-reacting.",
    "philosophy.pillar_3_title": "Flexibility & harmonious movement",
    "philosophy.pillar_3_text": "Harmonious movement expresses a regulated nervous system. Real flexibility is the ability to move between states and flow with what arrives.",
    "philosophy.pillar_4_title": "Resilience & regulation",
    "philosophy.pillar_4_text": "Resilience is not hardening — it is deep flexibility. Somatic work teaches the body to regulate arousal and recover faster.",

    // Services
    "services.title": "Services",
    "services.s1_title": "One-on-one training",
    "services.s1_text": "A personal path integrating movement, breath and somatic work — for resilience, regulation and deep self-awareness.",
    "services.s2_title": "Group workshops",
    "services.s2_text": "Experiential workshops blending martial arts, somatic practice and awareness work for groups and organizations.",
    "services.s3_title": "Professional trainings",
    "services.s3_text": "Programs for instructors and therapists who wish to integrate embodied approaches into their work.",
    "services.s4_title": "Lectures & courses",
    "services.s4_text": "Talks and structured courses on body–mind, regulation, resilience and embodied leadership.",
    "services.s5_title": "Retreats",
    "services.s5_text": "Multi-day deep dives — practice, silence, nature and integration.",

    // Programs
    "programs.title": "Programs & trainings",
    "programs.subtitle": "Selected programs, each crafted to meet a specific need.",
    "programs.cta": "Details & registration",

    // Performance
    "performance.title": "Performance under pressure",
    "performance.body": "People who live in high-pressure environments need more than technique — they need nervous-system intelligence. Clarity, arousal regulation and precision even as the load rises.",
    "performance.footnote": "The work weaves physical practice, breath regulation and mental strategies into the kind of inner stability that allows precise performance.",
    "performance.aud_1": "Performers",
    "performance.aud_2": "Athletes",
    "performance.aud_3": "Elite units",
    "performance.aud_4": "Leaders",
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
    "blog.subtitle": "Essays, podcasts and conversations on practice, body and presence.",
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
    "contact.subtitle": "For one-on-one training, workshops, trainings or collaborations — I'd love to hear from you.",
    "contact.email": "info@eranbert.com",
    "contact.cta": "Send",
    "contact.name": "Name",
    "contact.email_label": "Email",
    "contact.message": "Message",

    // Footer
    "footer.brand": "ERAN BERT",
    "footer.tagline": "Practice · Movement · Martial arts · Awareness",
    "footer.rights": "All rights reserved",

    // Language
    "lang.switch": "Language",
  },
};

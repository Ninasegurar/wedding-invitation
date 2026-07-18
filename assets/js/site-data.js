/* ================================================================
   SITE-DATA.JS  —  THE ONLY FILE YOU NEED TO EDIT FOR CONTENT
   ================================================================
   This file holds every piece of editable information on the site:
   your names, the date, ceremony & reception details, your story,
   the livestream link, and the guestbook connections.

   Because visitors only ever load the *finished* HTML pages, there is
   no way for anyone but you (the person editing this file and
   re-publishing the site) to change anything here. Guests can only
   view pages and submit guestbook notes — they cannot edit this file.

   HOW TO EDIT:
   1. Open this file in any text editor.
   2. Change the values between the quotes " " — don't change the
      names on the left side of each colon.
   3. Save the file and re-upload/redeploy your site (see SETUP.md).

   Dates should be written as ISO strings: "YYYY-MM-DDTHH:MM:SS"
   in 24-hour time, e.g. 2:30 PM = "14:30:00".
   ================================================================ */

window.SITE_DATA = {

  // ---------------------------------------------------------------
  // THE COUPLE
  // ---------------------------------------------------------------
  couple: {
    partnerOne: "Partner One",
    partnerTwo: "Partner Two",
    hashtag: "" // optional, e.g. "#PartnerOneAndPartnerTwo2026" — leave blank to hide
  },

  // ---------------------------------------------------------------
  // WEDDING DATE (used for hero text + livestream countdown)
  // ---------------------------------------------------------------
  wedding: {
    dateDisplay: "August 22, 2026",     // shown as text throughout the site
    isoDateTime: "2026-08-22T11:00:00"  // used to power the countdown — set to ceremony start
  },

  // ---------------------------------------------------------------
  // CEREMONY
  // ---------------------------------------------------------------
  ceremony: {
    venueName: "St. Augustine Chapel",
    addressLine: "123 Garden Lane, Napa, CA",
    mapsUrl: "https://maps.google.com/?q=St.+Augustine+Chapel+123+Garden+Lane+Napa+CA",
    startTime: "11:00 AM",
    endTime: "12:00 PM"
  },

  // ---------------------------------------------------------------
  // RECEPTION
  // ---------------------------------------------------------------
  reception: {
    venueName: "The Vinewood Estate",
    addressLine: "456 Hillside Road, Napa, CA",
    mapsUrl: "https://maps.google.com/?q=The+Vinewood+Estate+456+Hillside+Road+Napa+CA",
    startTime: "1:00 PM",
    endTime: "11:00 PM"
  },

  // ---------------------------------------------------------------
  // OUR STORY — add, remove, or edit as many chapters as you like
  // ---------------------------------------------------------------
  story: [
    {
      date: "Spring 2019",
      heading: "How We Met",
      text: "Replace this with the story of how you first met — the place, the moment, the small detail neither of you forgot."
    },
    {
      date: "Winter 2021",
      heading: "Moving In Together",
      text: "Replace this with the next chapter of your story."
    },
    {
      date: "Autumn 2025",
      heading: "The Proposal",
      text: "Replace this with the story of the proposal — where it happened and how it felt."
    },
    {
      date: "August 22, 2026",
      heading: "Our Wedding Day",
      text: "And now, we can't wait to celebrate with the people we love most."
    }
  ],

  // ---------------------------------------------------------------
  // PHOTOS — drop image files into assets/img/gallery/ then list the
  // filenames here in the order you want them to appear.
  // ---------------------------------------------------------------
  gallery: [
    // "engagement-01.jpg",
    // "engagement-02.jpg",
    // "trip-paris.jpg"
  ],

  // ---------------------------------------------------------------
  // LIVESTREAM
  // ---------------------------------------------------------------
  livestream: {
    // Paste the EMBED URL from YouTube/Vimeo here once you have it.
    // YouTube: use the "Embed" link, formatted like:
    //   https://www.youtube.com/embed/VIDEO_ID
    // Vimeo:
    //   https://player.vimeo.com/video/VIDEO_ID
    // Leave blank until you're ready to go live — a placeholder will show instead.
    embedUrl: "",

    // A normal shareable link, shown as a backup "Watch on YouTube" button
    watchPageUrl: "",

    // Shown under the countdown so guests know their local time may differ
    timezoneNote: "All times shown in Pacific Time (PT)"
  },

  // ---------------------------------------------------------------
  // GUESTBOOK — see SETUP.md for how to get these values
  // ---------------------------------------------------------------
  guestbook: {
    // 1) Formspree sends you both an email every time someone signs the guestbook.
    //    Create a free form at https://formspree.io and paste its endpoint below.
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",

    // 2) Supabase stores the messages so they can be displayed publicly on this page.
    //    Create a free project at https://supabase.com and paste the values below.
    //    Full step-by-step instructions are in SETUP.md.
    supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
    supabaseTable: "guestbook"
  },

  // Emails that should receive guestbook notifications (informational —
  // the actual recipients are configured in your Formspree form settings)
  notifyEmails: [
    "ninasegurar@icloud.com",
    "partner@example.com"
  ]
};

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
    partnerOne: "Siddharth",
    partnerTwo: "Danielle",
    hashtag: "" // optional, e.g. "#PartnerOneAndPartnerTwo2026" — leave blank to hide
  },
  // ---------------------------------------------------------------
  // WEDDING DATE (used for hero text + livestream countdown)
  // ---------------------------------------------------------------
  wedding: {
    dateDisplay: "August 22, 2026",     // shown as text throughout the site
    isoDateTime: "2026-08-22T11:00:00-04:00"  // used to power the countdown — set to ceremony start
  },
  // ---------------------------------------------------------------
  // CEREMONY
  // ---------------------------------------------------------------
  ceremony: {
    venueName: "Randolph Church",
    addressLine: "US Route 2, Randolph, NH 03593",
    mapsUrl: "https://maps.app.goo.gl/cWdnxgfHiUXs8eFk8",
    startTime: "10:30 AM",
    endTime: "11:30 AM"
  },
  // ---------------------------------------------------------------
  // RECEPTION
  // ---------------------------------------------------------------
  reception: {
    venueName: "Omni Mount Washington",
    addressLine: "310 Mount Washington Hotel Rd, Bretton Woods, NH 03575",
    mapsUrl: "https://maps.app.goo.gl/5rLwdRG1cBTegnbv5",
    startTime: "1:00 PM",
    endTime: "4:00 PM"
  },
  // ---------------------------------------------------------------
  // ATTIRE — shown as a note on the Details page. Edit freely; this
  // will no longer get overwritten by future site updates.
  // ---------------------------------------------------------------
  attireNote: "Attire: semi-formal, but wear what is comfortable! I would suggest saving your hiking boots for Sunday tho! :)",
  // ---------------------------------------------------------------
  // OUR STORY — add, remove, or edit as many chapters as you like
  // ---------------------------------------------------------------
  story: [
    {
      date: "Spring 2024",
      heading: "How We Met",
      text: "We met each other in early spring of 2024 and started dating in the summer of 2024. From the very beginning, something about us just felt right. Taking things slowly we let our relationship unfold naturally. But it didn’t take long to realize that what we had was something special."
    },
    {
      date: "Summer 2025",
      heading: "Moving In Together",
      text: "After spending our first Christmas together, being together simply became part of everyday life. Most days were spent side by side, and somewhere along the way, two separate lives began to feel like one. By May 2025, we officially made a home together — although in many ways, it already felt like we had."
    },
    {
      date: "Spring 2026",
      heading: "The Proposal",
      text: "Our story has never been about one grand moment. It has been about how easy and natural it has felt from the beginning, the life we’ve built together, and the quiet certainty that we had found something meant to last. Marriage had come up more than once, so when Sid officially asked the question, it felt less like a surprise and more like the natural next step in a life we already knew we wanted to share. Fittingly, it happened in one of our favorite ways to have the conversations that matter most — early in the morning, before the day had really begun. And the answer felt just as natural: it would be an honor to spend the rest of our lives together."
    },
    {
      date: "August 22, 2026",
      heading: "Our Wedding Day",
      text: "Now, we couldn’t be happier to begin the next chapter together—and to celebrate it with the people we love most."
    }
  ],
  // ---------------------------------------------------------------
  // PHOTOS — drop image files into assets/img/gallery/ then list the
  // filenames here in the order you want them to appear.
  // ---------------------------------------------------------------
  gallery: [
    "key west.jpeg",
    "rock garden 1.jpg",
    "mammoth cave.jpg",
    "icy cold.jpg",
    "airshow.jpeg",
    "yellow porche 2.PNG",
    "asheville 1.jpeg",
    "boston.jpeg",
    "drone flying.jpg",
    "florida panhandle.jpeg",
    "jack daniels .jpeg",
    "more panhandle.jpeg",
    "mt washington.jpeg",
    "the basin.jpeg",
    "vocho.jpeg",
    "waterfall NC.jpeg"
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
    embedUrl: "ttps://evt.live/siddharth_si1295/siddharth-and-danielle-wedding-live-stream/embed?autoplay=true",
    // A normal shareable link, shown as a backup "Watch on YouTube" button
    watchPageUrl: "",
    // Shown under the countdown so guests know their local time may differ
    timezoneNote: "All times shown in US Eastern Time (ET)"
  },
  // ---------------------------------------------------------------
  // GUESTBOOK — see SETUP.md for how to get these values
  // ---------------------------------------------------------------
  guestbook: {
    // 1) Formspree sends you both an email every time someone signs the guestbook.
    //    Create a free form at https://formspree.io and paste its endpoint below.
    formspreeEndpoint: "https://formspree.io/f/mgogjzdv",
    // 2) Supabase stores the messages so they can be displayed publicly on this page.
    //    Create a free project at https://supabase.com and paste the values below.
    //    Full step-by-step instructions are in SETUP.md.
    supabaseUrl: "https://sylxxhfhmjtvaekfrkcd.supabase.co",
    supabaseAnonKey: "sb_publishable_ZQON32nifIT0kcBuNtHAeA__L3RRVw2",
    supabaseTable: "guestbook"
  },
  // Emails that should receive guestbook notifications (informational —
  // the actual recipients are configured in your Formspree form settings)
  notifyEmails: [
    "ninasegurar@icloud.com",
    "siddharth.si@gmail.com"
  ]
};

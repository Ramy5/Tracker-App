/**
 * Resolves a subscription service name to a simple-icons slug.
 * simple-icons has 3,400+ brand SVG icons — the React Native equivalent of react-icons.
 * Falls back to an Ionicons name (by category) when no brand match is found.
 *
 * All simple-icons render in black (#000) by default; pass a `color` prop to tint them.
 */

export type IconLib = "simple" | "ionicons";

export interface ResolvedIcon {
  lib: IconLib;
  /** simple-icons: slug string (e.g. "spotify")
   *  ionicons: icon name (e.g. "musical-notes") */
  name: string;
}

// ---------------------------------------------------------------------------
// simple-icons slug map
// Each entry: [[...keywords that match in the subscription name], "slug"]
// Slugs are verified against simple-icons v14 (3417 icons).
// ---------------------------------------------------------------------------
const SIMPLE_ICONS_MAP: [string[], string][] = [
  // ── Streaming / Entertainment ─────────────────────────────────────────
  [["spotify"], "spotify"],
  [["netflix"], "netflix"],
  [["youtube", "youtube premium", "youtube tv", "youtube music"], "youtube"],
  [["twitch"], "twitch"],
  [["vimeo"], "vimeo"],
  [["soundcloud"], "soundcloud"],
  [["bandcamp"], "bandcamp"],
  [["deezer"], "deezer"],
  [["tidal"], "tidal"],
  [["mixcloud"], "mixcloud"],
  [["tumblr"], "tumblr"],
  [["hbo", "hbo max"], "hbomax"],
  [["max"], "max"],
  [["crunchyroll"], "crunchyroll"],
  [["paramount", "paramount+", "paramount plus"], "paramountplus"],
  [["lastfm", "last.fm"], "lastfm"],
  [["soundcloud"], "soundcloud"],

  // ── Apple ─────────────────────────────────────────────────────────────
  [["icloud", "apple icloud"], "icloud"],
  [["apple tv", "appletv"], "appletv"],
  [["apple music"], "applemusic"],
  [["apple arcade"], "applearcade"],
  [["apple"], "apple"],

  // ── Google ────────────────────────────────────────────────────────────
  [["google drive", "gdrive"], "googledrive"],
  [["google play"], "googleplay"],
  [["google meet"], "googlemeet"],
  [["google workspace", "gsuite", "g suite"], "google"],
  [["google"], "google"],

  // ── Amazon ────────────────────────────────────────────────────────────
  [["amazon"], "amazon"],

  // ── Microsoft ─────────────────────────────────────────────────────────
  [["microsoft"], "microsoft"],

  // ── Social / Chat ─────────────────────────────────────────────────────
  [["discord"], "discord"],
  [["slack"], "slack"],
  [["reddit"], "reddit"],
  [["snapchat"], "snapchat"],
  [["tiktok"], "tiktok"],
  [["twitter", "x premium", "twitter blue"], "twitter"],
  [["facebook"], "facebook"],
  [["instagram"], "instagram"],
  [["linkedin", "linkedin premium"], "linkedin"],
  [["whatsapp"], "whatsapp"],
  [["telegram"], "telegram"],
  [["mastodon"], "mastodon"],
  [["skype"], "skype"],
  [["zoom"], "zoom"],
  [["loom"], "loom"],
  [["quora"], "quora"],

  // ── Design & Creative ─────────────────────────────────────────────────
  [["figma"], "figma"],
  [["sketch"], "sketch"],
  [["invision"], "invision"],
  [["framer"], "framer"],
  [["miro"], "miro"],
  [["behance"], "behance"],
  [["dribbble"], "dribbble"],
  [["deviantart"], "deviantart"],
  [["artstation"], "artstation"],

  // ── Productivity / Collaboration ──────────────────────────────────────
  [["notion"], "notion"],
  [["dropbox"], "dropbox"],
  [["evernote"], "evernote"],
  [["trello"], "trello"],
  [["asana"], "asana"],
  [["airtable"], "airtable"],
  [["basecamp"], "basecamp"],
  [["clickup"], "clickup"],
  [["linear"], "linear"],
  [["todoist"], "todoist"],
  [["obsidian"], "obsidian"],
  [["grammarly"], "grammarly"],
  [["duolingo"], "duolingo"],

  // ── Dev Tools / Cloud ─────────────────────────────────────────────────
  [["github", "github actions"], "github"],
  [["gitlab"], "gitlab"],
  [["bitbucket"], "bitbucket"],
  [["docker"], "docker"],
  [["jira", "atlassian", "confluence"], "atlassian"],
  [["confluence"], "confluence"],
  [["jenkins"], "jenkins"],
  [["circleci"], "circleci"],
  [["sentry"], "sentry"],
  [["datadog"], "datadog"],
  [["grafana"], "grafana"],
  [["cloudflare"], "cloudflare"],
  [["digitalocean", "digital ocean"], "digitalocean"],
  [["google cloud", "gcp"], "googlecloud"],
  [["vercel"], "vercel"],
  [["netlify"], "netlify"],
  [["heroku"], "heroku"],
  [["codepen"], "codepen"],
  [["stackoverflow", "stack overflow"], "stackoverflow"],
  [["hackerrank"], "hackerrank"],
  [["kaggle"], "kaggle"],
  [["npm"], "npm"],
  [["react", "reactjs"], "react"],
  [["angular"], "angular"],
  [["vue", "vuejs"], "vuedotjs"],
  [["python"], "python"],
  [["swift"], "swift"],
  [["php"], "php"],
  [["java"], "java"],
  [["sass"], "sass"],
  [["laravel"], "laravel"],
  [["symfony"], "symfony"],
  [["drupal"], "drupal"],
  [["joomla"], "joomla"],
  [["wordpress"], "wordpress"],
  [["shopify"], "shopify"],
  [["wix"], "wix"],
  [["squarespace"], "squarespace"],
  [["webflow"], "webflow"],
  [["mongodb", "mongo"], "mongodb"],
  [["redis"], "redis"],
  [["elasticsearch", "elastic"], "elasticsearch"],
  [["snowflake"], "snowflake"],
  [["mixpanel"], "mixpanel"],
  [["zendesk"], "zendesk"],
  [["hubspot"], "hubspot"],
  [["mailchimp"], "mailchimp"],
  [["zapier"], "zapier"],
  [["ifttt"], "ifttt"],

  // ── AI / LLM ──────────────────────────────────────────────────────────
  [["anthropic"], "anthropic"],
  [["claude"], "claude"],
  [["openai", "chatgpt", "gpt"], "openai"],

  // ── Security / VPN / Password ─────────────────────────────────────────
  [["1password", "one password", "1 password"], "1password"],
  [["bitwarden"], "bitwarden"],
  [["lastpass"], "lastpass"],
  [["dashlane"], "dashlane"],
  [["keeper"], "keeper"],
  [["nordvpn", "nord vpn"], "nordvpn"],
  [["expressvpn", "express vpn"], "expressvpn"],
  [["protonmail", "proton mail"], "protonmail"],
  [["protonvpn", "proton vpn"], "protonvpn"],
  [["surfshark"], "surfshark"],

  // ── Finance / E-commerce ──────────────────────────────────────────────
  [["paypal"], "paypal"],
  [["stripe"], "stripe"],
  [["etsy"], "etsy"],
  [["ebay"], "ebay"],
  [["shopify"], "shopify"],
  [["patreon"], "patreon"],

  // ── Gaming ────────────────────────────────────────────────────────────
  [["steam"], "steam"],
  [["playstation", "psn", "ps plus", "ps4", "ps5"], "playstation"],
  [["unity"], "unity"],

  // ── Other well-known ──────────────────────────────────────────────────
  [["airbnb"], "airbnb"],
  [["uber"], "uber"],
  [["lyft"], "lyft"],
  [["yelp"], "yelp"],
  [["strava"], "strava"],
  [["yahoo"], "yahoo"],
  [["producthunt", "product hunt"], "producthunt"],
  [["medium"], "medium"],
  [["intercom"], "intercom"],
  [["macos"], "macos"],
  [["android"], "android"],
  [["raspberry pi", "raspberrypi"], "raspberrypi"],
];

// ---------------------------------------------------------------------------
// Ionicons fallback by category
// ---------------------------------------------------------------------------
const CATEGORY_FALLBACK: Record<string, string> = {
  Entertainment: "play-circle",
  "AI Tools": "sparkles",
  "Developer Tools": "code-slash",
  Design: "color-palette",
  Productivity: "checkmark-circle",
  Cloud: "cloud",
  Music: "musical-notes",
  Other: "apps",
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export function resolveSubscriptionIcon(
  name: string,
  category?: string,
): ResolvedIcon {
  const lower = name.toLowerCase().trim();

  for (const [keywords, slug] of SIMPLE_ICONS_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return { lib: "simple", name: slug };
    }
  }

  const fallbackName =
    (category && CATEGORY_FALLBACK[category]) ?? CATEGORY_FALLBACK.Other;
  return { lib: "ionicons", name: fallbackName };
}

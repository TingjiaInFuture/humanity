/* Edit only the Worker URL after deployment. repositoryUrl can stay empty on USER.github.io/REPO.
   turnstileSiteKey: set it (and the Worker's TURNSTILE_SECRET secret) to enable the
   Cloudflare Turnstile human-verification challenge on both public forms. */
window.HUMANITY_CHARTER_CONFIG = {
  apiBaseUrl: "https://humanity-charter-api.ztjsb.workers.dev",
  repositoryUrl: "",
  turnstileSiteKey: ""
};

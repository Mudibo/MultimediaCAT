"use strict";

/*
  Initializes button behavior after DOM is available.
  This keeps the script resilient regardless of script loading strategy.
*/
function initVideoToggle() {
  const wildlifeVideo = document.getElementById("wildlifeVideo");
  const toggleBtn = document.getElementById("toggleBtn");

  if (!wildlifeVideo || !toggleBtn) {
    console.error("Required elements (#wildlifeVideo or #toggleBtn) were not found.");
    return;
  }

  /*
    Toggles video visibility and playback state.
    - Hidden: pause video and show 'Show Video'
    - Visible: play video and show 'Hide Video'
  */
  function toggleVideoVisibility() {
    const isHidden = wildlifeVideo.hidden;

    if (isHidden) {
      wildlifeVideo.hidden = false;
      wildlifeVideo
        .play()
        .catch(() => {
          // Playback can fail without user gesture in some browser policies.
        });
      toggleBtn.textContent = "Hide Video";
      return;
    }

    wildlifeVideo.hidden = true;
    wildlifeVideo.pause();
    toggleBtn.textContent = "Show Video";
  }

  /*
    Attach event listener as required.
    Inline handlers are intentionally not used.
  */
  toggleBtn.addEventListener("click", toggleVideoVisibility);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVideoToggle);
} else {
  initVideoToggle();
}

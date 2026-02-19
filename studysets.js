(() => {
  // Get the course ID from the URL.
  const courseId = new URLSearchParams(document.location.search).get("course");

  // If no course ID is provided, redirect to the home page.
  if(!courseId) {
    window.location.href = "/";
    return;
  }

  document.querySelector('main > p').textContent = `Course ID: ${courseId}`;

  // TODO: Fetch course data from backend.

  // TODO: Populate page with course data.
})();

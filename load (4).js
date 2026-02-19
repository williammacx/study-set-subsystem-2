import { get } from './js/api.js';
import { getPartOfDay } from './js/date.js';
import { templateReplace } from './js/template.js';

// Templates.
const TEMPLATE_COURSE_CARD = `
  <div class="cursor-pointer rounded-lg transition-all duration-200 ease-in-out shadow-sm hover:shadow-md border border-gray-200 grow md:grow-0" course-id="$ID$">
    <img src="$THUMBNAIL$" class="w=full aspect-video rounded-tl-lg rounded-tr-lg" />
    <div class="p-2 flex flex-col">
      <p class="text-sm font-semibold">$NAME$</p>
      <p class="text-xs text-gray-500">$SUBTITLE$</p>
    </div>
  </div>
`;

// Element references.
const title = document.querySelector('#title');
const courseList = document.querySelector('#course-list');

// * BEGIN AUTO RUN CODE

(async () => {
  // Display welcome message.
  const partOfDay = getPartOfDay();
  // TODO: Add name of user.
  title.textContent = `Good ${partOfDay},`;

  // Fetch courses.
  const courses = await get('/courses');

  // Render courses.
  courseList.innerHTML = '';
  courses.forEach((course) => {
    // Build course card.
    const element = templateReplace(TEMPLATE_COURSE_CARD, {
      '$ID$': course.id,
      '$THUMBNAIL$': course.thumbnail,
      '$NAME$': course.crn,
      '$SUBTITLE$': course.name
    });

    // Add to course list.
    courseList.insertAdjacentHTML('beforeend', element);

    // Add click event listener.
    const courseCard = courseList.querySelector(`[course-id="${course.id}"]`);
    courseCard.addEventListener('click', () => {
      // Navigate to course page.
      window.location.href = `course?course=${course.id}`;
    });
  });
})();

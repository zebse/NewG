let currentCourses = 6; // Initially, show 6 courses

// Function to display the courses
function displayCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear previous courses

    // Loop through the courses and display them
    for (let i = 0; i < currentCourses; i++) {
        const course = courses[i];
        const courseItem = `
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4" data-aos="zoom-in" data-aos-delay="100">
                <div class="course-item">
                    <div class="course-content">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <p class="price"><i class="bi bi-award"></i></p>
                            <p class="category">${course.category}</p>
                        </div>
                        <h3><a href="course-details.html">${course.title}</a></h3>
                        <p class="description">${course.description}</p>
                        <div class="course-details">
                            <ul class="details-list">
                                <li class="detail-item"><i class="bi bi-clock"></i>${course.duration}</li>
                                <li class="detail-item"><i class="bi bi-mortarboard"></i>${course.degree}</li>
                                <li class="detail-item"><i class="bi bi-calendar"></i>${course.mode}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        courseList.innerHTML += courseItem;
    }
}

// Show more or less courses when the button is clicked
document.getElementById('seeMoreBtn').addEventListener('click', () => {
    if (currentCourses === courses.length) {
        currentCourses = 6; // Reset to 6 courses when "See Less" is clicked
        document.getElementById('seeMoreBtn').textContent = 'See More Courses'; // Change button text back to "See More"
    } else {
        currentCourses += 6; // Increase the number of courses displayed
        if (currentCourses >= courses.length) {
            currentCourses = courses.length; // Limit to total available courses
            document.getElementById('seeMoreBtn').textContent = 'See Less Courses'; // Change button text to "See Less"
        }
    }
    displayCourses(); // Update the course display
});

// Initial display
displayCourses();

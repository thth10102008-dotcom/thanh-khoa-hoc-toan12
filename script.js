const courseContainer = document.getElementById("courseContainer");
const searchInput = document.getElementById("searchInput");

function renderCourses(data){

    courseContainer.innerHTML = "";

    data.forEach((chapter,index)=>{

        const chapterBox = document.createElement("div");
        chapterBox.className = "chapter";

        chapterBox.innerHTML = `
            <div class="chapter-header">
                <span>${chapter.title}</span>
                <span>▼</span>
            </div>

            <div class="chapter-content">
                ${chapter.lessons.map(lesson => `
                    <div class="lesson">

                        <h3>${lesson.title}</h3>

                        <div class="lesson-links">

                            ${lesson.video ? `
                            <a href="${lesson.video}"
                               target="_blank"
                               class="btn video">
                               🎥 Video
                            </a>
                            ` : ""}

                            ${lesson.document ? `
                            <a href="${lesson.document}"
                               target="_blank"
                               class="btn document">
                               📄 Tài liệu
                            </a>
                            ` : ""}

                            ${lesson.homework ? `
                            <a href="${lesson.homework}"
                               target="_blank"
                               class="btn homework">
                               📝 BTVN
                            </a>
                            ` : ""}

                            ${lesson.answer ? `
                            <a href="${lesson.answer}"
                               target="_blank"
                               class="btn answer">
                               ✅ Chữa BTVN
                            </a>
                            ` : ""}

                        </div>

                    </div>
                `).join("")}
            </div>
        `;

        courseContainer.appendChild(chapterBox);
    });

    setupAccordion();
}

function setupAccordion(){

    const headers =
        document.querySelectorAll(".chapter-header");

    headers.forEach(header => {

        header.addEventListener("click",()=>{

            const content =
                header.nextElementSibling;

            if(content.style.display === "block"){
                content.style.display = "none";
            }else{
                content.style.display = "block";
            }

        });

    });

}

searchInput.addEventListener("keyup",()=>{

    const keyword =
        searchInput.value.toLowerCase();

    const filtered =
        courses.map(chapter => {

            return {
                ...chapter,
                lessons: chapter.lessons.filter(lesson =>
                    lesson.title
                    .toLowerCase()
                    .includes(keyword)
                )
            };

        }).filter(chapter =>
            chapter.lessons.length > 0
        );

    renderCourses(filtered);

});

renderCourses(courses);

const list = document.getElementById("timeline");

async function loadTimeline() {
    const res = await fetch('./json/timeline.json');
    const data = await res.json();

    data.forEach(post => {
        const resonator = `
            <div class="timeline-row">
                <div class="timeline-date">
                    <div class="right">${post.date}</div>
                </div>
                <div class="middle-bar">
                    <div class="dot"></div>
                </div>
                <div class="timeline-item">
                    <h2>${post.title}</h2>
                    <h3 class="item-tag">${post.tag}</h3>
                    <p>${post.desc}</p> 
                </div>
            </div>
        `;
        list.insertAdjacentHTML("beforeend", resonator);

    });
}

loadTimeline();

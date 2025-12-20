const list = document.getElementById("timeline");

async function loadTimeline() {
    const res = await fetch('./json/timeline.json');
    const data = await res.json();

    data.forEach(post => {
        const resonator = `
            <div class="timeline-container right">
                <div class="date">${post.date}</div>
            </div>
            <div class="middle-bar">
                <div class="dot"></div>
            </div>
            <div class="timeline-container timeline-bg">
                <h2>${post.title}</h2>
                <h3>${post.tag}</h3>
                <p>${post.desc}</p> 
            </div>
        `;
        list.insertAdjacentHTML("beforeend", resonator);

    });
}

loadTimeline();
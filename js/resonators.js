const list = document.getElementById("list");

fetch('./wuwa_data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            let resonator =
                `<div class="item">
                    <img src="./assets/chars_icon/${post.id}.png">
                    <div class="name">${post.name}</div>
                    <div class="attribute">${post.attribute}</div>
                </div>`;
            list.insertAdjacentHTML("beforeend", resonator);
        });
        //console.log(data);
    });

const list = document.getElementById("list");

fetch('/wuwa_data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            let resonator =
                `<div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-full" src="./assets/chars_icon/${post.id}.png">
                    <div class="px-3 py-4">
                        <div class="font-bold text-xl mb-2">${post.name}</div>
                        <p class="text-gray-700 text-base">${post.rarity}</p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${post.attribute}</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${post.weapon}</span>
                    </div>
                </div>`;
            list.insertAdjacentHTML("beforeend", resonator);
        });
        //console.log(data);
    });
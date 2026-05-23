const list = document.getElementById("list");
const filterAtribut = [];
const filterWeapon = [];
const filterRarity = [];
const reset = [];
const filterRules = {
    attribute: filterAtribut,
    weapon: filterWeapon,
    rarity: filterRarity
};

const sortState = {
    key: null,
    direction: "asc"
};

// dropdown value -> JSON field name
const sortKeyMap = {
    "name": "name",
    "release-date": "release",
    "rarity": "rarity",
    "attribute": "attribute",
    "weapon": "weapon",
    "gender": "gender",
    "affiliation": "affiliation"
};

const numericSortKeys = new Set(["rarity"]);

function sortData(data) {
    if (!sortState.key) return data;
    const field = sortKeyMap[sortState.key];
    if (!field) return data;
    const isNumeric = numericSortKeys.has(field);
    const dir = sortState.direction === "asc" ? 1 : -1;

    return [...data].sort((a, b) => {
        let va = a[field];
        let vb = b[field];
        if (isNumeric) {
            va = Number(va) || 0;
            vb = Number(vb) || 0;
            return (va - vb) * dir;
        }
        va = (va ?? "").toString().toLowerCase();
        vb = (vb ?? "").toString().toLowerCase();
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
    });
}

async function loadWutheringData() {
    const res = await fetch('./json/wuwa_data.json');
    const data = await res.json();
    let counter = 0;

    const filteredData = data.filter(post => {
        for (const key in filterRules) {
            if (!filterRules[key] || filterRules[key].length === 0) continue;

            if (!filterRules[key].includes(post[key])) {
                return false;
            }
        }
        return true;
    });

    const sortedData = sortData(filteredData);

    sortedData.forEach(post => {
        const resonator = `
            <div class="item" data-rarity="${post.rarity}" data-attribute="${post.attribute}">
                <img class="img-reso" src="./assets/chars_icon/${post.id}.png" alt="${post.name}">
                <div class="attribute">
                    <img class="img-attribute" src="./assets/attributes/${post.attribute}.png" alt="${post.attribute}">
                    <img class="img-attribute" src="./assets/weapons/${post.weapon}.webp" alt="${post.weapon}">
                </div>
                <div class="name">${post.name}</div>
            </div>
        `;
        list.insertAdjacentHTML("beforeend", resonator);
        counter++;
    });

    document.getElementById("counter").innerHTML = "Total : " + counter;
}

function toggleValueAttribute(element, value) {
    const index = filterRules.attribute.indexOf(value);

    if (index === -1) {
        filterRules.attribute.push(value);
    } else {
        filterRules.attribute.splice(index, 1);
    }

    document.getElementById('filter-value-attribute').value = filterRules.attribute;
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

function toggleValueWeapon(element, value) {
    const index = filterRules.weapon.indexOf(value);

    if (index === -1) {
        filterRules.weapon.push(value);
    } else {
        filterRules.weapon.splice(index, 1);
    }

    document.getElementById('filter-value-weapon').value = filterRules.weapon;
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

function toggleValueRarity(element, value) {
    const index = filterRules.rarity.indexOf(value);

    if (index === -1) {
        filterRules.rarity.push(value);
    } else {
        filterRules.rarity.splice(index, 1);
    }

    document.getElementById('filter-value-rarity').value = filterRules.rarity;
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

function resetValueFilter(){
    filterRules.attribute.length = 0;
    filterRules.weapon.length = 0;
    filterRules.rarity.length = 0;
    document.getElementById('filter-value-attribute').value = "";
    document.getElementById('filter-value-weapon').value = "";
    document.getElementById('filter-value-rarity').value = "";
    document.querySelectorAll(".attri-btn.active, .weapon-btn.active, .rarity-btn.active")
        .forEach(btn => btn.classList.remove("active"));
    document.getElementById("dropdown-sort").selectedIndex = 0;
    sortState.key = null;
    sortState.direction = "asc";
    updateSortBtnLabel();
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

function updateSortBtnLabel() {
    const asc = document.getElementById("sort-asc");
    const desc = document.getElementById("sort-desc");
    if (!asc || !desc) return;
    const active = sortState.key ? sortState.direction : null;
    asc.classList.toggle("active", active === "asc");
    desc.classList.toggle("active", active === "desc");
}

loadWutheringData();

document.querySelectorAll(".attri-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        toggleValueAttribute(btn, btn.dataset.value);
    });
    });
    document.querySelectorAll(".weapon-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        toggleValueWeapon(btn, btn.dataset.value);
    });
    });
    document.querySelectorAll(".rarity-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        toggleValueRarity(btn, btn.dataset.value);
    });
});

document.getElementById("dropdown-sort").addEventListener("change", (e) => {
    sortState.key = e.target.value || null;
    if (sortState.key && !["asc", "desc"].includes(sortState.direction)) {
        sortState.direction = "asc";
    }
    updateSortBtnLabel();
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
});

document.querySelectorAll(".sort-dir-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const dir = btn.dataset.dir;
        if (!sortState.key) {
            const dropdown = document.getElementById("dropdown-sort");
            const firstOpt = Array.from(dropdown.options).find(o => !o.disabled);
            if (!firstOpt) return;
            dropdown.value = firstOpt.value;
            sortState.key = firstOpt.value;
        }
        sortState.direction = dir;
        updateSortBtnLabel();
        document.getElementById("list").innerHTML = "";
        loadWutheringData();
    });
});


//-----------------------------   TEST   ---------------------------------------------




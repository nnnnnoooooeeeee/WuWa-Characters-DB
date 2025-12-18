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

async function loadWutheringData() {
    const res = await fetch('./wuwa_data.json');
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

    filteredData.forEach(post => {
        const resonator = `
            <div class="item">
                <img src="./assets/chars_icon/${post.id}.png" alt="${post.name}">
                <div class="name">${post.name}</div>
                <div class="attribute" style="background-color: ${bgattribute(post.attribute)};">
                    ${post.attribute} ${post.weapon}
                </div>
            </div>
        `;
        list.insertAdjacentHTML("beforeend", resonator);
        counter++;
    });

    document.getElementById("counter").innerHTML = counter;
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
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

loadWutheringData();

function bgattribute(value) {
    const colors = {
        Spectro:  "#BBA91D",
        Fusion:   "#c62b4d",
        Aero:     "#2DC59D",
        Glacio:   "#39B0D3",
        Havoc:    "#971654",
        Electro:  "#A833B1"
    };

    return colors[value] || "#999";
}




//-----------------------------   TEST   ---------------------------------------------




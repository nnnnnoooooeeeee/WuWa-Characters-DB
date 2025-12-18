const list = document.getElementById("list");
const filterAtribut = [];
const filterWeapon = ['Sword'];

async function loadWutheringData() {
    const res = await fetch('./wuwa_data.json');
    const data = await res.json();
    var counter = 1;

    //filter filterattribute
    data.filter(post => {
        if (filterAtribut.length > 0) {
            return filterAtribut.includes(post.attribute);
        } else{
            return true;
        }
    })
    //show
        .map((post)=>{
            const resonator =
                `<div class="item">
                    <img src="./assets/chars_icon/${post.id}.png" alt="${post.name}">
                    <div class="name">${post.name}</div>
                    <div class="attribute" style="background-color: ${bgattribute(post.attribute)};">${post.attribute} ${post.weapon}</div>
                </div>`;
            list.insertAdjacentHTML("beforeend", resonator);
            counter++;
        })
        //count resonators
        document.getElementById("counter").innerHTML = counter;
}

loadWutheringData();

function toggleValue(element, value) {
    const index = filterAtribut.indexOf(value);

    if (index === -1) {
        filterAtribut.push(value);
    } else {
        filterAtribut.splice(index, 1);
    }

    document.getElementById('filter-value').value = filterAtribut;
    document.getElementById("list").innerHTML = "";
    loadWutheringData();
}

function bgattribute(value) {
    if (value === "Spectro") return "#BBA91D";
    if (value === "Fusion")  return "#c62b4d";
    if (value === "Aero")    return "#2DC59D";
    if (value === "Glacio")  return "#39B0D3";
    if (value === "Havoc")   return "#971654";
    if (value === "Electro") return "#A833B1";
    return "green";
}




//-----------------------------   TEST   ---------------------------------------------

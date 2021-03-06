let posters = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/poster?_embed&per_page=20&_fields=id,_links";
let categories = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/language_category";

window.addEventListener("DOMContentLoaded", getCategories);

//fetch categories
function getCategories() {
    fetch(categories)
        .then(res => res.json())
        .then(setMaterial);
}

// everything together
function setMaterial(mat) {
    createFilters(mat);
    getPosters();
}

function createFilters(filt) {
    filt.forEach(category => {
        const button = document.createElement("button");
        button.setAttribute("id", category.slug);
        button.textContent = category.slug;

        document.querySelector(".categories").appendChild(button);

        document.querySelector("#all").classList.add("active");

        button.addEventListener('click', filterPosters);

    })
}

// fetch all of our posters
function getPosters() {
    fetch(posters)
        .then(res => res.json())
        .then(processData);
}

// start to divide the data
function processData(data) {
    // console.log("here are the posters");
    //  console.log(data);
    data.forEach(retrieveSinglePoster);
    document.querySelector(".load").style.display = "none";
}

function retrieveSinglePoster(eachPoster) {

    const template = document.querySelector("#posters").content;
    const clone = template.cloneNode(true);

    clone.querySelector('.box_container').classList.add(eachPoster._embedded["wp:term"][0][0].slug);
    clone.querySelector('.box_container').classList.add(eachPoster._embedded["wp:term"][0][1].slug);

    const images = eachPoster._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    clone.querySelector("img").src = images;

    // const links = clone.querySelector(".box_container a");


    // append child
    document.querySelector("main").appendChild(clone);
}


function filterPosters(post) {
    const clicked = post.target.id;


            document.querySelectorAll(".categories button").forEach(cat => {
            if (cat.id === clicked) {
                cat.classList.add("active");
            } else {
                cat.classList.remove("active");
            }
            })

    //filter posters
    const allBoxes = document.querySelectorAll('.box_container');
    allBoxes.forEach((box) => {
        if (box.classList[1] == clicked) {
            box.classList.remove("hide");
        } else if (box.classList[2] == clicked) {
            box.classList.remove("hide");
        } else {
            box.classList.add("hide")
        }
    });
}

console.log("ready");
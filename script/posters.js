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
        const categoriesMat = document.querySelectorAll(".categories button");
        console.log(button, "buttons")
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
}

function retrieveSinglePoster(eachPoster) {
    // console.log(eachPoster._embedded["wp:term"][0][0].slug)
    // console.log("each poster - category")

    const template = document.querySelector("#posters").content;
    const clone = template.cloneNode(true);

    clone.querySelector('.box_container').classList.add(eachPoster._embedded["wp:term"][0][0].slug);
    console.log("sup", eachPoster._embedded["wp:term"][0][0].slug)

    const images = eachPoster._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    clone.querySelector("img").src = images;


    // append child
    document.querySelector("main").appendChild(clone);
}


function filterPosters(post) {
    console.log("post", post);
    const clicked = post.target.id;
    console.log(post.target.id, "id")

    //Filter games
    const allBoxes = document.querySelectorAll('.box_container');
    allBoxes.forEach((box) => {
        if (box.classList[1] == clicked) {
            console.log("this is it", box)
            box.classList.remove("hide");
        } else {
            box.classList.add("hide")
        }
    //     //showAll
        const btnAll = document.querySelector("#all");
        btnAll.addEventListener("click", showAll);

        function showAll() {
            box.classList.remove("hide")
        }
    });
}
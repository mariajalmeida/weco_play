let posters = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/poster?_embed&per_page=20&_fields=id,_links";

window.addEventListener("DOMContentLoaded", getPosters);

// fetch all of our data
function getPosters() {
    fetch(posters)
        .then(res => res.json())
        .then(processData);
}

// start to divide the data
function processData(data) {
    console.log("here are the posters");
     console.log(data);
    data.forEach(retrieveSinglePoster);
}

function retrieveSinglePoster(eachPoster) {
    console.log(eachPoster)
    console.log("each poster")

    const template = document.querySelector("#posters").content;
    const clone = template.cloneNode(true);

    const images = eachPoster._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    clone.querySelector("img").src = images;


    // append child
    document.querySelector("main").appendChild(clone);
}
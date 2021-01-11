window.addEventListener("DOMContentLoaded", getData);

const gamesInfo = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail?per_page=2&filter[orderby]=rand&_embed";

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_game_id = urlParams.get("page");
    console.log(the_game_id);


    //    fetch("https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail/25?_embed")
    fetch("https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail/" + the_game_id + "?_embed")
        .then(res => res.json())
        .then(stuffReceived);

    setTimeout(function () {
        fetch(gamesInfo)
            .then((res) => {
                return res.json();
            })
            .then(cardsRetrieved);
    }, 200)

}


function stuffReceived(stuff) {
    showGame(stuff);
    createImages(stuff);
    createFeatures(stuff);
    createIngame(stuff);
}

// here's the flags
function createImages(lan) {
    lan.languages.forEach((lang) => {
        const lan_img = document.createElement("img");
        lan_img.src = lang.guid;
        document.querySelector(".languages").appendChild(lan_img);
    })
}

// here's the in-game images
function createIngame(ingame) {
    ingame.ingame_screenshots.forEach((cap) => {
        const cap_image = document.createElement("img");
        cap_image.src = cap.guid;
        document.querySelector(".game_caps").appendChild(cap_image);
    })
}

// here's weco's guaranteed features
function createFeatures(ft) {
    ft.features.forEach(feature => {
        const weco_feature = document.createElement("div");
        weco_feature.setAttribute("class", "feature");
        weco_feature.textContent = feature.post_title;

        const feature_inner = document.createElement("div");
        feature_inner.setAttribute("class", "description")
        feature_inner.innerHTML = feature.post_content;
        weco_feature.appendChild(feature_inner);
        
        document.querySelector(".inner_features").appendChild(weco_feature);
    })
}

// here's most of the fetched page
function showGame(game) {
    console.log(game);

    const template = document.querySelector("#single_game").content;
    const clone = template.cloneNode(true);

    // populate with information
    const header = game.header.guid;
    clone.querySelector(".overlay img").src = header;
    const images = game._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    clone.querySelector(".header_container img").src = images;
    const h1 = clone.querySelector(".header_description h1");
    h1.textContent = game.title.rendered;
    const shortDescription = clone.querySelector(".header_description p");
    shortDescription.innerHTML = game.excerpt.rendered;

    const longDescription = clone.querySelector(".long_description p");
    longDescription.innerHTML = game.content.rendered;
    const fileSize = clone.querySelector(".file_size");
    fileSize.textContent = game.file_size + " GB";
    const releaseDate = clone.querySelector(".release_date");
    releaseDate.textContent = game.release_date;
    const players = clone.querySelector(".players");
    players.textContent = game.players;
    const category = clone.querySelector(".category");
    category.textContent = game.learning_goal;

    // append child
    document.querySelector("main").appendChild(clone);

    document.querySelector(".load").style.display = "none";
}

// fetched cards here
function cardsRetrieved(stuff) {
    similarCards(stuff);
    createCards(stuff);
}

function createCards(card) {
    console.log(card)
    console.log("here's my card")
    card.forEach(c => {
        const sim_img = document.createElement("img");
        console.log(c, "hey");
        sim_img.src = c._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

        const subtitle = document.createElement("h3");
        subtitle.textContent = c.title.rendered;

        const section = document.createElement("section");

        const link = document.createElement("a");
        link.href = "single-game.html?page=";

        const idlink = link;
        link.href += c.id;

        section.appendChild(sim_img);
        section.appendChild(subtitle);
        link.appendChild(section);
        document.querySelector(".inner_similar_games").appendChild(link);
    })
}

function similarCards(g) {
    const template = document.querySelector("#similar_games").content;
    const clone = template.cloneNode(true);

    // content

    // append child
    document.querySelector("main").appendChild(clone);
}
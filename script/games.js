let games = "https://mariajalmeida.com/KEA/2nd_semester/weco_play/wp-json/wp/v2/page_detail?_embed&per_page=20&_fields=id,title,_links";

window.addEventListener("DOMContentLoaded", getGames);

// fetch all of our data
function getGames() {
    fetch(games)
        .then(res => res.json())
        .then(processData);
}

// start to divide the data
function processData(data) {
    // console.log("here are the games");
    //  console.log(data);
    data.reverse();
    data.forEach(retrieveSingleGame);
}

// call in each single game and do magical things
function retrieveSingleGame(gameDivision) {
    // console.log(gameDivision);
    // console.log("hey game");

    const template = document.querySelector("#games").content;
    const clone = template.cloneNode(true);


    //add categories to games for filtering filters 
    clone.querySelector('.box_container').classList.add(gameDivision._embedded["wp:term"][0][0].slug);

    const title = clone.querySelector("h2");
    title.textContent = gameDivision.title.rendered;
    const images = gameDivision._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    clone.querySelector("img").src = images;

    const link = clone.querySelector("a");
    link.href += gameDivision.id;

    // append child
    document.querySelector("main").appendChild(clone);
}


//EVENT FOR FILTERS
const categories = document.querySelectorAll(".categories button");
categories.forEach((button) => {
    console.log(button, "buttons")
    button.addEventListener('click', filterData)
});
//Class active
function filterData(e) {
    const clicked = e.target.id;
    categories.forEach((btn) => {
        if (btn.id == clicked) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    })
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


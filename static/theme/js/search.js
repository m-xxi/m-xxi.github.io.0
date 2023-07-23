// Setup search
var openSearch = document.getElementById("search-open");
var closeSearch = document.getElementById("search-close");
var megaSearch = document.getElementById("search");

openSearch.addEventListener("click", function (e) {
    e.preventDefault();
    //script
    megaSearch.style.visibility = "visible";
});

closeSearch.addEventListener("click", function (e) {
    e.preventDefault();
    //script
    megaSearch.style.visibility = "hidden";
});
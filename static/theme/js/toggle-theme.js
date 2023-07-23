// Theme toggler
const themeNext = {
    dark: "light",
    light: "dark"
};
var theme = "light";
if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
}
document.body.classList.remove('dark-theme', 'light-theme');
document.body.classList.add(theme + '-theme');
document.getElementById(themeNext[theme]).style.display = "flex";
document.getElementById(theme).style.display = "none";
// Theme button events
var switchTheme = document.getElementById('themeButton');
var toggleLight = document.getElementById('light');
var toggleDark = document.getElementById('dark');
switchTheme.addEventListener('click', function (e) {
    e.preventDefault();
});
toggleLight.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    toggleLight.style.display = "none";
    toggleDark.style.display = "flex";
});
toggleDark.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
    toggleLight.style.display = "flex";
    toggleDark.style.display = "none";
});
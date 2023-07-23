var small_screen = window.matchMedia("(max-width: 700px)")
var openMenu = document.getElementById("open");
var closeMenu = document.getElementById("close");
var megaMenu = document.getElementById("mega");

function OpenMenuFunction() {
    //script
    openMenu.style.display = "none";
    closeMenu.style.display = "flex";
    megaMenu.style.visibility = "visible";

  if (small_screen.matches) { // If media query matches
    document.body.style.marginTop=megaMenu.offsetHeight+"px";
  }  
}

openMenu.addEventListener("click", function (e) {
    e.preventDefault();
    //script
    OpenMenuFunction();
});

closeMenu.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu.style.display = "none";
    openMenu.style.display = "flex";
    megaMenu.style.visibility = "hidden";
    document.body.style.marginTop ="0ex";
});

function SelectKeyW(slug){
  var selects = document.getElementsByClassName('keyw-select');
  for (var j=0; j< selects.length;j++){
  // select = document.getElementById('tags-id');
  select = selects[j];
  for ( var i = 0; i< select.options.length ; i++ )
  {
    var o = select.options[i];
    if ( o.value === slug )
    {
      o.selected = true;
    }
  }
  }
}

function ChangeDisplayOnSelect(slug){
  SelectKeyW(slug);
  SelectArticlesFromSelectClass('keyw-select');  
  OpenMenuFunction();
}
function FilterArticlesFromKeyW(slug,home){
  // Get URL:
  // window.location.href=window.location.hostname;
  // window.location.href='/'
  // window.location.hash=tag_slug;
  console.log(window.location.href)
  console.log(window.location.hostname)
  console.log(home)
  if (window.location.href != home ){
    //not at home
    window.location.href=home+'/#'+slug;
  }
  ChangeDisplayOnSelect(slug)
}

function SelectHashKeyWFromURL(){
  // Get URL:
  var url=window.location.href;
  var found_tag=url.search('/#')
  if(found_tag >=0 ){
    let slug = url.substring(found_tag+2);
    if(slug.length>0){
      ChangeDisplayOnSelect(slug);
    }
  }

}
// Search for HashTag from URL each time the DOM is loaded
document.addEventListener('DOMContentLoaded', SelectHashKeyWFromURL(), false);

function ChangeArticlesDisplayFrom(selected_key_words){
  var x = document.getElementsByClassName('c-article');
  var count=0
  for (i = 0; i < x.length; i++) {
    // recorro todos los artículos
    count=0;
    // console.log(x[i].classList.value())
    for (var j=0; j<selected_key_words.length;j++){
      prefix=["c-keyw-","c-slug-"]
      for (var k=0;k<prefix.length;k++){
      if(x[i].classList.contains(prefix[k]+selected_key_words[j]) ){
        count++;
      }
      }
    }
    if(count===selected_key_words.length){
      x[i].style.display='block';
    }else{
      x[i].style.display='none';
    }
  }
}
function SelectArticlesFromSelect(sel) {
  var selected_key_words=Array.from(sel.selectedOptions).map(option => 
  option.value)
  ChangeArticlesDisplayFrom(selected_key_words);
  SetVisibleTagsFromVisibleArticles(sel);
}


function SelectArticlesFromSelectClass(select_class) {
  var selects = document.getElementsByClassName(select_class);
  var selected_key_words=[];
  for (var i=0; i< selects.length;i++){
    var aux=Array.from(selects[i].selectedOptions).map(option => 
    option.value)
    selected_key_words=selected_key_words.concat(aux)
  }
  ChangeArticlesDisplayFrom(selected_key_words)
  for (var i=0; i< selects.length;i++){
    SetVisibleKeyWFromVisibleArticles(selects[i]);
  }
}

function Get_keyW_list_from_article(art){
    var index=0;
    var tag_list=Array.from(art.classList)
    let list=art.classList;
    for (let x of list.values()) {
      if  (x.startsWith('c-keyw-')) {
        tag_list[index]=x.substring(7) 
        index++;
      }
    }
    // returns a list with the slugs of the tags from the article art
    return tag_list.slice(0,index)
}

function SetVisibleKeyWFromVisibleArticles(sel) {

// tengo que hacer un dict de ceros con la cantidad de opciones de sel
var visible_tags = new Object();
for (let i = 0; i < sel.length; i++) {
  visible_tags[sel.options[i].value]=0;
}
// 
  var x = document.getElementsByClassName('c-article');
  var count=0
  for (let i = 0; i < x.length; i++) {
    //recorro todos los artículos pero opero solo sobre los visibles
    if(x[i].style.display!='none'){
      var article_tags=Get_keyW_list_from_article(x[i])
      // console.log(x[i].classList.value())
      for (var j=0; j<article_tags.length;j++){
          visible_tags[article_tags[j]]=1;
      }
    }
  }

// Get each tag by their id and set the display depending on visible_tags
for (const [key, value] of Object.entries(visible_tags)) {
      var element = document.getElementById("option-tag-"+key);
      if(element){
        if (value===1){
            element.style.display = "block";
        }else {
            element.style.display = "none";
        }
      }else{
        console.log('ERROR: option-tag'+key+'does not exist')
      }
    }


}


let allLi = Array.from(document.querySelectorAll("li"));
let list = document.getElementById("list");
let inputSearch = document.getElementById("searchInput");
let quote = document.querySelector(".innerText");
let author = document.querySelector(".author");
let category = document.querySelector(".category1");

window.onload = function () {
    getRequest();
    getQuotes("forgiveness");
  inputSearch.focus();
};

    function displaySearchValue() {
        let cartona = allLi.map((li) => {
          if (li.innerHTML.startsWith(inputSearch.value)) {
            return `<li>${li.innerHTML.replace(
              inputSearch.value,
              `<span class="focusStyle">${inputSearch.value}</span>`
            )}</li>`;
          }
        });
      
        list.innerHTML = cartona.join("");
      
        // Attach event listeners to the modified li elements
        let modifiedLiElements = Array.from(document.querySelectorAll("li"));
        modifiedLiElements.forEach((li) => {
          li.addEventListener("click", function (e) {
            // console.log(e.target.innerText);
            getQuotes(e.target.innerText)
          });
        });
      }



inputSearch.addEventListener("input", function () {
    displaySearchValue();
});

function getRequest(){
    for (let i = 0; i < allLi.length; i++) {
        allLi[i].addEventListener("click", function(e){
            let x = e.target.innerHTML
            getQuotes(x)
        })
    }
}

function getQuotes(word){
    let xhr = new XMLHttpRequest()
    xhr.open("GET",`https://api.api-ninjas.com/v1/quotes?category=${word}`)
    xhr.setRequestHeader("X-Api-Key","V1HtHh5wunXyJvgF5gRykXl4B9qDly4gVfji5rv0")
    xhr.send()
    xhr.addEventListener("readystatechange", function(){
        assign(xhr)
    })
}


function assign(xhr){
    if(xhr.readyState == 4 && xhr.status == 200){
        let response = JSON.parse(xhr.response)
        category.innerHTML = response[0]?.category;
        quote.innerHTML = response[0]?.quote;
        author.innerHTML = response[0]?.author;
    }
}
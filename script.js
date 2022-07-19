const apiKey = "1dfeeec59f94755d408a99b9bcc7e18a";

const section = document.querySelector("section");
const categories = document.querySelector("#categories");
const input = document.querySelector("input");
const searchResults = document.querySelector(".searchResults")


let page = 1;
let category = "popular";
let totalPages = 1;
let scrollDelta = -100;

// fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey).then(response =>{
//     return response.json();
// }).then(data =>{
//     // document.querySelector(".title").textContent = data.original_title;
//     data.results.forEach(element => {
//         //console.log(element);
//          console.log(data);
//     });
   
// }).catch(err=>{
//     console.log("Error:",err);
// })


let newMovieDiv = ()=> {
 

    fetch("https://api.themoviedb.org/3/movie/"+category+"?api_key=" + apiKey + "&page=" + page).then(response =>{
    return response.json();
    }).then(data =>{
        totalPages = data.total_pages;

        data.results.forEach(element => {


          


            //creating elements of movie container and movie container
            let newElement =  document.createElement("div");
            let newElementTitle =  document.createElement("p");
            let newElementDescirption =  document.createElement("p");
            let newElementDescriptionContainer =  document.createElement("div");
            let newElementPoster = document.createElement("img");


            
            newElement.classList.add("movie");


            newElementTitle.innerText = element.title;

            let text = element.overview;
            text.length > 280 ? text = text.slice(0,280) + "..." : text;

            newElementDescirption.innerText = text;
           
            newElementPoster.src = "https://image.tmdb.org/t/p/w200" + element.poster_path;
            newElementPoster.alt = element.title + " poster";

            newElementDescriptionContainer.classList.add("desc-container")


            //Append childs to div and whole element to section
            newElementDescriptionContainer.appendChild(newElementTitle);
            newElementDescriptionContainer.appendChild(document.createElement("br"));
            newElementDescriptionContainer.appendChild(newElementDescirption);
            

            newElement.appendChild(newElementDescriptionContainer);

            newElement.appendChild(newElementPoster);

            section.appendChild(newElement);
        });



    }).catch(err=>{
    console.log("Error:",err);
});
}

input.addEventListener("keyup",()=>{
    if(input.value.length > 2){

        searchResults.classList.add("show");
        section.style.top = "-450px";

        scrollDelta = -550;


        let searchText = input.value;

        console.log(searchText);

        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + encodeURI(searchText) + "&page=" + 1).then(response =>{
            return response.json();
        }).then(data =>{

            searchResults.innerHTML = "";
            for(let i = 0;i<3;i++){
                var element = data.results[i];
    
                //creating elements of movie container and movie container
                let newElement =  document.createElement("div");
                let newElementTitle =  document.createElement("p");
                let newElementPoster = document.createElement("img");


                
                newElement.classList.add("searchResult");


                newElementTitle.innerText = element.title;
            
                newElementPoster.src = "https://image.tmdb.org/t/p/w200" + element.poster_path;
                newElementPoster.alt = element.title + " poster";

                

                newElement.appendChild(newElementPoster);
                newElement.appendChild(newElementTitle);


                searchResults.appendChild(newElement);

            }
        }).catch(err=>{
            console.log("Error:",err);
        })

    }else{
        searchResults.classList.remove("show");
        section.style.top = "0px";

        scrollDelta = -100;
    }
});





//at refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    input.value = "";
    category = categories.options[categories.selectedIndex].value;
    newMovieDiv();




//event listeners


categories.addEventListener("change",()=>{
    section.innerHTML = "";
    category = categories.options[categories.selectedIndex].value;
    page = 1;
    newMovieDiv();
})

document.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight + scrollDelta){
        if(page < totalPages || (page === 1 && totalPages > 1)){
            page++;
            newMovieDiv();
        } 
    } 
})
     

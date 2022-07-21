const apiKey = "1dfeeec59f94755d408a99b9bcc7e18a";

const section = document.querySelector("section");
const categories = document.querySelector("#categories");
const input = document.querySelector("input");
const searchResults = document.querySelector(".searchResults")
const moreInfoModal = document.querySelector(".moreInfo");
const block = document.querySelector(".block");


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




let showMoreInfo = (movieId)=>{
    moreInfoModal.classList.add("show");
    block.classList.add("show");
    document.body.classList.add("stop-scrolling");

    moreInfoModal.querySelector("button").addEventListener("click",()=>{
        moreInfoModal.classList.remove("show");
        block.classList.remove("show");
        document.body.classList.remove("stop-scrolling");

    })



    fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey).then(response =>{
        return response.json();
    }).then(data =>{
       
        console.log(data);

        moreInfoModal.querySelector(".backdrop").src = addBackdrop(data);
        moreInfoModal.querySelector(".title").innerText = data.title;
        moreInfoModal.querySelector(".tagline").innerText = data.tagline;
        moreInfoModal.querySelector(".description").innerText = data.overview;
        moreInfoModal.querySelector(".votes").innerText = "Rating: " + data.vote_average + " of " + data.vote_count + " votes";
        moreInfoModal.querySelector(".release-date").innerText ="Release date: " +  data.release_date;
     
    }).catch(err=>{
        console.log("Error:",err);
    })



}



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
            newElementTitle.classList.add("movie-title");
            newElementTitle.setAttribute("movie-id", element.id);


            let text = element.overview;
            text.length > 280 ? text = text.slice(0,280) + "..." : text;

            newElementDescirption.innerText = text;
           
            newElementPoster.src = addPoster(element);
            newElementPoster.alt = element.title + " poster";

            newElementDescriptionContainer.classList.add("desc-container");


            //Append childs to div and whole element to section
            newElementDescriptionContainer.appendChild(newElementTitle);
            newElementDescriptionContainer.appendChild(document.createElement("br"));
            newElementDescriptionContainer.appendChild(newElementDescirption);
            

            newElement.appendChild(newElementDescriptionContainer);

            newElement.appendChild(newElementPoster);

            section.appendChild(newElement);
        });


        document.querySelectorAll(".movie-title").forEach((element)=>{      //click on title shows modal with more info
            element.addEventListener("click",(e)=>{
                showMoreInfo(e.target.getAttribute("movie-id"));
            });
        })


    }).catch(err=>{
    console.log("Error:",err);
});
}

let addPoster = (element)=>{
    return element.poster_path === null ? "no-image.png":"https://image.tmdb.org/t/p/w200" + element.poster_path;
}
let addBackdrop = (element)=>{
    return element.backdrop_path === null ? "no-image.png":"https://image.tmdb.org/t/p/original" + element.backdrop_path;
}




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
     
input.addEventListener("keyup",()=>{
    if(input.value.length > 2){

        searchResults.classList.add("show");



        let searchText = input.value;

        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + encodeURI(searchText) + "&page=" + 1).then(response =>{
            return response.json();
        }).then(data =>{
            searchResults.innerHTML = "";
            let totalResults = data.total_results;
            totalResults = totalResults < 3? totalResults : 3 ;

            section.style.top = totalResults * -150 + "px"; //to maitain section position

            scrollDelta = -100 -totalResults * 150;

            for(let i = 0;i<  totalResults  ;i++){
                var element = data.results[i];
    
                //creating elements of movie container and movie container
                let newElement =  document.createElement("div");
                let newElementTitle =  document.createElement("p");
                let newElementPoster = document.createElement("img");


                
                newElement.classList.add("searchResult");


                newElementTitle.innerText = element.title;
                
                              
                newElementPoster.src = addPoster(element);

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

section.addEventListener("click",()=>{
    searchResults.classList.remove("show");
    section.style.top = "0px";
    scrollDelta = -100;
})

document.querySelector("nav p").addEventListener("click",()=>{
    window.location.reload();
    document.documentElement.scrollTop = 0;
})


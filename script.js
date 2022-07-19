const apiKey = "1dfeeec59f94755d408a99b9bcc7e18a";

const section = document.querySelector("section");


let page = 1;

fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey).then(response =>{
    return response.json();
}).then(data =>{
    // document.querySelector(".title").textContent = data.original_title;
    data.results.forEach(element => {
        //console.log(element);
         console.log(data);
    });
   
}).catch(err=>{
    console.log("Error:",err);
})


let newMovieDiv = (page)=> {
 

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=" + page).then(response =>{
    return response.json();
    }).then(data =>{


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
    newMovieDiv(page);

document.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 100){
        page++;
        newMovieDiv(page);
    } 
})
     

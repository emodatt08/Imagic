//using ES6 to import 
import reddit from './redditApi';

//Declare Variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchLimit = document.getElementById('search-limit');
const searchContainer = document.getElementById('search-container');
const searchContainerChild = document.getElementById('search');
const searchSort = document.querySelector('input[name="sortby"]:checked');

//Add event listener to search Form 
searchForm.addEventListener('submit', function(event){
    //Get Search term
    const term = searchInput.value;
    //Get sort
    const sortBy = searchSort.value;
    //Get limit
    const limit = searchLimit.value;
    //Validate search term
    if(term === ""){
        //show message
        showMessage('Enter a search term please', 'alert-danger');
    }

    //Clear input
    searchInput.value = '';

    //Search reddit
    reddit.search(term, limit, sortBy).then(results => {
        let output = '<div class="card-columns">';
                //loop through posts
                results.forEach(post => {
                    let image = post.preview ? post.preview.images[0].source.url: "https://cdn4.iconfinder.com/data/icons/flatified/512/photos.png";
                    output+= `

                    <div class="card">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${truncateText(post.selftext, 50)}</p>
                      <a href="${post.url}" class="btn btn-primary">Read More</a>
                    </div>
                  </div>

                    `;
                });
            output+= '</div>'
            document.getElementById('results').innerHTML = output;
    });

    event.preventDefault();

});


var showMessage = function(message, type){
    //Create div
    const div = document.createElement('div');
    div.className = `alert ${type}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get parent
    searchContainer
    //Get Search
    searchContainerChild
    //Insert message
    searchContainer.insertBefore(div,searchContainerChild);
    //Set timeout to remove message
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}
var truncateText = function(text, limit){
    const short = text.indexOf(' ', limit);
    if(short == -1)return text
    return text.substring(0, short);

    
}




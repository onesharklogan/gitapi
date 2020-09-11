'use strict';

const searchURL = 'https://api.github.com/users/'; //{username}/repos

function formatParameters(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    //clear the results so we can repopulate
    $(`#results-list`).empty();

    for (let i = 0; i < responseJson.length; i++) {
        $(`#results-list`).append(
            `<li><p><a href="${responseJson[i].svn_url}">${responseJson[i].name}</a></p>
            
            
            </li>`
        )
    }

    $('#results').removeClass('hidden');
}

// function displayResults(responseJson, maxResults) {
//     // if there are previous results, remove them
//     console.log(responseJson);
//     $('#results-list').empty();
//     // iterate through the articles array, stopping at the max number of results
//     for (let i = 0; i < responseJson.value.length & i < maxResults; i++) {
//         // for each video object in the articles
//         //array, add a list item to the results 
//         //list with the article title, source, author,
//         //description, and image
//         $('#results-list').append(
//             `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
//       <p>${responseJson.value[i].description}</p>
//       <p>By ${responseJson.value[i].body}</p>
//       </li>`
//         )
//     };
//     //display the results section  
//     $('#results').removeClass('hidden');
// };

function getRepos(userName) {
    //clear error warning text
    $('#js-error').empty();

    const url = searchURL + userName + "/repos";
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("response ok!");
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error').text(`Error occurred during lookup: ${err.message}`);
        });
}



// fetch(url, options)
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error(response.statusText);
//     })
//     .then(responseJson => displayResults(responseJson, maxResults))
//     .catch(err => {
//         $('#js-error-message').text(`Something went wrong: ${err.message}`);
//     });


function watchForm() {
    $('form').submit(event => {

        event.preventDefault();
        const userName = $('#js-user-name').val();
        getRepos(userName);
    });
}

$(watchForm);




// function watchForm() {
//     $('form').submit(event => {
//         event.preventDefault();
//         const searchTerm = $('#js-search-term').val();
//         const maxResults = $('#js-max-results').val();
//         getNews(searchTerm, maxResults);
//     });
// }



// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
// }
/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/**
 * Show the page from user list
 * @param {*} list user list
 * @param {*} page page number 
 */
function showPage(list, page) {
   const start = page * 9 - 9;
   const end = page * 9;
   const ul = document.getElementsByClassName('student-list')[0];
   ul.innerHTML = '';

   // Creating user for display
   for (let i = 0; i < list.length; i++) {
      if (start <= i && end > i) {
         const person = list[i];
         const html = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src=${person['picture']['large']} alt="Profile Picture">
            <h3>${person['name']['first']} ${person['name']['last']}</h3>
            <span class="email">${person['email']}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${person['registered']['date']}</span>
            </div>
         </li>`;
         ul.insertAdjacentHTML('beforeend', html);
      }
   }
}

/**
 * Add Pagination
 * @param {*} list user list
 */
function addPagination(list) {
   const pages = Math.ceil(list.length / 9);
   const ul = document.getElementsByClassName('link-list')[0];

   // Check if user exists 
   if (pages) {
      ul.innerHTML = '';
      for (let i = 0; i < pages; i++) {
         const html = `
            <li>
               <button type="button">${i + 1}</button>
            </li>`;
         ul.insertAdjacentHTML('beforeend', html);
      }

      ul.children[0].firstElementChild.className = 'active';
      ul.addEventListener('click', (e) => {
         if (e.target.tagName == 'BUTTON') {
            ul.getElementsByClassName('active')[0].className = '';
            e.target.className = 'active';
            showPage(list, e.target.textContent);
         }
      });
   } else {
      ul.innerHTML = `
      <div class="no-results">
         No results found
      </div>`;
   }
}

/**
 * Create searchbar
 * @param {*} list user list
 */
function createSearchbar(list) {
   const html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

   const header = document.getElementsByClassName('header')[0];
   header.insertAdjacentHTML('beforeend', html);

   const searchBar = document.getElementById('search');

   // For keyup event
   searchBar.addEventListener('keyup', (e) => {
      const filteredList = filterList(list, e.target.value);
      showPage(filteredList, 1);
      addPagination(filteredList);
   });

   // For click event
   searchBar.nextElementSibling.addEventListener('click', (e) => {
      const filteredList = filterList(list, searchBar.value);
      showPage(filteredList, 1);
      addPagination(filteredList);
   });
}

/**
 * Filter user list based on input value
 * @param {array} list user list
 * @param {string} value input value
 * @returns {array} filtered list
 */
function filterList(list, value) {
   const filteredList = [];
   for (let i = 0; i < list.length; i++) {
      if (list[i]['name']['first'].toLowerCase().includes(value.toLowerCase()) || 
            list[i]['name']['last'].toLowerCase().includes(value.toLowerCase())) {
         filteredList.push(list[i]);
      }
   }
   return filteredList;
}

// Call functions
showPage(data, 1);
addPagination(data);
createSearchbar(data);
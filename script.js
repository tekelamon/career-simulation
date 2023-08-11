/**
 * REQUIREMENTS:
 * 
 * Display all players in card elements
 * View single player details
 * Add players with form submission
 * Remove players with button on respective card
 */

const cohortName = '2302-acc-pt-web-pt-e';
// API endpoints
const BASEURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
const PLAYERSURL = `${BASEURL}/players`; // add /${id} to get single player
const TEAMSURL = `${BASEURL}/teams`;

const fetchAllPlayers = async () => {
    try {
        // fetch data
        const response = await fetch(PLAYERSURL);
        const data = await response.json();
        // return relevant data from full object
        return data.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        // fetch data
        const response = await fetch(`${PLAYERSURL}/${playerId}`);
        const data = await response.json();
        // return relevant data from full object
        return data.data.player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        // base location to send data
        const root = document.getElementById('root');

        // parent div to contain all players
        const playerContainer = document.createElement('div');

        playerList.forEach( player => {
            // each player has their own div to hold their respective data
            const div = document.createElement('div');
            div.classList = 'player';

            div.innerHTML = `
                <img src="${player.imageUrl}" alt="Picture of ${player.name}" />
                <h1>${player.name}</h1>
                <p>${player.breed}</p>
            `;

            // attach player to parent div
            playerContainer.appendChild(div);
        });

        // finally, add all players to DOM
        root.appendChild(playerContainer);
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
};

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
};

init();
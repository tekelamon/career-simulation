/**
 * REQUIREMENTS:
 * 
 * Display all players in card elements
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

const addNewPlayer = async () => {
    try {
        // get relevant data from form
        const playerName = document.getElementById('newPlayerName').value;
        const playerBreed = document.getElementById('newPlayerBreed').value;
        const playerImageUrl = document.getElementById('newPlayerImageUrl').value;

        // post player info to API
        const response = await fetch(`${PLAYERSURL}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: `${playerName}`,
                breed: `${playerBreed}`,
                status: 'bench',
                imageUrl: `${playerImageUrl}`
            })
        });
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${PLAYERSURL}/${playerId}`,{
            method: 'DELETE'
        });
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
        playerContainer.classList = 'playerContainer';

        playerContainer.innerHTML = `
            <h1>Meet Our Players</h1>
        `;

        playerList.forEach( player => {
            // each player has their own div to hold their respective data
            const div = document.createElement('div');
            div.classList = 'player';

            div.innerHTML = `
                <img src="${player.imageUrl}" alt="Picture of ${player.name}" />
                <h1>${player.name}</h1>
                <p>${player.breed}</p>
                <button onClick="renderSinglePlayer(${player.id})" >View Player Details</button>
                <button onClick="removePlayer(${player.id})" >Remove Player</button>
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
        // base location to send data
        const root = document.getElementById('root');

        // parent div to contain form
        const formContainer = document.createElement('div');
        formContainer.classList = 'formContainer';

        formContainer.innerHTML = `
            <h1>Add New Players!</h1>
            <form>
                <label>
                    Name:
                    <input type='text' id='newPlayerName' />
                </label>
                <label>
                    Breed:
                    <input type='text' id='newPlayerBreed' />
                </label>
                <label>
                    Where can we find a picture?
                    <input type='text' id='newPlayerImageUrl' />
                </label>
                <button id='newPlayerSubmit' >Add Player</button>
            </form>
        `;

        // add form to DOM
        root.appendChild(formContainer);

        // add event listener to button
        const btn = document.getElementById('newPlayerSubmit');
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            addNewPlayer();
        })
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
};

const renderSinglePlayer = async (playerId) => {
    try {
        // get player data
        const player = await fetchSinglePlayer(playerId);

        // grab main content
        const root = document.getElementById('root');
        // then, clear content for rendering of single player
        root.innerHTML = '';

        // container for single player content
        const div = document.createElement('div');
        div.classList = 'singlePlayerDetails';

        // list to hold names of teammates
        const ul = document.createElement('ul');

        // take each player on the team, and generate a list of names from each player
        const teammateNames = player.team.players.map( teammate => {
            return teammate.name;
        });

        teammateNames.forEach( name => {
            // place each name in a li
            const li = document.createElement('li');
            li.innerHTML = `${name}`;
            // add each name to the full list
            ul.appendChild(li);
        })

        // update div content
        div.innerHTML = `
            <h1>${player.name}</h1>
            <img src="${player.imageUrl}" alt="Picture of ${player.name}" />
            <p>${player.breed}</p>
            <p>Location: ${player.status}</p>
            <p>Team: ${player.team.name}</p>
        `;

        // add the list of names to the player's details
        div.appendChild(ul);

        // button to close view
        const btn = document.createElement('button');
        btn.innerHTML = 'Close';

        // add button to div
        div.appendChild(btn);

        // attach entire div to root
        root.appendChild(div);

        // on close, remove player details, and re-run init function to return main page
        btn.addEventListener('click', () => {
            root.innerHTML = '';
            init();
        });
    } catch (err) {
        console.error('Trouble rendering single player',err);
    }
};

/**
 * Final task list:
 * create renderSinglePlayer for fetchSinglePlayer (will be used to show player details)
 */
const init = async () => {
    renderNewPlayerForm();

    const players = await fetchAllPlayers();
    renderAllPlayers(players);
};

init();
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const cohortName = '2302-acc-pt-web-pt-e';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const temp = await fetch(`${APIURL}/players`);
        const result = await temp.json();
        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const temp = await fetch(`${APIURL}/players/${playerId}`);
        const result = await temp.json();
        return result.data.player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

/*
    Gets data from form submission for addNewPlayer
*/
const getFormPlayerData = () => {
    const playerName = document.getElementById('playerName');
    const playerBreed = document.getElementById('playerBreed');
    const playerStatus = document.getElementById('playerStatus');
    const playerImg = document.getElementById('playerImgUrl');

    let playerObj = {
        name: playerName.value,
        breed: playerBreed.value,
        status: playerStatus.value,
        imageUrl: playerImg.value
    };

    return playerObj;
}

// const addNewPlayer = async (playerObj) => {
const addNewPlayer = async () => {
    try {
        const playerObj = getFormPlayerData();
        const response = await fetch(
            `${APIURL}/players`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playerObj.name,
                    breed: playerObj.breed,
                    status: playerObj.status,
                    imageUrl: playerObj.imageUrl
                }),
            }
        );
// TODO I believe this is working properly, verify data and post to API
        return false; // response for form
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(
            `${APIURL}/players/${playerId}`,
            {
              method: 'DELETE',
            }
          );
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
        playerContainer.innerHTML = ``;
        playerList.forEach( player => {
            const div = document.createElement('div');
            div.classList = 'player';
            div.innerHTML = `
                <img src="${player.imageUrl}">
                <h2>${player.name}</h2>
                <p>${player.breed}</p>
                <button
                    class="details-button"
                    value="${player.id}"
                    onclick="fetchSinglePlayer(this.value)">See details</button>
                <button
                    class="delete-button"
                    value="${player.id}"
                    onclick="removePlayer(this.value)">Remove from roster</button>
            `;
            // TODO replace fetchSinglePlayer with renderSinglePlayer

            playerContainer.appendChild(div);
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

const renderSinglePlayer = async ( playerId ) => {
    // fetch data
    // clear screen
    // display new content
    // on close button, run init() to bring main page back
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        newPlayerFormContainer.innerHTML = ``;
        const div = document.createElement('div');
        div.innerHTML = `
            <h1>Add New Players!</h1>
            <form onsubmit="return addNewPlayer()">
            <div>
                <label for="playerName">Name:</label>
                <input type="text" name="playerName" id="playerName">
            </div>

            <div>
                <label for="playerBreed">Breed:</label>
                <input type="text" name="breed" id="playerBreed">
            </div>

            <div>
                <label for="playerImgUrl">Where can we find a picture?</label>
                <input type="url" name="image" id="playerImgUrl">
            </div>

            <div>
                <label for="playerStatus">Status</label>
                <select name="status" id="playerStatus">
                <option value="benched" selected="selected"></option>
                <option value="field"></option>
                </select>
            </div>

            <div>
                <input type="submit" value="Submit">
            </div>
            </form>
        `;

        newPlayerFormContainer.appendChild(div);

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

/**
 * Final task list:
 * create renderSinglePlayer for fetchSinglePlayer (will be used to show player details)
 */
const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();
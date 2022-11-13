/**
 * @typedef {object} preview
 * @property {string} id
 * @property {string} title
 * @property {number} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

/**
 * @typedef {object} episode
 * @property {number} episode
 * @property {string} description
 * @property {string} title
 * @property {string} file
 */

/**
 * @typedef {object} season
 * @property {number} season
 * @property {string} title
 * @property {string} image
 * @property {episode[]} episodes
 */

/**
 * @typedef {object} show
 * @property {string} id
 * @property {string} title
 * @property {season[]} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

const listHtml = document.querySelector('#list')

const getAllPodcasts = async () => {
    listHtml.innerHTML = `Loading`

    const response = await fetch('https://podcast-api.netlify.app/shows')

    if (!response.ok) {
        listHtml.innerText = 'Issues came through !'
        return
    }

    /**
     * @type {preview[]}
     */
    const data = await response.json()

    let newHtml = ''

    for (const {id, title, seasons} of data) {
        newHtml = `${newHtml}
        <li>
        <button data-preview-button="${id}">${title}</button>
        <span>(${seasons})</span>
        </li>
        `
    }

    listHtml.innerHTML = newHtml
}

 /**
     * @param {string} id
     */

  const getSinglepodcast = async () => {
    listHtml.innerHTML = `Loading`

    const response = await fetch('https://podcast-api.netlify.app/id/${id}')

    if (!response.ok) {
        listHtml.innerHTML = 'Issues cames through !'
        return
    }

     /**
     * @type {show}
     */
      const data = await response.json()

      let seasonsList = ''

      for (const {image, title} of data.seasons) {
        seasonsList = `${seasonsList}
        <li>
        <img src= "${image}" width= "100" height= "100">
        ${title}
        </li>

        `
    } 

    listHtml.innerHTML = `
    <button data-action="back"> BACK</button>
    <h2>
    ${data.title}</h2>
    <ul> ${seasonsList}</ul>

    `
}

document.body.addEventListener('click', (event) => {
    const { previewButton, action} = event.target.dataset

    if (action && action === 'back'){
        getAllPodcasts()
        return
    }

    if (!previewButton)
        return
        getSinglepodcast(previewButton)
    
})

getAllPodcasts()
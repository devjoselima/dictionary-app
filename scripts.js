const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const result = document.querySelector('.result');

const sound = document.querySelector('#sound')

const btn = document.querySelector('#search-button')

const tema = document.getElementById('tema')
tema.addEventListener('change', () => {
    document.body.classList.toggle('light')
})

btn.addEventListener("click", () => {
    let inpWord = document.querySelector('#input-word').value;

   fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
        
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic || data[0].phonetics[1].text}</p>               
                </div>

                <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>

                <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>
            `;
            sound.setAttribute("src", `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`);            
        })
        .catch(() => {
            result.innerHTML = `<h4 class="error">Couldn't Find The Word</h4>`
        })
       
});

function playSound(){
    sound.play();
}


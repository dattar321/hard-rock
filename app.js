function searchResult(){
    //document.getElementById("search-result")='';
    while (document.getElementById("search-result").lastElementChild) {
        document.getElementById("search-result").removeChild(document.getElementById("search-result").lastElementChild);
      }
    const name = document.getElementById("input").value;
    const url = `https://api.lyrics.ovh/suggest/:${name}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        for(let i = 0;i<13 ;i++){
            const songName = data.data[i].title;
            const artist = data.data[i].artist.name;
            const music = data.data[i].preview;
            const searchResults =document.createElement("div");
            searchResults.innerHTML=`
            <div class="search-result col-md-8 mx-auto py-4">
                        <div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 style="color:#28a745; class="lyrics-name">${songName}</h3>
                                <p class="author lead">Album by <span>${artist}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick = "putLyrics('${artist}','${songName}')" id = "get-lyrics"class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>
                    </div> 
                `;
                document.getElementById("search-result").appendChild(searchResults);
                }
        
    }).catch(function() {
        console.log("error");
    });
}

function putLyrics(artist,title){
    while (document.getElementById("addLyrics").lastElementChild) {
        document.getElementById("addLyrics").removeChild(document.getElementById("addLyrics").lastElementChild);
      }
    const url =`https://api.lyrics.ovh/v1/:${artist}/:${title}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const lyrics =document.createElement("div");
        const p = document.createElement("p");
        lyrics.className ='text-center';
        lyrics.innerHTML=`<h2 style="color:#28a745;>${title}</h2>
                            <h3 style="color:#28a700;>${artist}</h3}
                            `;
        p.innerText+=data.lyrics;
        lyrics.appendChild(p);
        document.getElementById("addLyrics").appendChild(lyrics);
    }).catch(function() {
        console.log("error");
    });
}
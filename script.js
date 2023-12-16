console.log("Welcome to spotify");
//Initialize the Variables
let songindex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Top Flame", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Fun", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Closer", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Peaches", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Softly", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Bam Lehri", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Pawansut", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Strangers", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Sweet But Psycho", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Sea of Problems", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songindex =parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songindex}.mp3`;
        masterSongName.innerText = songs[songindex-1].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=10){
    songindex = 1;
    }
    else{
        songindex  += 1;
    }
    audioElement.src=`songs/${songindex}.mp3`;
    masterSongName.innerText = songs[songindex-1].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=1){
    songindex = 1;
    }
    else{
        songindex  -= 1;
    }
    audioElement.src=`songs/${songindex}.mp3`;
    masterSongName.innerText = songs[songindex-1].songName;
    audioElement.currentTime= 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
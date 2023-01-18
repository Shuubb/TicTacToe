
//Modal initializers
let modal = document.getElementById("myModal");
let modalText = document.getElementById(`modalText`);
function resultScreen(player) {
    modal.style.display = `block`;
    modalText.innerHTML = (player == 'X') ? `X Had Won!` : (player == 'O') ? `O Had Won!` : `It's a Draw!`;
}
window.onclick = function(event) {
  if (event.target == modal)
    modal.style.display = "none";
}

// let container = document.getElementById(`container`);
// const resizeObserver = new ResizeObserver(entries =>
//     container.style.width = entries[0].target.clientHeight
// )

//   // start observing a DOM node
// resizeObserver.observe(container);



//Game initializers
let playCount = 0;
let winningSituations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];
let windows = new Array(3);
let tmp = document.getElementsByClassName(`row`);
let freezeGame = document.getElementById(`freezeGame`);
for(let i = 0; i < 3; i++){
    windows[i] = tmp[i].getElementsByTagName(`div`);
    for(let j = 0; j < 3; j++){
        windows[i][j].addEventListener("click", Handler);
        windows[i][j].addEventListener("mouseover", anim);
        windows[i][j].addEventListener("mouseout", notanim);
    }
}
function anim() {
    let a = (playCount % 2 == 0) ? `X` : `O`;
    if(!this.classList.contains('X') && !this.classList.contains('O')){
        this.classList.add(a);
        console.log(`yep`);
    }
}
function notanim() {
    let a = (playCount % 2 == 0) ? `X` : `O`;
    if(!this.classList.contains(`active`))
        this.classList.remove(a)
}

//Game Mechanics

function Handler() {
    let a = (playCount % 2 == 0) ? `X` : `O`;
        playCount++;
        this.classList.add(a, 'active');
        checkWin(a);
}

function reset() {
    playCount = 0;
    freezeGame.style.display = "none";
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            windows[i][j].classList.remove('X', 'O', 'active');
}

function checkWin(player) {

    if(playCount == 9){
        resultScreen(`draw`);
    }

    let combo = new Array(0);
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++)
            if(windows[i][j].classList.contains(player))
                combo.push([i, j]);
    }

    for(let i = 0; i < 8; i++){
        let matchCount = 0;
        for(let j = 0; j < combo.length; j++){
            for(let f = 0; f < 3; f++){
                if(combo[j][0] == winningSituations[i][f][0] &&
                   combo[j][1] == winningSituations[i][f][1])
                    matchCount++;
            }
        }
        if (matchCount >= 3){
            resultScreen(player);
            freezeGame.style.display = "block";
        }

    }
}

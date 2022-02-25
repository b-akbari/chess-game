
const gameBoard = {
    //each "row" is the Y coordinate and each "column" is the X coordinate gameBoard.board[y][x];
    board: [
      ['', '', '','','','','',''],
      ['', '', '','','','','',''],
      ['', '', '','','','','',''],
      ['', '', '','','','','',''],
      ['', '', '','','','B','',''],
      ['', '', '','','','','',''],
      ['', '', '','','','','',''],
      ['', '', 'R','','','','',''],
    ],}
  
const baseBoard= [
    ['', 'r', '','r','','r','','r'],
    ['r','','r','','r','','r',''],
    ['', 'r', '','r','','r','','r'],
    ['', '', '','','','','',''],
    ['', '', '','','','','',''],
    ['b', '', 'b','','b','','b',''],
    ['', 'b', '','b','','b','','b'],
    ['b', '', 'b','','b','','b',''],
  ]

let blackTurn=true;
let firstClick=true;
let validClick=true;
  
function renderPieces(){
  //if row>column = 'r' inner html= <img src='https://www.pinclipart.com/picdir/big/72-729763_dots-clipart-red-circle-circle-png-download.png'
  console.log('renderPieces triggered');
    gameBoard.board.forEach((row,idexY)=>{
    row.forEach((X,idexX)=>{
            let square= document.getElementById(`${idexY}-${idexX}`);
            if(X==='r'){
            // player2Piece.classList.add('red');
            square.innerHTML="<img src='https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/4320467701dd4de.png'>"
            // "<img src='https://www.pinclipart.com/picdir/big/72-729763_dots-clipart-red-circle-circle-png-download.png'>"
            }
            else if(X==='b')
            {
            // docume.getElementById(`${idexY}-${idexX}`);
            // player1Piece.classList.add('black');
            square.innerHTML="<img src='https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/373f3c622fd0305.png'>";
            // ©
            // "<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.medassurance.com%2Fwp-content%2Fuploads%2F2015%2F06%2Fblack-circle.png&f=1&nofb=1'>";
            } 
            else if(X=='o')
            {
                square.innerHTML="<img src ='https://www.pngarts.com/files/3/Shooting-Target-PNG-Background-Image.png'>"
            }
            else if(X==='')
            {
                square.innerHTML="";
            }
            else if(X==='B')
            {
                square.innerHTML="<img src='https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d63d9911dccd0f9.png'>";
            }
            else if(X==='R')
            {
                square.innerHTML="<img src='https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/f3d2944135aa687.png'>";
            }
    })
})
}

renderPieces();

let winner=null;
// let possibleMoveNum=0;
let winCheckArray=[];
// Get the modal
let modal = document.getElementById("myModal");
let winningMessage=document.getElementById('winning-message');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function checkWin(){
    console.log('checkWin triggered')
    winCheckArray=[];
    optionArrY=[];
    selected=true;
    if (blackTurn==false){
        gameBoard.board.forEach((row,idexY)=>{
            console.log('row:',row);
            row.forEach((column,idexX)=>{
                if(column=='r'||column=='R'){
                    selectedPieceType=column;
                    console.log('this is the column',column);
                    console.log('option array check 1: ',optionArrY);
                    console.log('index Y:',idexY,'index X:',idexX)
                    checkOptions(idexX,idexY,column);
                    console.log('option array: ',optionArrY);
                    console.log('winCheckArray check 2:',winCheckArray);
                }
            })
        })
        if(winCheckArray.length==0){
            winner='black';
            modal.style.display = "block";
            winningMessage.innerText='Black wins!!!'
        }
    }

    if(blackTurn==true){
        gameBoard.board.forEach((row,idexY)=>{
            row.forEach((column,idexX)=>{
                if(column=='b'||column=='B'){
                    checkOptions(idexX,idexY,column);
                    console.log('test WCA',winCheckArray);
                    console.log('test WCA',optionArrY);
                }
            })
        })
        if(winCheckArray.length==0){
            modal.style.display = "block";
            winner='Red';
            winningMessage.innerText='Red wins!!!'
        }
    }
    selected=false;
    removeOptions();
}

//variables used to get clicked location on grid, clickedRow:X coordinate, clickedColumn=Y
let clickedId=null;
let clickedY=[];
let clickedX=[];
let clickedIdString=null;

function getClickedLocation (evt){  
    console.log('getClickedLocation triggered')
    //caches box ID, X and Y coordinates.
    clickedIdString=evt.currentTarget.id.split('-');
    clickedId=evt.currentTarget.id;
    clickedY=parseInt(clickedIdString[0]);
    clickedX=parseInt(clickedIdString[1]);
    console.log('X:'+clickedX+' Y: '+clickedY);
}

let prevClickedId=null;
let prevClickedY=[];
let prevClickedX=[];
selectedPieceType=null;
let selected=false;

function ToggleSelectPiece(evt){ //on first click checks if the location belongs to the current player, calls add prev click Function
    console.log('toggleSelectPiece called');
    getClickedLocation(evt);
    optionsShowing=false;
    if(prevClickedId===clickedId || (gameBoard.board[clickedY][clickedX]!='o' && selected==true) ){
        document.getElementById(clickedId).classList.remove('selected');
        removeOptions();
        prevClickedId=null;
        firstClick=true;
        renderPieces();
    } else if(gameBoard.board[clickedY][clickedX]==='b' && blackTurn==true &&selected==false){
        if(prevClickedId==null){
            addPrevClick();
            // console.log(`prev clicked x:${prevClickedX} / prevclickedY: ${prevClickedY} // clickedX: ${clickedX} / clickedY: ${clickedY}`);
        } 

    } else if(gameBoard.board[clickedY][clickedX]==='B' && blackTurn==true &&selected==false ){
        if(prevClickedId==null){
            addPrevClick();
            // console.log(`prev clicked x:${prevClickedX} / prevclickedY: ${prevClickedY} // clickedX: ${clickedX} / clickedY: ${clickedY}`);
        } 

    } else if (gameBoard.board[clickedY][clickedX]==='r' && blackTurn==false && selected==false ){
        if(prevClickedId==null){
            addPrevClick();
            // console.log(`prev clicked x:${prevClickedX} / prevclickedY: ${prevClickedY} // clickedX: ${clickedX} / clickedY: ${clickedY}`);
        } 
    }else if(gameBoard.board[clickedY][clickedX]==='R' && blackTurn==false &&selected==false ){
        if(prevClickedId==null){
            addPrevClick();
            // console.log(`prev clicked x:${prevClickedX} / prevclickedY: ${prevClickedY} // clickedX: ${clickedX} / clickedY: ${clickedY}`);
        } 
        
    }
}

function addPrevClick(){ // used to highlight and chache prev click's info
    console.log('addPrevClick triggered');
    prevClickedId=clickedId;
    prevClickedX=clickedX;
    prevClickedY=clickedY;
    console.log('added prev click')
    document.getElementById(clickedId).classList.add('selected');
    selectedPieceType=gameBoard.board[clickedY][clickedX];
    selected=true;
    firstClick= false;
}

//possible options of movement/capture for a selected piece
function moveUpLeft(clickedX,clickedY){
    if(gameBoard.board[clickedY-1][clickedX-1] =='' ){
        optionArrX.push(clickedX-1);
        optionArrY.push(clickedY-1);
    }
}
function moveUpRight(clickedX,clickedY){
    if( gameBoard.board[clickedY-1][clickedX+1] =='' ){
        optionArrX.push(clickedX+1);
        optionArrY.push(clickedY-1);
    }
}
function moveDownLeft(clickedX,clickedY){
    if(gameBoard.board[clickedY+1][clickedX-1] ==''){
        //down and to the right
        optionArrX.push(clickedX-1);
        optionArrY.push(clickedY+1);
    }
}
function moveDownRight(clickedX,clickedY){
    if(gameBoard.board[clickedY+1][clickedX+1] ==''){
        //moving down to the left
        optionArrX.push(clickedX+1);
        optionArrY.push(clickedY+1);
    }
}
function captureUpLeft(clickedX,clickedY){
    if(gameBoard.board[clickedY-2][clickedX-2] ==''){
        optionArrX.push(clickedX-2);
        optionArrY.push(clickedY-2);
    }
}
function captureUpRight(clickedX,clickedY){
    if(gameBoard.board[clickedY-2][clickedX+2] ==''){
        optionArrX.push(clickedX+2);
        optionArrY.push(clickedY-2);
    }
}
function captureDownRight(clickedX,clickedY){
    if(gameBoard.board[clickedY+2][clickedX+2] ==''){
        optionArrX.push(clickedX+2);
        optionArrY.push(clickedY+2);
    }
}
function captureDownLeft(clickedX,clickedY){
    if(gameBoard.board[clickedY+2][clickedX-2] ==''){
        optionArrX.push(clickedX-2);
        optionArrY.push(clickedY+2);
    }
}

let optionArrX=[];
let optionArrY=[];
let optionsShowing=false;
function checkOptions(clickedX,clickedY,piece){
    console.log('checkOptions triggered');
    optionArrY=[];
    optionArrX=[];
    // firstClick===false &&
    if( blackTurn===true && piece=='b' && selected==true){ //black piece (moving 'up')
        if(clickedY>=1){
            moveUpRight(clickedX,clickedY);
            moveUpLeft(clickedX,clickedY);
        }
        //captures
        if(clickedY>1 && clickedY<=7){
            if(gameBoard.board[clickedY-1][clickedX-1] =='r' || gameBoard.board[clickedY-1][clickedX-1] =='R'){
                captureUpLeft(clickedX,clickedY);
            }//right side capture
            if(gameBoard.board[clickedY-1][clickedX+1] =='r' || gameBoard.board[clickedY-1][clickedX+1] =='R'){
                captureUpRight(clickedX,clickedY);
            }
        }
    } else if( blackTurn===true && piece==='B' && selected==true){//King black piece (moving up or down)
        //moving up
        if(clickedY>=1){
            moveUpRight(clickedX,clickedY);
            moveUpLeft(clickedX,clickedY);
        }
        //moving down
        if(clickedY<=6){
            moveDownRight(clickedX,clickedY);
            moveDownLeft(clickedX,clickedY);
        }

        //captures
        if(clickedY<=5 && clickedY>=0){
            // down left capture
            if(gameBoard.board[clickedY+1][clickedX-1] =='r' || gameBoard.board[clickedY+1][clickedX-1] =='R'){
                captureDownLeft(clickedX,clickedY);
            }// down right capture
            if(gameBoard.board[clickedY+1][clickedX+1] =='r' || gameBoard.board[clickedY+1][clickedX+1] =='R'){
                captureDownRight(clickedX,clickedY);
            }
        }
        if(clickedY>1 && clickedY<=7){
            //up left capture
            if(gameBoard.board[clickedY-1][clickedX-1] =='r'|| gameBoard.board[clickedY-1][clickedX-1] =='R'){
                captureUpLeft(clickedX,clickedY);
            }
            //up right capture
            if(gameBoard.board[clickedY-1][clickedX+1] =='r' || gameBoard.board[clickedY-1][clickedX+1] =='R' ){
                captureUpRight(clickedX,clickedY);
            }
        }
        //regular red piece

    } else if (blackTurn===false && piece==='r' ){ //if piece is regular red
        //moves
        if(clickedY<=6){
            moveDownRight(clickedX,clickedY);
            moveDownLeft(clickedX,clickedY);
        }

        //captures
        if(clickedY<=5 && clickedY>=0){
            //left side capture
            if(gameBoard.board[clickedY+1][clickedX-1] =='b' || gameBoard.board[clickedY+1][clickedX-1] =='B'){
                captureDownLeft(clickedX,clickedY);
            }//right side capture
            if(gameBoard.board[clickedY+1][clickedX+1] =='b' || gameBoard.board[clickedY+1][clickedX+1] =='B'){
                captureDownRight(clickedX,clickedY);
            }
        } 
    }else if(blackTurn===false && piece==='R' && selected===true){//King Red Piece
        console.log('hitting this');
        if(clickedY>=1){
            moveUpRight(clickedX,clickedY);
            moveUpLeft(clickedX,clickedY);
        }
        if(clickedY<=6){
            moveDownRight(clickedX,clickedY);
            moveDownLeft(clickedX,clickedY);
        }
        //captures
        if(clickedY<=5 && clickedY>=0){
            // down left capture
            if(gameBoard.board[clickedY+1][clickedX-1] =='b' || gameBoard.board[clickedY+1][clickedX-1] =='B'){
                captureDownLeft(clickedX,clickedY);
            }// down right capture
            if(gameBoard.board[clickedY+1][clickedX+1] =='b' || gameBoard.board[clickedY+1][clickedX+1] =='B'){
                captureDownRight(clickedX,clickedY);
            }
        }
        if(clickedY>1 && clickedY<=7){
            //up left capture
            if(gameBoard.board[clickedY-1][clickedX-1] =='b'|| gameBoard.board[clickedY-1][clickedX-1] =='B'){
                captureUpLeft(clickedX,clickedY);
            }
            //up right capture
            if(gameBoard.board[clickedY-1][clickedX+1] =='b' || gameBoard.board[clickedY-1][clickedX+1] =='B' ){
                captureUpRight(clickedX,clickedY);
            }
        }
        
    }
    console.log('option array: ',optionArrY);
    console.log('winCheckArray',winCheckArray);
    winCheckArray=winCheckArray.concat(optionArrY)
    optionsShowing==true;
    // modelOptions();
}

function modelOptions(){
    console.log('modelOptions triggered');
    for(i=0;i<optionArrY.length; i++){
        gameBoard.board[optionArrY[i]][optionArrX[i]]='o';
    }
    optionsShowing=true;
}

function removeOptions(){
    console.log('removeOptions triggered');
    gameBoard.board.forEach((row,idexY)=>{
        row.forEach((column,idexX)=>{
            if(column=='o'){
                gameBoard.board[idexY][idexX]='';
                console.log('test WCA',optionArrY);
            }
        })
    })

    if(isNaN(prevClickedId)){
        if(document.getElementById(prevClickedId).classList.contains('selected')){
            document.getElementById(prevClickedId).classList.remove('selected');
        }
    }
    optionsShowing=false;
    selected=false;
}


function capturePiece(){
    console.log('capturePiece triggered');
    let diffY=null;
    let diffX=null;
    let y1=prevClickedY;
    let x1=prevClickedX;
    diffX=(clickedX-x1);
    diffY=(clickedY-y1);
    console.log('capturePiece Test1-diffX:'+diffX);
    if(Math.abs(diffX)>1){
            for(i=0;i<=Math.abs(diffX); i++){
                console.log(`y1 =${y1} x1= ${x1} diffX=${diffX}`)
                x1+=Math.sign(diffX);
                y1+=Math.sign(diffY);
                console.log(`y1 =${y1} x1= ${x1}`)
                gameBoard.board[y1][x1]='';
                x1+=Math.sign(diffX);
                y1+=Math.sign(diffY);
                console.log(`y1 =${y1} x1= ${x1}`)

                diffX=(clickedX-x1);
                diffY=(clickedY-y1);
            }
    }
}

function movePiece(evt){
    console.log('movePiece triggered');
       if(gameBoard.board[prevClickedY][prevClickedX]='o'){
        capturePiece();
        let lastSpot=document.getElementById(prevClickedId)
        lastSpot.classList.remove('selected');
        gameBoard.board[prevClickedY][prevClickedX]='';
        blackTurn=!blackTurn;
        firstClick=true;
        if(selectedPieceType==='b' && clickedY==0){
            selectedPieceType='B';
        } else if(selectedPieceType=='r' && clickedY==7){
            selectedPieceType='R';
        }    
        removeOptions();
        gameBoard.board[clickedY][clickedX]=selectedPieceType;
        selectedPieceType=null;
        selected=false;
        prevClickedId=null;
    }
}

//adding event listener to all squares on grid
const boxes=document.querySelectorAll('.box');

boxes.forEach(box=> box.addEventListener('click',selectBox));

function selectBox(evt){
console.log('selectBox is triggered');


    if (winner==null){
        if(firstClick==true ||prevClickedId==clickedId){
            ToggleSelectPiece(evt);
        }
        if (selected==true &&firstClick==false && optionsShowing==false){
            console.log('select-box: checkoptions, modelOps')
            checkOptions(clickedX,clickedY,selectedPieceType);
            modelOptions();
            renderPieces();

        }
        if (selected ==true && optionsShowing==true && gameBoard.board[clickedY][clickedX] =='o'){
            movePiece(); 
            removeOptions();
            renderPieces();
            checkWin();
        } else{
            clickedId=prevClickedId;
            clickedX=prevClickedX;
            clickedY=prevClickedY;
        }
        console.log('first click:',firstClick,'  blackTurn: ' ,blackTurn,'selected',selected,'optionsShowing',optionsShowing,'winner',winner);
    }
}
const resetButton=document.getElementById('reset-button');
resetButton.addEventListener('click',resetBoard);

function resetBoard() {
    gameBoard.board= [
        ['', 'r', '','r','','r','','r'],
        ['r','','r','','r','','r',''],
        ['', 'r', '','r','','r','','r'],
        ['', '', '','','','','',''],
        ['', '', '','','','','',''],
        ['b', '', 'b','','b','','b',''],
        ['', 'b', '','b','','b','','b'],
        ['b', '', 'b','','b','','b',''],
      ]
    // removeOptions();
    renderPieces();
    firstClick=true;
    selected=false;
    winner=null;
}
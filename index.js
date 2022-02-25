

// die Autos mussen wiederholt werden
const roadarea = document.querySelector(".road");

let player = {step : 5};
let keys = {ArrowUp: false , ArrowDown: false, Arrowleft: false ,ArrowRight: false};
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(ev){
  keys[ev.key] = true;
}

function keyUp(ev){
  keys[ev.key] = false;
}

function movelines(){
  let roadlines = document.querySelectorAll(".line");
  roadlines.forEach(function(item)
  {
    if(item.y >= 700){
      item.y = item.y -750;
    }
   item.y = item.y + player.step;
   item.style.top = item.y + "px"
  })
}
//////
let playercar = document.querySelector(".car")

function movevehicles(playercar){
  let vehicles = document.querySelectorAll(".vehicle");
  playercarboun = getBoundingClientRect();

  vehicles.forEach(function(item){
    /// check if player car collides
    othercarboun = item.getBoundingClientRect();
    // if player car bottom hits other car top
    //if player car top hits other car bottoms
    //if player car left hits other car right 
    // if player right hits other car left
    if(!((playercarboun.bottom < othercarboun.top) || (playercarboun.bottom > othercarboun.top) ||
      (playercarboun.left > othercarboun.right) || (playercarboun.left < othercarboun.right)
    )){
      //stop driving 
      player.start = false ;
    }
    if(item.y > 750){ 
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px" ;
      roadarea.appendChild(vehicles);
    }
  })
}

function playarea(){
  //let playercar = document.querySelector(".car")
  let road = roadarea.getBoundingClientRect();
  if(player.start){ 
    movelines();
    movevehicles(playercar);

    if(keys.ArrowUp && player.y > (road.top + 80)){
    player.y = player.y - player.step ;
      }
  
    
    if(keys.ArrowDown && player.y < (road.bottom - 80)) // 80 is car height
    {
       player.y = player.y + player.step ;
   }
   if(keys.Arrowleft && player.x > 0){
       player.x = player.x -player.step
    }
    if(keys.ArrowRight && player.x <(road.width - 64)) // width(50) + 2* border
    {
       player.x = player.x + player.step;
    }

    playercar.style.top = player.y +"px";
    playercar.style.left = player.x + "px" ;
    window.requestAnimationFrame(playarea);
  
  }
}

function init(){
  player.start= true;
  window.requestAnimationFrame(playarea);

  let playercar = document.createElement("div");
  playercar.setAttribute("class", "car");
  roadarea.appendChild(playercar);

  player.x = playercar.offsetLeft;
  player.y = playercar.offsetTop;
  //// line repeated 
  for(x = 0 ; x< 5 ; x++){
    let roadlines = document.createElement("div");
    roadlines.setAttribute("class", "line");
    roadlines.y =x * 150 ;
    roadlines.style.top = roadlines.y + "px" ;
    roadarea.appendChild(roadlines);
  }
  // vehicles in road generate randomly
  for(x = 0; x< 4 ; x++) {
    let vehicles = document.createElement("div");
    vehicles.setAttribute("class" , "vehicle");
    vehicles.y = ((x+1) *300) * -1 ;
    vehicles.style.top = vehicles.y + "px";
    // roadwidth = 400, veh width = 50
    vehicles.style.left = Math.floor(Math.random() * 350 )+ "px";
    roadarea.appendChild(vehicles);
  }
}
init();
//////////////////////////

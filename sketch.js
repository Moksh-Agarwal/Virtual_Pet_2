//Create variables here
var dog, happyDog, foodS, foodStock;
var dog_img, hap_img;
var database;
var feed;
var addFood;
var bottle;
var time;

function preload()
{
  //load images here
  dog_img= loadImage("images/dogImg.png");
  hap_img= loadImage("images/dogImg1.png");
}

function setup() {
  database= firebase.database();
	createCanvas(600, 600);
  dog= createSprite(300,450);
  dog.addImage(dog_img);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
 feed= createButton("Feed the Dog");
  feed.position(750,70);
 
feed.mousePressed(feedDog);
 
 
  addFood= createButton("Add Food");
  addFood.position(670,70);
  addFood.mousePressed(addFoods);
  bottle= new Food();
time=hour();
}


function draw() {  
  bottle.display();
background(46,139,87);
fill("white");
textSize(20);
text("Last Fed Time is : "+ time+ " :00",80,35 );
if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(hap_img)
}
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
text("Food left : "+ foodS, 250,350);
if(foodS==0)
{
  fill("white");
  textSize(20);
  text("No food left, please add food", 200,300);
}
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=20;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog()
{
  if(foodS>0 && foodS<=20)
  {
 foodS--;
 database.ref('/').update({
   Food:foodS
 })
}
}
 
 


function addFoods()
{
  if(foodS>=0 && foodS<20)
  {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
}

var dog,dogImg, happyDog,database,foodS,foodStock;
var feed,add;
var Feedtime,Lastfeed;
var foodObj;
function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 600);
  database = firebase.database();  

  foodObj=new Food();
  dog = createSprite(400,350,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;

 

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  feed = createButton("FEED THE DOG")
  feed.position(700,80)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(850,80)
  add.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87); 
  foodObj.display()

  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
    Lastfeed=data.val();
    });

    fill(255,255,254);
    textSize(15);
  if(Lastfeed>=12)
 {
   text("Last Feed :" + Lastfeed%12 + "PM", 150,100);
 }else if(Lastfeed==0 )
 {
   text("Last Feed : 12 AM" , 150,100)
 }else
 {
   text("Last Feed :" + Lastfeed + "AM", 150,100);
 }

 drawSprites();

 
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function FeedDog(){

  dog.addImage(happyDog)

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  //foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour ()
   })
  }
  function addFoods(){
    foodS++;
    database.ref("/").update({
      Food:foodS
    })
  }

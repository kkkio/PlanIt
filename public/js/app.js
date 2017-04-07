function placeAnOrder(OrderNumber){
  console.log("Customer order:",OrderNumber);
  cookAndDeliverFood(function(){
    console.log("Customer order:",OrderNumber," served");
  });
}

function cookAndDeliverFood(callback){
  setTimeout(callback,5000);
}
placeAnOrder(1);
placeAnOrder(2);
placeAnOrder(3);
placeAnOrder(4);

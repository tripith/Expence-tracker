const form = document.querySelector("form");
form.addEventListener("submit",function(event){
   
    event.preventDefault();
    
    console.log("prevent Done");

    // store that value into local stotage.
    let amount = document.querySelector("#amount").value;
    let description = document.querySelector("#description").value;
   
    localStorage.setItem("amount",amount);
    localStorage.setItem("description",description);

    let ArrayItems = JSON.parse(localStorage.getItem("ulitems")) || [];
    ArrayItems.push({amount,description});
    localStorage.setItem("ulitems",JSON.stringify(ArrayItems));
    amount = "";
    description = "";
    displayItems();
});

  function displayItems() {
    let StorageList = JSON.parse(localStorage.getItem("ulitems"))|| [];
    let currentItem = document.getElementById("ulitems");
    currentItem.innerHTML = "";

    for(let i = 0; i<StorageList.length; i++){
      let item = StorageList[i];
      let listItem = document.createElement("li");
      listItem.innerHTML= `Amount:${item.amount}, Description:${item.description}`;
     
   
    // creat a delete button with them
     let DeleteBtn = document.createElement("button");
     DeleteBtn.innerHTML = "Delete Items";
     DeleteBtn.addEventListener("click",(function(index){
      return function(){
        StorageList.splice(index,1);
        localStorage.setItem("ulitems",JSON.stringify(StorageList));
        displayItems();
      };
    }

     )(i));

     listItem.appendChild(DeleteBtn);

     //create edit button

     let editBtn = document.createElement("button");
     editBtn.innerHTML = "Edit Item";
     editBtn.addEventListener("click", (function(index) {
       return function() {
         let amount = prompt("Enter the new amount:");
         let description = prompt("Enter the new description:");
         StorageList[index].amount = amount;
         StorageList[index].description = description;
         localStorage.setItem("ulitems", JSON.stringify(StorageList));
         displayItems();
       };
     })(i));
     // add the edit button to the list item
     listItem.appendChild(editBtn);

     //add the list item to the current list

     currentItem.appendChild(listItem);

    }
    }
  
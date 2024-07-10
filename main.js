// const column = document.querySelectorAll(".column");
const addCardbtn = document.querySelector("#addCard") 
const main = document.querySelector("#main");
let catchedelement = null;

const addTask = (event) => {
    event.preventDefault();

const currentForm = event.target;
// console.log(currentForm);
const value =  currentForm.elements[0].value;

const parent = currentForm.parentElement;
const ticket = createTicket(value);

if (!value) return;

parent.insertBefore(ticket, currentForm);

const h3Value = parent.children[0].innerText;
if (!Array.isArray(savedTasks[h3Value])) {
  savedTasks[h3Value] = [];
}

savedTasks[h3Value].push(value);

localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

currentForm.reset();
}

// for (let i = 0; i < column.length; i++) {
//     const form = column[i].lastElementChild;
//     console.log(column);
//     form.addEventListener("submit", addTask);
// }


  const CreateCard = (newCard) => {

    const newDiv = document.createElement("div");
    const newH3 = document.createElement("h3");
    const newForm = document.createElement("form");
    const newInput = document.createElement("input");

    const h3Text = document.createTextNode(newCard);

    newDiv.setAttribute("class", "coloumn");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("placeholder", "+ Add Task");

    newH3.appendChild(h3Text);
    newForm.appendChild(newInput);
    newDiv.appendChild(newH3);
    newDiv.appendChild(newForm);

    newForm.addEventListener("submit", addTask);

    newDiv.addEventListener("dragleave", (event) => event.preventDefault());
    newDiv.addEventListener("dragover", (event) => event.preventDefault());
  
    newDiv.addEventListener("drop", (event) => {
      const jisElementPerDropKiyaJaRahaHo = event.target;
  
      if (jisElementPerDropKiyaJaRahaHo.className.includes("column")) {
        // console.log("2");
        jisElementPerDropKiyaJaRahaHo.appendChild(catchedelement);
      }
  
      if (jisElementPerDropKiyaJaRahaHo.className.includes("ticket")) {
        jisElementPerDropKiyaJaRahaHo.parentElement.appendChild(
          catchedelement
        );
      }
    });
    
    return newDiv;
  }

  const createTicket = (value) => {
  
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);
  
    ticket.setAttribute("draggable", "true");
    ticket.setAttribute("class","ticket")
    ticket.appendChild(elementText);

    
  ticket.addEventListener("mousedown", (event) => {
    catchedelement = event.target;
    console.log("1");
  });
  
    return ticket;
  };
  
  let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

  if (!savedTasks) {
    savedTasks = {};
  }
  
  
  for (const title in savedTasks) {
    const card = CreateCard(title);
  
    const arrayOfTasks = savedTasks[title];
  
    for (let i = 0; i < arrayOfTasks.length; i++) {
      const p = createTicket(arrayOfTasks[i]);
  
      card.insertBefore(p, card.lastElementChild);
    }
  
    main.insertBefore(card, addCardbtn);
  }
  

  addCardbtn.addEventListener("click", () => {
   if(!newCard) return;

   const yourdiv = CreateCard(newCard);
   main.insertBefore(yourdiv , addCardbtn);

  });
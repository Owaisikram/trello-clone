// const column = document.querySelectorAll(".column");
const addCardbtn = document.querySelector("#addCard") 
const main = document.querySelector("#main");

const addTask = (event) => {
    event.preventDefault();

const currentForm = event.target;
console.log(currentForm);
const value =  currentForm.elements[0].value;

const parent = currentForm.parentElement;
const ticket = createTicket(value);

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
    

    return newDiv
  }

  const createTicket = (value) => {
  
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);
  
    ticket.setAttribute("draggable", "true");
    ticket.appendChild(elementText);
  
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
  

  addCardbtn.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentInputForm = event.target
    const newInputCard = currentInputForm.children[0].value;
    console.log(newInputCard);

    const newDivCard = CreateCard(newInputCard);

    main.insertBefore(newDivCard, addCardbtn);

    currentInputForm.reset();
  });
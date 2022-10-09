<<<<<<< HEAD
var apiCall = "http://localhost:3000/todo";
=======
var apiCall ="crudApiLinkHere";
>>>>>>> 4dd6fb74db369fa27ace4dd7d205473b533217e9
var form = document.querySelector("#form");
var items = document.getElementById("items");
var calcExpense = document.getElementById("calculateExpense");
// console.log(calcExpense);
var total = 0;
window.addEventListener("DOMContentLoaded", () => {
  getPost();
});

var getPost = async () => {
  try {
    let res = await axios.get(`${apiCall}/get-todos`);
    console.log(res);
    showUser(res.data);
  } catch (err) {
    console.log(err);
  }
};
var showUser = (results) => {
  total = 0;
  results.forEach((result) => {
    showUserInFront(result);
  });
};

var showUserInFront = (result) => {
  total += parseInt(result.expense);
  calcExpense.innerHTML = `Total Expense = ${total}`;
  child = `<li id=${result.id}>${result.expense}-${result.description}-${result.category}
  <button value=${result.id} class="edit" onclick=editPost("${result.id}")>edit</button>
  <button value=${result.id} class="delete" onclick=deletePost("${result.id}",${result.expense})>delete</button>
  </li>`;
  items.innerHTML = items.innerHTML + child;
};

var addForm = async (e) => {
  e.preventDefault();
  var expense = e.target.expense.value;
  var description = e.target.description.value;
  var category = e.target.category.value;
  // console.log(expense, description, category);
  var newExpense = {
    expense: expense,
    description: description,
    category: category,
  };
  try {
    let res = await axios.post(`${apiCall}/add-todo`, newExpense);
    // console.log(res);
    showUserInFront(res.data);
  } catch (err) {
    console.log(err);
  }
};
form.addEventListener("submit", addForm);

var deletePost = async (id, expense) => {
  let res = await axios.delete(`${apiCall}/del-todo/${id}`);
  console.log(res.status);
  total -= parseInt(expense);
  calcExpense.innerHTML = `Total Expense = ${total}`;
  if (res.status === 200) {
    removeUserFromScreen(id);
  } else {
    console.log("smtg went wrong");
  }
};
var editPost = async (id) => {
  var ne = document.querySelector("#expense").value;
  var nd = document.querySelector("#description").value;
  var nc = document.querySelector(".category").value;
  // console.log(ne, nd, nc);
  var updatedExpense = {
    expense: ne,
    description: nd,
    category: nc,
  };
  let res = await axios.put(`${apiCall}/update-todo/${id}`, updatedExpense);
  console.log(res);
  if (res.status === 200) {
    items.innerHTML = "";
    getPost();
  } else {
    console.log("smtg went wrong");
  }
};
function removeUserFromScreen(id) {
  const parentNode = document.getElementById("items");
  const childNode = document.getElementById(id);
  console.log(childNode);
  if (childNode) {
    parentNode.removeChild(childNode);
  }
}

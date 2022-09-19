var apiCall = "https://crudcrud.com/api/2fc15f813db44baeaa6e134d63ba74dd";
var form = document.querySelector("#form");
var items = document.getElementById("items");

window.addEventListener("DOMContentLoaded", () => {
  getPost();
});

function getPost() {
  axios
    .get(`${apiCall}/todos`)
    .then((res) => {
      showUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
var showUser = (results) => {
  results.forEach((result) => {
    showUserInFront(result);
  });
};

var showUserInFront = (result) => {
  child = `<li id=${result._id}>${result.expense}-${result.description}-${result.category}
  <button value=${result._id} class="edit" onclick=editPost("${result._id}")>edit</button>
  <button value=${result._id} class="delete" onclick=deletePost("${result._id}")>delete</button>
  </li>`;
  items.innerHTML = items.innerHTML + child;
};

var addForm = (e) => {
  e.preventDefault();
  var expense = e.target.expense.value;
  var description = e.target.description.value;
  var category = e.target.category.value;
  // console.log(expense, description, category);
  axios
    .post(`${apiCall}/todos`, {
      expense: expense,
      description: description,
      category: category,
    })
    .then((result) => {
      showUserInFront(result.data);
    })
    .catch((err) => {
      console.log("something went wrong " + err);
    });
};
form.addEventListener("submit", addForm);

function deletePost(id) {
  axios
    .delete(`${apiCall}/todos/${id}`)
    .then((res) => {
      console.log("deleted post with id = ", id);
      removeUserFromScreen(id);
    })
    .catch((err) => {
      console.log(err);
    });
}
function editPost(id) {
  var ne = document.querySelector("#expense").value;
  var nd = document.querySelector("#description").value;
  var nc = document.querySelector(".category").value;
  console.log(ne, nd, nc);
  axios
    .put(`${apiCall}/todos/${id}`, {
      expense: ne,
      description: nd,
      category: nc,
    })
    .then((res) => {
      console.log("edited post ", id);
      console.log(res);
      items.innerHTML = "";
      getPost();
    })
    .catch((err) => {
      console.log(err);
    });
}
function removeUserFromScreen(id) {
  const parentNode = document.getElementById("items");
  const childNode = document.getElementById(id);
  console.log(childNode);
  if (childNode) {
    parentNode.removeChild(childNode);
  }
}

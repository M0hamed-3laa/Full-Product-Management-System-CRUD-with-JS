let span = document.querySelector(".Up");
window.onscroll = function () {
  // if (this.scrollY >= 1000) {
  //   span.classList.add("show");
  // } else {
  //   span.classList.remove("show");
  // }
  this.scrollY >= 1000
    ? span.classList.add("show")
    : span.classList.remove("show");
};
span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

let mood = "create";
let tomp;

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "rgba(255, 0, 0, 0.505)";
    total.innerHTML = "";
  }
}

//create

dataProduct = [];
if (localStorage.getItem("product")) {
  dataProduct = JSON.parse(localStorage.getItem("product"));
}

submit.onclick = function () {
  newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != " " &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tomp] = newProduct;
      mood = "create";
      count.style.display = "block";
      submit.innerHTML = "craete";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  showData();
};

//clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
showData();
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>

    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateDate(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let delAll = document.getElementById("delAll");

  if (dataProduct.length > 0) {
    delAll.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
    `;
  } else {
    delAll.innerHTML = "";
  }
}

//delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

function updateDate(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  category.value = dataProduct[i].category;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "Update";
  tomp = i;
  this.scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "srarchTitle") {
    searchMood = "titel";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "srarch By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateDate(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
    
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateDate(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

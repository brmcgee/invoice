let productList = [];
let activeVendor = [];

let pre = `http://localhost:6900`;


function el(target) {
  return document.querySelector(target);
}

function getThumbnailUrl(url) {
  let img = url;
  let file = img.split("/")[img.split("/").length - 1];
  let thumb = `${pre}/invoice-uploads/thumbnail/th_${file}`;
  return thumb;
}

function clearItemList() {
  el("#productListGroup").innerHTML = "";
  el("#dbString").value = "";
  el("#dbHtml").value = "";
  el("#totalCost").innerHTML = "0";
  productList = [];
  el("#totalProductLength").innerHTML = "0";
}
function showJobAddress() {
  let dropdownEl = el("#jobDropdown");
  let fJname = el("#fJname");
  fJname.innerHTML = el("#jName").value;
  let fPo = el("#fPo");
  fPo.innerHTML = el("#po").value;
  let fAddress = el("#fAddress");
  fAddress.innerHTML = el("#jAddress").value;
  let fDate = el("#fDate");
  fDate.innerHTML = el("#jDate").value;
  let fCity = el("#fCity");
  fCity.innerHTML =
    el("#jCity").value + ", " + el("#jState").value + " " + el("#jZip").value;

  if (dropdownEl.style.display == "none") {
    el("#dropdownImg").src = "public/assets/icons/menu-open-black.png";
    dropdownEl.style.display = "block";
    el("#jobAddressFormated").style.display = "none";
    document.getElementById("jumpBtn").innerHTML =
      '<a href="#root" class="btn btn-light" onclick="showJobAddress()">Hide Job Address</a>';
  } else {
    el("#dropdownImg").src = "public/assets/icons/menu-black.png";
    dropdownEl.style.display = "none";
    el("#jobAddressFormated").style.display = "block";
    document.getElementById("jumpBtn").innerHTML =
      '<a href="#root" class="btn btn-light" onclick="showJobAddress()">Show Job Address</a>';
  }
}

function populateProduct() {
  let prodId = el("#item").value - 1;
  el("#description").innerHTML = products[prodId].description;
  el("#cost").innerHTML = products[prodId].cost;
}

vendor = [];
async function fetchCustomersDb() {
  let url = `${pre}/customers`;
  document.getElementById("vendor").innerHTML = "";
  try {
    let response = await fetch(url);
    try {
      let data = await response.json();
      vendor = data;
      populateVendorOptions(data);
    } catch (parseError) {
      console.log(parseError);
    }
  } catch (networkError) {
    console.log(networkError);
  }
}
fetchCustomersDb();

function populateVendorOptions(data) {
  let vendorSelect = document.getElementById("vendor");
  let html = "<option>Choose..</option>";
  data.forEach((v) => {
    html += `<option value="${v.vendorId}">${v.name}</option>`;
  });
  vendorSelect.innerHTML += html;
}

function populateProductOptions(data) {
  let selectItem = document.getElementById("item");
  let html = "<option></option>";
  data.forEach((p) => {
    html += `<option value="${p.prodId}">${p.item}</option>`;
  });
  selectItem.innerHTML += html;
}

async function fetchProductListFromDb() {
  let url = `${pre}/products`;

  try {
    let response = await fetch(url);

    try {
      let data = await response.json();
      products = data;
      populateProductOptions(data);
    } catch (parseError) {
      console.log(parseError);
    }
  } catch (networkError) {
    console.log(networkError);
  }
}
fetchProductListFromDb();

function handleQty() {
  populateProduct();
  let qty = el("#qty").innerHTML;
  let cost = el("#cost").innerHTML;
  let newCost = qty * cost;
  el("#cost").innerHTML = newCost;
}

function removeItem(itemId) {
  let html = "";
  let total = 0;
  let listEl = document.getElementById("productListGroup");
  listEl.innerHTML = "";
  productList.forEach((p) => {
    if (p.prodId != itemId) {
      html += htmlProductItem(p);
      total = total + Number(p.cost);
    }
  });

  listEl.innerHTML = html;
}

let c = 0;
function htmlProductItem(d) {
  let html = "";
  html += `
    <li id="product${c}" class="product list-unstyled row mb-1 px-0 mx-0 bm-border">
        <div class="p-1 px-2">
            <h6 class="my-0">${d.item}</h6>
            <small class="text-body-secondary">${d.description}</small>
            <small>${d.qty} @ ${d.cost / d.qty}</small>
        </div>
        <div class="pe-2 float-end text-end"> $ 
            <span class="costSpan"> ${d.cost}</span>.00
        </div>
    </li>
    `;
  return html;
}
let count = 0;
let counter = 0;
function handleItemAdd() {
  let item = el("#item").value - 1;
  let cost = el("#cost").innerHTML;
  let description = el("#description").innerHTML;
  let qty = el("#qty").innerHTML;
  let dbString = "";
  let listRoot = document.getElementById("productListGroup");

  let obj = {
    prodId: item,
    item: products[item].item,
    description: description,
    qty: qty,
    cost: cost,
  };

  productList.push(obj);
  html = htmlProductItem(obj);

  dbString += `${products[item].item} - ${qty} @ $${cost / qty} = $${cost} `;
  document.getElementById("dbString").innerHTML += dbString;
  document.getElementById("dbHtml").value += JSON.stringify(obj) + ",";
  el("#item").value = "";
  el("#cost").innerHTML = "";
  el("#description").innerHTML = "";
  el("#qty").innerHTML = "1";
  listRoot.innerHTML += html;

  let allCosts = document.querySelectorAll(".costSpan");
  let total = 0;
  allCosts.forEach((c) => {
    total = total + Number(c.innerHTML);
  });
  document.getElementById("totalCost").innerHTML = total;
  document.getElementById("dbString").innerHTML += `Total $${total}\n`;
  document.getElementById("totalProductLength").innerHTML = allCosts.length;
}

// sets vendor from data.js stores to activeVendor
function handleSubmitTo() {
  let company = [];

  let vendorEl = document.getElementById("vendor");
  let vId = Number(vendorEl.value);

  vendor.forEach((v) => {
    if (v.vendorId == vId) {
      company.push(v);
    }
  });

  el("#vName").innerHTML = company[0].name;
  el("#vAddress").innerHTML = `${company[0].address}`;
  el(
    "#vCity"
  ).innerHTML = `${company[0].city}, ${company[0].state} ${company[0].zip}`;
  el("#vPhone").innerHTML = `${company[0].phone}`;
  el("#vEmail").innerHTML = `${company[0].email}`;
  let obj = {
    id: vId,
    name: company[0].name,
    address: `${company[0].address}`,
    city: `${company[0].city}, ${company[0].state} ${company[0].zip}`,
    phone: `${company[0].phone}`,
  };
  activeVendor.push(obj);
}

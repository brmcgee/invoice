let productList = [];
let activeVendor = [];

function el(target){
    return document.querySelector(target);
}
function clearItemList(){
    el('#productListGroup').innerHTML = '';
    el('#dbString').value = '';
    el('#dbHtml').value = '';
    productList = [];
    
}
function showJobAddress(){
    let dropdownEl = el('#jobDropdown')
 
    if (dropdownEl.style.display == 'none') {
        el('#dropdownImg').src = 'public/assets/icons/menu-open-black.png'
        dropdownEl.style.display = 'block';
    } 

    else {

        el('#dropdownImg').src = 'public/assets/icons/menu-black.png'
        dropdownEl.style.display = 'none';
    }
  
}

function populateProduct(){
    let prodId = el('#item').value;
    el('#description').innerHTML = products[prodId].description;
    el('#cost').innerHTML = products[prodId].cost
    // el('#qty').innerHTML = '1';
}

function populateProductOptions(){
    let selectItem = document.getElementById('item');
    let html = '<option></option>';
    products.forEach(p => {
        html += `<option value="${p.prodId}">${p.item}</option>`
    })
    selectItem.innerHTML += html;
}

function handleQty(){
    populateProduct()
    let qty = el('#qty').innerHTML;
    let cost = el('#cost').innerHTML;
    let newCost = qty * cost;
    el('#cost').innerHTML = newCost;
}

function removeItem(itemId) {
    let html = '';
    let total = 0;
    let listEl = document.getElementById('productListGroup');
    let totalEl = document.getElementById('totalCost');
    // totalEl.innerHTML = 0;
    listEl.innerHTML = '';
    productList.forEach(p => {
        if (p.prodId != itemId) {

            html += htmlProductItem(p);
            total = total + Number(p.cost)
        }

    })
   
    listEl.innerHTML = html;
}

let c = 0;
function htmlProductItem(d){
    let html = '';
    html += `
    <li id="product${c}" class="product list-unstyled row rounded border px-0 mx-0">
        <div class="p-2">
            <h6 class="my-0">${d.item}
   
            </h6>
            <small class="text-body-secondary">${d.description}</small>
            <small>${d.qty} @ ${d.cost/d.qty}</small>
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
function handleItemAdd(){
    let item = el('#item').value;
    let cost = el('#cost').innerHTML;
    let description = el('#description').innerHTML;
    let qty = el('#qty').innerHTML;
    let dbString = '';
    let listRoot = document.getElementById('productListGroup');
 
    let obj = {
        'prodId' : count++,
        'item' : products[item].item,
        'description' : description,
        'qty' : qty,
        'cost' : cost
    };
    productList.push(obj)
    html = htmlProductItem(obj);

    dbString += `${products[item].item} - ${qty} @ $${cost/qty} = $${cost} `;
    document.getElementById('dbString').innerHTML += dbString;
    document.getElementById('dbHtml').value += JSON.stringify(obj) + ',';
    el('#item').value = ''; 
    el('#cost').innerHTML = ''; 
    el('#description').innerHTML = ''; 
    el('#qty').innerHTML = '';
    listRoot.innerHTML += html;


    let allCosts = document.querySelectorAll('.costSpan');
    let total = 0;
    allCosts.forEach(c => {
        total = total + Number(c.innerHTML);
    })
    document.getElementById('totalCost').innerHTML = total;
    document.getElementById('dbString').innerHTML += `Total $${total}\n` ;
    document.getElementById('totalProductLength').innerHTML = allCosts.length;
}

// sets vendor from data.js stores to activeVendor 
function handleSubmitTo(){
    let vendorEl = document.getElementById('vendor')
    let vendorId = Number(vendorEl.value);

    el('#vName').innerHTML = vendor[vendorId].name;
    el('#vAddress').innerHTML = `${vendor[vendorId].address}`;
    el('#vCity').innerHTML = `${vendor[vendorId].city}, ${vendor[vendorId].state} ${vendor[vendorId].zip}`
    el('#vPhone').innerHTML = `${vendor[vendorId].phone}`;
    let obj = {
        'id' : vendorId,
        'name' : vendor[vendorId].name,
        'address' : `${vendor[vendorId].address}`,
        'city' : `${vendor[vendorId].city}, ${vendor[vendorId].state} ${vendor[vendorId].zip}`,
        'phone' : `${vendor[vendorId].phone}`
    }
    activeVendor.push(obj)
}

function saveJob(){
    let el = document.getElementById('dbHtml').value;
    let value = (el.slice(0, el.length-1)) + ']';
    document.getElementById('dbHtml').value = value;
}


populateProductOptions()



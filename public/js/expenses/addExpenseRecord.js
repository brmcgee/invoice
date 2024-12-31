let e_categories = [

    {
        'id' : 0,
        'name' : 'Supplies',
        'values' : ['Supplies & material']
    },
    {
        'id' : 1,
        'name' : 'Vehicle Expenses',
        'values' : ['Vehicle gas & fuel', 'Parking & toll', 'Vehicle insurnace', 'Vehicle registration', 'Vehicle repairs', 'Vehicle services']  
    },
    {
        'id' : 2,
        'name' : 'COGS',
        'values' : ['Cost of labor COG', 'Cost of equipment COG', 'Cost of frieght COG', 'Supplies & material COG']  
    },
    {
        'id' : 3,
        'name' : 'Office Expense',
        'values' : ['Office supplies', 'Printing & Photocopying', 'Shipping & Postage', 'Small tools & Equipment', 'Software & Apps']
    },
    {
        'id' : 4,
        'name' : 'Utilities',
        'values' : ['Disposal & waste fees', 'Electricity', 'Heating & cooling', 'Internet & TV service', 'Phone service', 'Water & sewer']  
    },
    {
        'id' : 5,
        'name' : 'Repairs & maintainence',
        'values' : ['Repair', 'Maintainence']  
    },
    {
        'id' : 6,
        'name' : 'Insurance',
        'values' : ['Business insurance', 'Liability Insurance', 'Property Insurance']  
    },
    {
        'id' : 7,
        'name' : 'General Business Expense',
        'values' : ['Bank fees & service charges', 'Conituing Education', 'Memberships & Subscriptions', 'Uniforms']  
    },
    {
        'id' : 8,
        'name' : 'Legal & accounting services',
        'values' : ['Accounting fees', 'Legal fess']  
    },
    {
        'id' : 9,
        'name' : 'Rent',
        'values' : ['Building & land rent', 'Equipment rental']  
    },
    {
        'id' : 10,
        'name' : 'Taxes paid',
        'values' : ['Payroll taxes', 'Property tax']  
    },
    {
        'id' : 11,
        'name' : 'Travel',
        'values' : ['Airfare', 'Hotels', 'Taxis or shared rides', 'Vehicle rental']  
    },
    {
        'id' : 12,
        'name' : 'Advertising & marketing',
        'values' : ['Listing fees', 'Social media', 'Website Ads']  
    },
    {
        'id' : 13,
        'name' : 'Business License',
        'values' : ['Business License']  
    },
    {
        'id' : 14,
        'name' : 'Payroll expense',
        'values' : ['Offices wages & salaries', 'Salaries & wages']  
    },
    {
        'id' : 15,
        'name' : 'Uncategorized expense',
        'values' : ['Uncategorized']  
    },
    {
        'id' : 16,
        'name' : 'Meals',
        'values' : ['Meals with clients', 'Travel meals']  
    },
    {
        'id' : 17,
        'name' : 'Commission & fees',
        'values' : ['Commission & fees']  
    },
    {
        'id' : 18,
        'name' : 'Contribution to charity',
        'values' : ['Contribution to charity']  
    },
    {
        'id' : 19,
        'name' : 'Contract labor',
        'values' : ['Contract labor']  
    },
    {
        'id' : 20,
        'name' : 'Bad debt',
        'values' : ['Bad debt']  
    },
    {
        'id' : 21,
        'name' : 'Depreciation expense',
        'values' : ['Bad debt']  
    },
    {
        'id' : 22,
        'name' : 'Employee benefits',
        'values' : ['Employee retirement plan', 'Group term life insurance', 'Health insurance & accident plan', 'Officers life insurance', 'Workers compensation insurance']  
    },
    {
        'id' : 23,
        'name' : 'Entertainment',
        'values' : ['Entertainment']  
    },
    {
        'id' : 24,
        'name' : 'Interest paid',
        'values' : ['Business loan interest', 'Credit card interest', 'Mortgage interest']  
    },
    {
        'id' : 25,
        'name' : 'Penalties & Settlements',
        'values' : ['Penalties & Settlements']  
    }
]
function expenseModal(){
    return `
    
 <div class="modal fade" id="addExpenseModal" tabindex="-1">
  <div class="modal-dialog modal-fullscreen-md-down">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addExpenseModalLabel">Add Expense</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="addExpenseModalBody">
         
  <form action="" id="addExpenseForm" method="post" class="bg-light p-1">
    <div class="expense" style="max-width: 690px;">
      <div class="container-fluid m-0 p-0">
        <div class="row">
          <div class="col-8 col-sm-7 col-lg-8">
            <div class="form-comp">
              <label for="e_payee" class="form-label">Payee</label>
              <input type="text" class="myform" id="e_payee" name="e_payee">
            </div>
            <div class="form-comp">
              <label for="e_date" class="form-label">Date</label>
              <input type="date" class="myform" id="e_date" name="e_date">
            </div>          

            <div class="form-comp mb-2">
              <label for="e_type" class="form-label">Payment Type</label>
              <select type="text" class="myform" id="e_type" name="e_type">
                <option></option>
                <option value="7379">Cap One 7379</option>
                <option value="7379">BM 1363</option>
                <option value="9910">BRM 9910</option>
                <option value="9447">PNC 9447</option>
                <option value="CASH">CASH</option>
              </select>
            </div>

            <div class="form-comp d-none">
              <label for="e_img" class="mt-2"></label>
              <input type="file" class="myform border-0" id="e_img" name="e_img">
            </div>

          </div>

          <div class="col-4 col-sm-5 col-lg-4">
            <div class="form-comp text-center">
              <div class="img-container m-0 mt-2 p-0">
                <img id="expenseImgSrc" src="" class="img-fluid shadow mt-3 ">
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <table class="table p-0 p-0">
        <thead>
          <tr>
            <th scope="col" class="d-none">Id</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="catId" class="d-none"></td>
            <td>
              <div class="form-comp m-0">
                <label for="e_category" class="form">
                  <select type="text" class="myform border-0 text-start" id="e_category" name="e_category">
                  </select>
                </label>
              </div>
            </td>
            <td>
              <div class="form-comp">
                <label for="e_description" class="form">
                  <textarea type="text" class="myform border-0 text-start" id="e_description" name="e_description" rows="8"></textarea>
                </label>
              </div>
            </td>
            <td>
              <div class="form-comp">
                <label for="e_amount" class="form">
                  <input type="number" class="myform border-0 text-start" id="e_amount" name="e_amount">
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-sm btn-danger" onclick="document.getElementById('addExpenseForm').reset()" type="button">Clear</button>
        <button onclick="addExpenseRecord(event)" class="btn btn-primary btn-sm" type="button"  data-bs-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</div>   
    
    `;
}
function getCatInfo(val){
    let str = val.split('*');
    let obj = {
        'expenseType' : str[0],
        'category' : str[1]
    }
    return obj;
}
function addExpenseRecord(event) {
   console.log('event' + event)
   event.preventDefault()
   
    let form = document.querySelector('#addExpenseForm');
    const formData = new FormData(form);
    let formObject = {
        payee : formData.get('e_payee'),
        date : formData.get('e_date'),
        payment : formData.get('e_type'),
        type : '',
        img : formData.get('e_img'),
        category : formData.get('e_category'),
        description : formData.get('e_description'),
        amount : Number(formData.get('e_amount'))
    }
    console.log(formObject)
    if (formObject.category == 'Choose..') { return alert('Select expense type')}
    if (formObject.img.name == '') {
        formObject.img = null
    }
    let str = `Payee: ${formObject.payee}` + '<br>' +`Amount: $${formObject.amount}`
    $('#display').html(str)
    document.getElementById('addExpenseForm').reset();

    let expenseObj = getCatInfo(formData.get('e_category'))
        formObject.category = Number(expenseObj.category);
        formObject.type = expenseObj.expenseType;
    handleAddFormDb(formObject);
}

function handleAddFormDb(formData){
    let url = `${pre}/add-expense`;
    $.post(url, formData, function(data){  
        $("#display").html(data.message)
    })
}

function loadExpenseSelectMenu(){
    let select = document.getElementById('e_category');
    let html = `<option>Choose..</option>`;
    e_categories.forEach(cat => {
        cat.values.forEach(val => {
            html += `
            <option class="small" value="${val}*${cat.id}">${cat.name.slice(0,6)} &#11022 ${val}</option>
            `
        })
    })
    select.innerHTML = html;
}

// add expense modal and populate select menu when doc ready 
document.addEventListener("DOMContentLoaded", () => {
    let expEl = document.getElementById('expense');
    expEl.innerHTML = expenseModal();
    loadExpenseSelectMenu()
})

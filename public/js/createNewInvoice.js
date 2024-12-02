function createNewInvoice(){
    return `
    
          <div class="invoice-- container-xl py-2">

            <main class="job-card row g-1">

              <div class="job-header py-2  row">

                <div class="job-vendor col-7 ps-2">
                    <div class="container"  style="min-height: 115px;">
                      <h5 class="mb-0">Submitted to:</h5>
                      <p class="p-0 m-0" id="vName"></p>
                      <p class="p-0 m-0 small" id="vAddress"></p>
                      <p class="p-0 m-0 small" id="vCity"></p>
                      <p class="p-0 m-0 small">Phone: <span id="vPhone"></span></p>
                    </div>

                    <div class="job-btn-bar btn-group pt-0 d-flex justify-content-start no-print" style="width:100%;">
                      <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addItemModal" type="button">
                          <img src="public/assets/icons/add-black.png" alt="add" width="28" height="28" >
                      </button>
                      <button class="btn btn-light" onclick='clearItemList()' type="button">
                          <img src="public/assets/icons/delete-black.png" alt="add" width="28" height="28">
                      </button>
                      <button class="btn btn-light" onclick='window.print()' type="button">
                          <img src="public/assets/icons/print-black.png" alt="add" width="28" height="28">
                      </button>
                      <button class="btn btn-light" onclick='saveJob()' type="button">
                        <img src="public/assets/icons/save-black.png" alt="add" width="28" height="28">
                    </button>
                   </div>

                </div>


                <div class="job-logo col-5 text-center">
                  <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="BRM" width="72" height="57">
                  <h2>Invoice</h2>
                </div>

              </div>

              <div class="job-details col-md-7 col-lg-5 order-md-last">
                <h5 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="bm-text-primary">Job Items</span>
                  <span class="badge bm-bg-primary rounded-pill" id="totalProductLength">0</span>
                </h5>
                <ul class="list-group mb-3 list-unstyled bg-white " id="productListGroup">


                </ul>

                <li class="list-group-item bg-white p-2 d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$<span id="totalCost">0</span>.00</strong>
                </li>

              </div>

              <div class="job-address col-md-5 col-lg-7">
                <h5 id="jobAddressBtn" class="mb-3 address" onclick="showJobAddress()">
                  <img id="dropdownImg" src="public/assets/icons/menu-black.png" width="40" height="40">
                    Job address
                </h5>
                <h5>Invoice # <span id="invoiceNumber"></span></h5>

                <div class="job-address-formatted" id="jobAddressFormated">
                  <div class="container">
                    <h5 class="mb-0" id="fJname"></h5>
                    <h5 class="mb-0" id="fDate"></h5>
                    <p class="p-0 m-0 fs-6" id="fPo"></p>
                    <p class="p-0 m-0 fs-6" id="fAddress"></p>
                    <p class="p-0 m-0 fs-6" id="fCity"></p>
                  </div>
                </div>



                <div id="jobDropdown" class="job-address-dropdown">
                  <form class="job-form">
                    <div class="row g-1">

                      <div class="col-sm-6">
                        <label for="vendor" class="form-label">Vendor</label>
                        <select class="form-select" id="vendor" name="vendor" onchange="handleSubmitTo();">
                  
                        </select>
                      </div>

                      <div class="col-sm-6">
                        <label for="jDate" class="form-label">Job Date</label>
                        <input type="date" class="form-control" id="jDate" name="jDate" placeholder="" required="">
                      </div>

                      <div class="col-sm-6">
                        <label for="jName" class="form-label">Job Name</label>
                        <input type="text" class="form-control" id="jName" name="jName" placeholder="" required="">
                      </div>

                      <div class="col-sm-6">
                        <label for="jobPo" class="form-label">PO</label>
                        <input type="text" class="form-control" name="po" id="po" placeholder="" value="" required="">
                      </div>


                      <div class="col-12">
                        <label for="jAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="jAddress" name="jAddress" required="">
                      </div>


                      <div class="col-md-5">
                        <label for="jCity" class="form-label">City</label>
                        <input class="form-control" id="jCity" name="jCity" required="">
                      </div>

                      <div class="col-md-4">
                        <label for="state" class="form-label">State</label>
                        <select class="form-select" id="jState" name="jState" required="">
                          <option value="">Choose...</option>
                          <option>PA</option>
                          <option>WV</option>
                          <option>OH</option>
                          <option>FL</option>
                        </select>
                      </div>

                      <div class="col-md-3">
                        <label for="zip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="jZip" placeholder="" required="">
                      </div>
                    </div>

                  </form>
                </div>
              </div>


            </main>

            <!-- modal -->
            <div class="modal fade" id="addItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
              <div class="modal-dialog m-0 p-0  mx-auto  ">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addItemModalLabel">Add Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body m-0 p-0" id="addItemModalBody">
                  
                    
                    <table class="table m-0 p-0">
                      <thead>
                        <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Descripton</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td contenteditable="true">
                            <select onchange="populateProduct()" class="form-select" id="item" name="item" required="">

                            </select>
                          </td>
                          <td contenteditable="true" id="description"></td>
                          <td contenteditable="true" id="qty" onkeyup="handleQty()">1</td>
                          <td contenteditable="true" id="cost"></td>
                        </tr>

                      </tbody>
                    </table>


                  </div>
                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onclick="handleItemAdd()" class="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>


         

            <footer class="my-5 pt-5 text-body-secondary text-center text-small">
              <p class="mb-1">© 2014–2024 BRM Contractors Inc</p>
            </footer>
            
            <textarea hidden rows=10 cols=40 name="dbString" id="dbString" class="border-0 bg-transparent"></textarea>
            <small hidden>JSON to be stored in db</small>
            <textarea hidden  rows=10 cols=40 name="dbHtml" id="dbHtml" class="border-0 bg-transparent">[</textarea>

          </div>    
    
    `;
}

function handleCreateNewInvoice(){
    document.getElementById('root').innerHTML = createNewInvoice();
}

function nextStep(){
    let vendorSelect = document.getElementById('vendor');
    let html = '<option>Choose..</option>';
    vendor.forEach(v => {
        console.log(v.name)
        html += `<option value="${v.vendorId}">${v.name}</option>`
    })
    return vendorSelect.innerHTML += html;
}
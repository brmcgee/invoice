function home (){
    return `
    

      <div class="app" id="appIt">

          <div id="menu" class="toolbar menu no-print">

            <div class="filter-menu dropdown">

              <button class="btn btn-transparent dropdown-toggle mt-1 text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="public/assets/icons/filter-black.png" alt="add" width="25" height="29" > 
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('status', 'DESC')">Status</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('fJname', 'ASC')">Job Name</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('fDate', 'ASC')">Archive</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('invoiceId', 'DESC')">Recent</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('vendorId', 'ASC')">Vendor</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('fCity', 'ASC')">City</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchDatabaseBy('fPo', 'ASC')">PO</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchAllInvoices()">Date</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchCustomerList()">Customers</a></li>
                <li><a class="dropdown-item" href="#" onclick="fetchProductList()">Products</a></li>
                
              </ul>
            </div>


            <button class="btn btn-transparent" type="button" onclick="fetchAllInvoices()">
              <img src="public/assets/icons/assignment-black.png" alt="add" width="23" height="22" >
            </button>
            <button class="btn btn-transparent" type="button" 
                onclick="location.reload()">
              <img src="public/assets/icons/edit-black.png" alt="add" width="23" height="22" >
            </button>
            <button class="btn btn-transparent" type="button" 
                onclick="openFullscreen()">
              <img src="public/assets/icons/fullscreen-black.png" alt="add" width="22" height="22" > 
            </button>
            <button class="btn btn-transparent" type="button" 
                onclick="fetchDatabase()">
              <img src="public/assets/icons/database-black.png" alt="add" width="22" height="23" > 
            </button>



    
            
            
          </div>

          <div id="root" class="root" >
          

          <div class="invoice-- container-xl py-2">

            <main class="job-card row g-1">

              <div class="job-header py-2  row">

                  <div class="job-vendor col-7 ps-2">
                      <div class="container"  style="min-height: 115px;">
                        <h5 class="mb-0">Submitted to:</h5>
                        <p class="p-0 m-0" id="vName"></p>
                        <p class="p-0 m-0 small" id="vAddress"></p>
                        <p class="p-0 m-0 small" id="vCity"></p>
                        <p class="p-0 m-0 small" id="vEmail"></p>
                        <p class="p-0 m-0 small">Phone: <span id="vPhone"></span></p>
                      </div>

                      <div class="job-btn-bar btn-group pt-0 d-flex justify-content-start no-print" style="width:100%;">
                        
                        <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addNewCustomer" type="button">
                          <img src="public/assets/icons/person-add-black.png" alt="add" width="28" height="28" >
                        </button>                      
                        <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addItemModal" type="button">
                            <img src="public/assets/icons/add-black.png" alt="add" width="28" height="28" >
                        </button>
                        <button class="btn btn-light" onclick='clearItemList()' type="button">
                            <img src="public/assets/icons/delete-black.png" alt="add" width="28" height="28">
                        </button>
                        <button class="btn btn-light" onclick='saveJob()' type="button">
                          <img src="public/assets/icons/save-black.png" alt="add" width="28" height="28">
                      </button>
                    </div>

                  </div>


                  <div class="job-logo col-5 text-center">
                    <div id="imgLoading"></div>
                      <div id="logoContainer" class="d-flex justifiy-content-center">
                        <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="paid" width="72" height="57">
                      </div>
                    
                      <h2>Invoice</h2>
                  </div>
  
                </div>

             

 
                <div class="job-details col-md-7 col-lg-5 order-md-last px-0">
                  <h5 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="bm-text-black">
                      <img class="me-1" src="public/assets/icons/work-black.png" width="23" height="23">
                      Job Items</span>
                    <span class="badge bg-black rounded-pill" id="totalProductLength">0</span>
                  </h5>
                  <ul class="list-group mb-3 list-unstyled bg-white " id="productListGroup">


                  </ul>

                  <li class="list-group-item bg-white p-2 d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>$<span id="totalCost">0</span>.00</strong>
                  </li>

                </div>

                <div class="job-address col-md-5 col-lg-7 px-1">
                  <h5 id="jobAddressBtn" class="mb-3 address" onclick="showJobAddress()">
                    <img id="dropdownImg" src="public/assets/icons/menu-open-black.png" width="25" height="25">
                      Job Address
                  </h5>
                  <h5 class="d-none">Invoice # <span id="invoiceNumber"></span></h5>

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
                  
                  <div class="text-center mt-3" id="jumpBtn">
                    <a href="#root" class="btn btn-light" onclick="showJobAddress()">Hide Job Address</a>
                  </div>
                </div>
              </main>
          </div>
        


            <!-- modal add customer-->
            <div class="modal fade" id="addNewCustomer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
              <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content px-1" style="min-height: 70vh; line-height:14px;">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addNewCustomerLabel">Add Customer</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body m-0 p-0" id="addNewCustomerBody">
                  
                    
                    <form class="add-company">
                      <div class="row g-0 m-0 p-0">

                        <div class="col-12">
                          <label for="company" class="form-label">Company</label>
                          <input type="text" class="form-control" id="company" name="company">
                        </div>

                        <div class="col-12">
                          <label for="cPhone" class="form-label">Phone</label>
                          <input type="text" class="form-control" id="cPhone" name="cPhone">
                        </div>

                        <div class="col-12">
                          <label for="cAddress" class="form-label">Address</label>
                          <input type="text" class="form-control" id="cAddress" name="cAddress">
                        </div>

                        <div class="col-12">
                          <label for="cCity" class="form-label">City</label>
                          <input type="text" class="form-control" id="cCity" name="cCity">
                        </div>


                        <div class="col-12">
                          <label for="cState" class="form-label">State</label>
                          <select class="form-select" id="cState" name="cState" required="">
                            <option value="">Choose...</option>
                            <option>PA</option>
                            <option>WV</option>
                            <option>OH</option>
                            <option>FL</option>
                          </select>
                        </div>

                        <div class="col-12">
                          <label for="cZip" class="form-label">Zip</label>
                          <input type="text" class="form-control" id="cZip" name="cZip" required="">
                        </div>


                        <div class="col-12">
                          <label for="cEmail" class="form-label">Email</label>
                          <input class="form-control" id="cEmail" name="cEmail" required="">
                        </div>

                        <div class="col-12">
                          <label for="cAttn" class="form-label">Attn</label>
                          <input class="form-control" id="cAttn" name="cAttn" required="">
                        </div>

                      </div>

                    </form>

                  </div>
                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onclick="addNewCustomer()" data-bs-dismiss="modal" class="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
            


            <!-- modal add new product-->
            <div class="modal fade" id="addNewServiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
              <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content  px-1" style="min-height: 50vh;">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addNewServiceModalLabel">Add New Service</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body m-0 p-0" id="addNewServiceModalBody">
                  
                    <form class="add-company">
                      <div class="row g-0 m-0 p-0">

                        <div class="col-12">
                          <label for="pItem" class="form-label">Item</label>
                          <input type="text" class="form-control" id="pItem" name="pItem">
                        </div>

                        <div class="col-12">
                          <label for="pDescription" class="form-label">Description</label>
                          <input type="text" class="form-control" id="pDescription" name="pDescription">
                        </div>

                        <div class="col-12">
                          <label for="pCost" class="form-label">Cost</label>
                          <input type="text" class="form-control" id="pCost" name="pCost">
                        </div>

                        <div class="col-12">
                          <label for="pUnit" class="form-label">Unit</label>
                          <input type="text" class="form-control" id="pUnit" name="pUnit">
                        </div>


                      </div>

                    </form>


                  </div>
                  <div class="modal-footer">

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onclick="addProductToDb()" class="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>


            <!-- modal - add job item -->
            <div class="modal fade" id="addItemModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
              <div class="modal-dialog m-0 p-0 mt-2 mx-auto  ">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addItemModalLabel">Add Job Item</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body m-0 p-0" id="addItemModalBody">
                  
                    <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#addNewServiceModal" type="button">
                      <img src="public/assets/icons/add-black.png" alt="add" width="28" height="28" >
                        New service type to list
                    </button>

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

          
        </div>
      </div>
    



    
    `
}
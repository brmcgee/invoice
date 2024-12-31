function fetchCustomerList (){

    handleFetchCustomerList()
}

async function handleFetchCustomerList() {
    let url = `${pre}/customers`;
    let html = ``;
    try {
        let response = await fetch(url)
        root.innerHTML = loader('info', `Fetching customers...`);
        try {
            let data = await response.json();

            root.innerHTML = htmlFetchCustomerList(data);

           
    
        } catch (parseError) {
            root.innerHTML = loader('warning', parseError)
        }
    
    } catch (networkError) {
        root.innerHTML = loader('danger', networkError);
    }
}

function htmlFetchCustomerList (data){
    let html = `
        ${alertMessage("secondary", `Total customers: ${data.length} <br>                         
                        <button class="btn btn-light mt-1" data-bs-toggle="modal" data-bs-target="#addNewCustomer" type="button">
                          <img src="public/assets/icons/person-add-black.png" alt="add" width="28" height="28" >
                          Add Customer
                        </button>  `)}

        <table class="table table-striped table-secondary">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Company</th>
                <th scope="col">Phone</th>
                <th scope="col">Attn</th>
                </tr>
            </thead>
            <tbody>
    `;
    data.forEach(d => {
        
        html += `
                <tr>
                    <th scope="row" class="small">${d.vendorId}</th>
                    <td class="small">${d.name}</td>
                    <td class="small">${d.phone}</td>
                    <td class="small">${d.attn}</td>
                </tr>
    
        `;
    });

    html += `
    
            </tbody>
        </table>
    
    `
    html += htmlAddCustomerModal();

    return html;
}

function htmlAddCustomerModal () {
    return `
    
                <!-- modal add customer-->
            <div class="modal fade bg-dark" id="addNewCustomer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
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
            
    `
}
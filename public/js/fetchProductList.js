function fetchProductList (){

    handleFetchProductList()
}

async function handleFetchProductList() {
    let url = `${pre}/products`;
    let html = ``;
    try {
        let response = await fetch(url)
        root.innerHTML = loader('info', `Fetching customers...`);
        try {
            let data = await response.json();

            root.innerHTML = htmlFetchProductList(data);

           
    
        } catch (parseError) {
            root.innerHTML = loader('warning', parseError)
        }
    
    } catch (networkError) {
        root.innerHTML = loader('danger', networkError);
    }
}

function htmlFetchProductList (data){
    let html = `
        ${alertMessage("secondary", `Total products: ${data.length} <br>
            
                    <button class="btn btn-light mt-1" data-bs-toggle="modal" data-bs-target="#addNewServiceModal" type="button">
                      <img src="public/assets/icons/add-black.png" alt="add" width="28" height="28" >
                        Add product
                    </button>
            `)}


        <table class="table table-striped table-secondary">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Item</th>
                <th scope="col">Description</th>
                <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
    `;
    data.forEach(d => {
        
        html += `
                <tr>
                    <th scope="row" class="small">${d.prodId}</th>
                    <td class="small">${d.item}</td>
                    <td class="small">${d.description}</td>
                    <td class="small">${d.cost}</td>
                </tr>
    
        `;
    });

    html += `
    
            </tbody>
        </table>
    
    `

    html += modalAddProductList();

    return html;
}


function modalAddProductList(){
    return `
    
    
             <div class="modal fade bg-dark" id="addNewServiceModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
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
            
            
    `
}

function addProductToDb(){

  handleAddProductToDb()
}

async function  handleAddProductToDb (){
    
  let item = document.getElementById('pItem');
  let description = document.getElementById('pDescription');
  let cost = document.getElementById('pCost');
  let unit = document.getElementById('pUnit');

  let params = `item=${item.value}&&description=${description.value}&&cost=${cost.value}&&unit=${unit.value}`;
  
  let url = `${pre}/add-product`;

  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
          let response = this.response;
          if (response) {
              console.log('Added product')
          } else {
            console.log('error')
          }
      
      }
  }
  xml.open("POST", url, true);
  xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
  xml.send(params);
  item.value='';description.value='';cost.value='';unit.value='';
}
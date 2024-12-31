function saveJob(){

    handleSaveBlog();
}

async function handleSaveBlog() {
    let el = document.getElementById('dbHtml').value;
    let value = (el.slice(0, el.length-1)) + ']';
    document.getElementById('dbHtml').value = value;

    let url = `${pre}/add-invoice`;
    let fJname = document.getElementById('jName')
    let fAddress = document.getElementById('jAddress');
    let fCity = document.getElementById('jCity');
    let fState = document.getElementById('jState');
    let fZip = document.getElementById('jZip')
    let fPo = document.getElementById('po');
    let fDate = document.getElementById('jDate');
    let vendorId = document.getElementById('vendor');
    let cost = Number(document.getElementById('totalCost').innerHTML);
    let email = document.getElementById('vEmail').innerHTML;
    let door = document.getElementById('door').value;
    let color = document.getElementById('color').value;

    let params = `door=${door}&&color=${color}&&email=${email}&&cost=${cost}&&vendorId=${vendorId.value}&&fJname=${fJname.value}&&fAddress=${fAddress.value}&&fCity=${fCity.value}&&fState=${fState.value}&&fZip=${fZip.value}
            &&fPo=${fPo.value}&&fDate=${fDate.value}&&fVendor=${JSON.stringify(activeVendor)}&&fProducts=${JSON.stringify(productList)}`;

    if (fDate.value == '') { alert('Enter job date!'); return;}
    if (fJname.value == '') { alert('Enter job name!'); return;}
    if (vendorId.value == 'Choose..') { alert('Select Vendor!'); return;}
    if (fPo.value == '') { alert('Enter job PO Number!'); return;}

    root.innerHTML = loader('primary', 'Saving invoice now..')
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            let response = this.response;
            root.innerHTML = updateSavedBlog(response).html;
            document.getElementById('productListGroup').innerHTML = updateSavedBlog(response).products;
        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}

function updateSavedBlog(data) {
    let d = (JSON.parse(data))
    let html2 = '';
    let html = `
    
            <div class="invoice-- container-xl py-2">

            <main class="job-card row g-1">

              <div class="job-header py-2  row">

                <div class="job-vendor col-7 ps-2">
                    <div class="container"  style="min-height: 115px;">
                      <h5 class="mb-0">Submitted to:</h5>
                      <p class="p-0 m-0" id="vName">${d[0].customer[0].name}</p>
                      <p class="p-0 m-0 small" id="vAddress">${d[0].customer[0].address}</p>
                      <p class="p-0 m-0 small" id="vCity">${d[0].customer[0].city}, ${d[0].customer[0].state} ${d[0].customer[0].zip}</p>
                      <p class="p-0 m-0 small">Phone: <span id="vPhone"></span></p>
                    </div>

                    <div class="job-btn-bar btn-group no-print pt-0 d-flex justify-content-start" style="width:100%;">
                 
                      <button class="btn btn-light" onclick='window.print()' type="button">
                          <img src="public/assets/icons/print-black.png" alt="add" width="28" height="28">
                      </button>

                        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#invoiceModal">
                            <img class="" src="public/assets/icons/upload-black.png" alt="" width="28">
                        </button>
                        
                   </div>

                </div>


                <div class="job-logo col-5 text-center">
                <div id="imgLoading"></div>
                  <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="BRM" width="72" height="57">
                  <h2>Invoice</h2>
                </div>

              </div>



                    `;

    let prods = JSON.parse(d[0].fProducts);
    prods.forEach(p => {
        html2 += htmlProductItem(p);

    })
                    
                    
     html+= `
            <div class="job-details col-md-7 col-lg-6 order-md-last">
                <h5 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="bm-text-primary">Job Items</span>
                  <span class="badge bm-bg-primary rounded-pill" id="totalProductLength">${prods.length}</span>
                </h5>
                <ul class="list-group mb-3 list-unstyled bg-white " id="productListGroup">
                </ul>

                <li class="list-group-item bg-white p-2 d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$<span id="totalCost">${d[0].cost}</span>.00</strong>
                </li>

              </div>

              <div class="job-address col-md-5 col-lg-6">
                <h5 id="jobAddressBtn" class="mb-2 address">
                  <img id="dropdownImg" src="public/assets/icons/menu-black.png" width="40" height="40">
                    Job address
                </h5>
                <h4>Invoice # <span id="invoiceNumber">0000${d[0].invoiceId}</span></h4>
                <h4>Total Due: $${d[0].cost} </h4>

                <div class="job-address-formatted d-block" id="jobAddressFormated">
                  <div class="container">
                    <h4 class="mb-0 text-uppercase" id="fJname">${d[0].fJname}</h4>
                    <h4 class="p-0 m-0 pb-2" id="fPo">${d[0].fPo}</h4>
                    <h5 class="mb-0" id="fDate">${d[0].fDate.slice(0,10)}</h5>
                    
                    <p class="p-0 m-0 fs-6" id="fAddress">${d[0].fAddress}</p>
                    <p class="p-0 m-0 fs-6" id="fCity">${d[0].fCity}, ${d[0].fState} ${d[0].fZip}</p>
                    <img src="${d[0].fImg}" id="invoiceUploadImg" class="m-0 mt-3 img-thumbnail img-fluid" style="max-width:305px;">
                  </div>
                </div>

              </div>


            </main>

               <!-- add image modal  -->
            <div class="modal" id="invoiceModal">
              <div class="modal-dialog">
                 <div class="modal-content">


                    <div class="modal-header">
                    <h4 class="modal-title">Image Upload Id-${d[0].invoiceId}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>


                       <div class="modal-body" id="invoiceModalBody">

                          <form ref='uploadFormImg' 
                                id='invoiceForm' 
                                action='${pre}/upload-invoice' 
                                method='POST' 
                                encType="multipart/form-data">

                                   <input type="file" name="sampleFile" class="form-control" id="fileToUpload"/>

                                   <input type="text" hidden name="keyValue" value="img" class="fImg" id="keyValue"/>

                                   <input type="text" hidden name="invoiceId" value="${d[0].invoiceId}" class="form-control" id="invoiceId"/>

                                    <div class="modal-footer">
                                      
                                    <button onclick="handleAddImage(event, ${d[0].invoiceId})" 
                                            type='button' value='Upload!' data-bs-dismiss="modal" class="btn btn-primary ">Upload</button>
                                      
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div> 
                                    
                                    
                          </form>   

                       </div>


                 </div>
              </div>
              </div>

    
    `;
    let obj = {
        'html' : html,
        'products' : html2
    }
return obj;
}
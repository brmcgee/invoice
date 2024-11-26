function fetchInvoiceById (invoiceId){

    handleFetchInvoiceById(invoiceId)

}

async function handleFetchInvoiceById(invoiceId) {
    let url = `${pre}/invoices/${invoiceId}}`;
try {
    let response = await fetch(url)
    root.innerHTML = loader('info', `Fetching invoice ${invoiceId}..`);
    try {
        let data = await response.json();
        let html = `<div class="mx-auto container-md" style="width:auto;">`;
       
        html += htmlFetchInvoiceById(data);
root.innerHTML = html;


    //     data.forEach( d => {
    //         html += htmlFetchAllInvoice(d);
    //     });
    //     html += `</div>`
    //    root.innerHTML = html;
    // let result = updateSavedBlog(response)

    // root.innerHTML = result.html;
    // document.getElementById('productListGroup').innerHTML = updateSavedBlog(response).products;

       

    } catch (parseError) {
        root.innerHTML = loader('warning', parseError)
    }

} catch (networkError) {
    root.innerHTML = loader('danger', networkError);
}
}


function htmlFetchInvoiceById(d) {

    let html = '<div class="job-header py-2  row">'
    html += `
    
            <div class="invoice-- container-xl py-2">

            <main class="job-card row g-1">

              <div class="job-header py-2  row">

                <div class="job-vendor col-7 ps-2">
                    <div class="container"  style="min-height: 115px;">
                      <h5 class="mb-0">Submitted to:</h5>
                      <p class="p-0 m-0" id="vName">${vendor[d[0].vendorId].name}</p>
                      <p class="p-0 m-0 small" id="vAddress">${vendor[d[0].vendorId].address}</p>
                      <p class="p-0 m-0 small" id="vCity">${vendor[d[0].vendorId].city}, ${vendor[d[0].vendorId].state} ${vendor[d[0].vendorId].zip}</p>
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

let prod = JSON.parse(d[0].fProducts)
prod.forEach(p => {
    html += htmlProductItem(p);
});

             
     html+= `
            <div class="job-details col-md-12 order-md-last">
                <h5 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="bm-text-primary">Job Items</span>
                  <span class="badge bm-bg-primary rounded-pill" id="totalProductLength"></span>
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
    html += `</div>`

return html;


}
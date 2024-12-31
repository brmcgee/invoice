function fetchInvoiceById (invoiceId){

    handleFetchInvoiceById(invoiceId)

}

async function handleFetchInvoiceById(invoiceId) {
    let url = `${pre}/invoices/${invoiceId}`;
try {
    let response = await fetch(url)
    root.innerHTML = loader('info', `Fetching invoice ${invoiceId}..`);
    try {
        let data = await response.json();
        let html = `<div class="mx-auto container-md" style="width:auto;">`;
       
        html += htmlFetchInvoiceById(data);
        root.innerHTML = html;


    } catch (parseError) {
        root.innerHTML = loader('warning', parseError)
    }

} catch (networkError) {
    root.innerHTML = loader('danger', networkError);
}
}

let idata = [];
function htmlFetchInvoiceById(d) {
  
  let company = (JSON.parse(d[0].fVendor))
    idata = d[0];

    let html = '<div class="job-header py-2  row">'
    html += `
    
            <div class="invoice-- container-xl py-2">

            <main class="job-card row g-1">

              <div class="job-header py-2  row">

                <div class="job-vendor col-7 ps-2">
                    <div class="container"  style="min-height: 115px;">
                      <h5 class="mb-0">Submitted to:</h5>
                      <p class="p-0 m-0" id="vName">${company[0].name}</p>
                      <p class="p-0 m-0 small" id="vAddress">${company[0].address}</p>
                      <p class="p-0 m-0 small" id="vCity">${company[0].city}</p>
                      <p class="p-0 m-0 small" id="vEmail">${d[0].vEmail}</p>
                      <p class="p-0 m-0 small">Phone: <span id="vPhone">${company[0].phone}</span></p>
                    </div>

                    <div class="job-btn-bar btn-group no-print pt-2 d-flex justify-content-start" style="width:100%;">
                 
                        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#invoiceModal">
                            <img class="" src="public/assets/icons/add-photo-black.png" alt="" width="28">
                        </button> 

                        <button id="emailBtn" type="button" onclick="handleEmail()" class="btn btn-light" data-bs-toggle="modal">
                            <span class="badge bg-dark"></span>
                            <img class="" src="public/assets/icons/mail-black.png" alt="" width="28">
                            <span class="badge bm-bg-primary text-white mb-1" style="position: absolute; left:9px;top:-12px;z-index:12;">${(d[0].isEmailed != null) ? 'SENT' : '' }</span>
                        </button> 

                        <button type="button" onclick="generatePDF()" class="btn btn-light">
                            <img class="" src="public/assets/icons/pdf-black.png" alt="" width="28">
                        </button>

                        <button type="button" onclick="markInvoicePaid(${d[0].invoiceId})" class="btn btn-light">
                            <img class="" src="public/assets/icons/paid-black.png" alt="" width="28">
                            <span class="badge bg-success text-white mb-1" style="position: absolute; left:9px;top:-12px;z-index:12;">${(d[0].status == 'paid') ? 'PAID' : '' }</span>

                        </button>   
                        
                        <a href="${pre}/slack/invoices_brm/${d[0].fPo}"  target="_blank" type="button" class="btn btn-light">
                            <img class="" src="public/assets/icons/invoice-black.png" alt="" width="28" heigh"28">
                        </a>
                   </div>

                </div>

                <div class="job-logo col-5 text-center">
                <div id="imgLoading"></div>
                  <div id="logoContainer" class="d-flex justifiy-content-center">
                    <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="paid" width="72" height="57">
                  
                      <h4 class="text-danger">
                        ${(d[0].status == 'paid') ? '<span class="badge bg-success">PAID</span>' : '<span class="badge bg-danger">DUE</span>' }
                      </h4>
                  

                      </span>
                  </div>
                
                  <h2>Invoice</h2>
                </div>

              </div>

    
              <div class="row">
                <div class="job-details col-12 col-md-6 order-md-last">
                    `;

let prod = JSON.parse(d[0].fProducts)
prod.forEach(p => {
    html += htmlProductItem(p);
});

             
     html+= `
            
                <h5 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="">Job Items</span>
                  <span class="badge bg-dark rounded-pill" id="totalProductLength">${prod.length}</span>
                </h5>

                <ul class="list-group mb-3 list-unstyled bg-white " id="productListGroup">
                </ul>

                <li class="list-group-item bg-white p-2 d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$<span id="totalCost">${d[0].cost}</span>.00</strong>
                </li>

              </div>

              <div class="job-address col-12 col-md-6">
                <h5 id="jobAddressBtn" class="mb-2 address">
                  <img id="dropdownImg" src="public/assets/icons/menu-black.png" width="40" height="40">
                    Job address
                </h5>
                <h4>Invoice # <span id="invoiceNumber">${d[0].invoiceId}</span></h4>
                <h4>Total Due: $${d[0].cost} </h4>
               
               
                <p id="isPaid" class="d-none">${d[0].status}</p>

                <div class="job-address-formatted d-block" id="jobAddressFormated">
                  <div class="container">
                    <h5 class="mb-0 text-uppercase" id="fJname">Jobname: ${d[0].fJname}</h5>
                    <h5 class="p-0 m-0 pb-2" id="fPo">PO: ${d[0].fPo}</h5>
                    <h5 class="mb-0" id="fDate">${editDate(d[0].fDate)}</h5>
                    
                    <p class="p-0 m-0 fs-6" id="fAddress">${d[0].fAddress}</p>
                    <p class="p-0 m-0 fs-6" id="fCity">${d[0].fCity}, ${d[0].fState} ${d[0].fZip}</p>
                    
                    ${d[0].timePaid == 'false' ? `` : `<p class="text-success m-0 p-0 small"><strong>${d[0].timePaid}</strong></p>`}
                    ${d[0].isEmailed == null ? `` : `<p class="text-primary m-0 p-0 small"><strong>Emailed: ${d[0].isEmailed}</strong></p>`}


                    <img src="${getThumbnailUrl(d[0].fImg)}" id="invoiceUploadImg" class="m-0 mt-3 img-thumbnail img-fluid" style="max-width:305px;">
                    
                    
                  </div>
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

function markInvoicePaid (invoiceId) {
  let logoContainer = document.getElementById('logoContainer');
  let isPaid = document.getElementById('isPaid');
  let html = '';
  let isPaidHtml = '';


  if (isPaid.innerHTML == 'paid') {
      html = `                  
              <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="BRM" width="72" height="57">
              
              <span class="text-success small pe-2">
                <img class="d-block mx-auto mb-1" src="public/assets/icons/payment-due.png" alt="BRM" width="50" height="50">
                </span>`;
      isPaidHtml = 'unpaid';

  } 
  
  if (isPaid.innerHTML == 'unpaid') {
      html = `                  
          <img class="d-block mx-auto mb-1" src="public/assets/logos/brm-logo.jpg" alt="BRM" width="72" height="57">
          
          <span class="text-success small pe-2">
            <img class="d-block mx-auto mb-1" src="public/assets/icons/paid-green.png" alt="BRM" width="50" height="50">
            </span>`;
      isPaidHtml = 'paid';
      
  }
  
  isPaid.innerHTML = isPaidHtml;
  logoContainer.innerHTML = html; 

  let url = `${pre}/update-invoice-status`;
  let params = `status=${isPaidHtml}&&invoiceId=${invoiceId}`;

  // root.innerHTML = loader('primary', 'Updating status now..')
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
          let response = this.response;
          root.innerHTML = response;
          console.log(response)
      }
  }
  xml.open("POST", url, true);
  xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
  xml.send(params);
  
  
           

}
function handleEmail(){
 
  
  let vEmail = document.getElementById('vEmail');
  let invoiceId = document.getElementById('invoiceNumber');
  let vName = document.getElementById('vName');
  let vJname = document.getElementById('fJname');
  let fPo = document.getElementById('fPo');



  let params = `fPo=${fPo.innerHTML}&&vName=${vName.innerHTML}&&vJname=${vJname.innerHTML}&&vEmail=${vEmail.innerHTML}&&invoiceId=${invoiceId.innerHTML}`;

  let url = `${pre}/email-invoice`
  root.innerHTML = loader('primary', 'Emailing invoice now..')

  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      let response = this.response;
      root.innerHTML = alertMessage('primary', "Emailed to: "+ response);
      root.innerHTML += alertMessage('success', 'Email was successfully sent!') 
      
      // toastMessage("Emailed to: "+ response +`<br> Email successfully sent!`, 'menu')
      // fetchAllInvoices()

    }
  }
  xml.open("POST", url, true);
  xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
  xml.send(params);


}
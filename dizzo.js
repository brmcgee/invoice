const invoiceContainer = document.getElementById('invoiceContainer');
const invoiceTotalCountElem = document.getElementById('invoiceTotalCount');
const offCanvasFooterRoot = document.getElementById('offCanvasFooterRoot')
var invoiceData = [];
let recordCount = 0;


async function toggleSidebarContent(option, invoiceId){ 
  if (option == 'new'){
    document.getElementById('offCanvasRoot').innerHTML = newInvoiceHTML();
    document.getElementById('offCanvasFooterRoot').innerHTML = ''
    document.getElementById('sidebarLabel').innerHTML =  `<h4 class="offcanvas-title" >New Invoice</h4>`
    document.getElementById('offcanvasCloseBtn').innerHTML = 'DISCARD'
  } else {
    let html = '';
    let obj = (invoiceData.find(i => i.invoiceId == invoiceId))
    
    // temporary invoice template

    html += sidenavInvoiceCardHTML(obj);
    document.getElementById('offCanvasRoot').innerHTML = html;
    document.getElementById('offCanvasFooterRoot').innerHTML = actionBTN(obj)
    document.getElementById('sidebarLabel').innerHTML = 
                    `<h4 class="offcanvas-title" >View Invoice</h4>
                     <br>
                     <span class="float-end">${backBTN()}</span>
                    `;
    document.getElementById('offcanvasCloseBtn').innerHTML = 'DELETE'
  }

}


function sidenavInvoiceCardHTML(obj){
    let html = ''
    let filename = (`${obj.fImg.split('/')[obj.fImg.split('/').length-1]}`);
    html = sidecardTemplateForInvoice(obj);
    return html;
}
function sidecardTemplateForInvoice(data){
    function bmUser(){
        let obj = 
            {   'avatar' : "https://www.bm-app.org/users/bm_hat.png",
                'email' : "brianrmcgee@gmail.com",
                'fullname' : "Brian McGee",
                'id' : 2,
                'role' : "system",
                'token' : "987779tk99mirage724787996603338475hddsAlpha$221@**52Dffewq562204j3m6b8KK*7%bbbtgh",
                'username' : "Brian",
                'address' : "PO Box 66",
                'city' : "Hannastown PA 15635",
                'page' : "<h1>Welcome B Dizzo</h1>",
                'phone' : "724.787.3758"
    
        }
        return obj;
    }
    const pillBorder = 2;
    const paidPill = `
    
                <span class="badge text-dark float-end rounded-pill py-0 px-1" style="border: ${pillBorder}px solid #088c0a;">
                    <svg width="25px" height="25px" fill="#088c0a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#088c0a"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="checkmark-circle-2"> <rect width="24" height="24" opacity="0"></rect> <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z"></path> </g> </g> </g></svg>                    
                    Paid    
                </span>
    
    
    `
    const duePill = `
    
                <span class="badge text-dark float-end rounded-pill py-0 px-1" style="border: ${pillBorder}px solid #aa1818;">
                    <svg style="padding:2px; "width="25px" height="25px" fill="#aa1818" height="25" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 493.636 493.636" xml:space="preserve" stroke="#aa1818"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M421.428,72.476C374.868,25.84,312.86,0.104,246.724,0.044C110.792,0.044,0.112,110.624,0,246.548 c-0.068,65.912,25.544,127.944,72.1,174.584c46.564,46.644,108.492,72.46,174.4,72.46h0.58v-0.048 c134.956,0,246.428-110.608,246.556-246.532C493.7,181.12,468,119.124,421.428,72.476z M257.516,377.292 c-2.852,2.856-6.844,4.5-10.904,4.5c-4.052,0-8.044-1.66-10.932-4.516c-2.856-2.864-4.496-6.852-4.492-10.916 c0.004-4.072,1.876-8.044,4.732-10.884c2.884-2.86,7.218-4.511,11.047-4.542c3.992,0.038,7.811,1.689,10.677,4.562 c2.872,2.848,4.46,6.816,4.456,10.884C262.096,370.46,260.404,374.432,257.516,377.292z M262.112,304.692 c-0.008,8.508-6.928,15.404-15.448,15.404c-8.5-0.008-15.42-6.916-15.416-15.432L231.528,135 c0.004-8.484,3.975-15.387,15.488-15.414c4.093,0.021,7.895,1.613,10.78,4.522c2.912,2.916,4.476,6.788,4.472,10.912 L262.112,304.692z"></path> </g> </g> </g></svg>            
                    Due
                </span>
    
    `
    const savePill = `
    
                <span class=" text-dark badge float-end rounded-pill py-0 px-1" style="border:${pillBorder}px solid rgb(240, 88, 6);">
                    <svg width="25px" style="padding:2px; height="25px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#f06114" fill-rule="evenodd"> <path d="M17.85 3.15l-2.99-3A.507.507 0 0 0 14.5 0H1.4A1.417 1.417 0 0 0 0 1.43v15.14A1.417 1.417 0 0 0 1.4 18h15.2a1.417 1.417 0 0 0 1.4-1.43V3.5a.469.469 0 0 0-.15-.35zM16 16H2V5.9c.194.089.406.133.62.13h7.76A1.626 1.626 0 0 0 12 4.41V2h1.88L16 4.13V16z"></path> <circle cx="9" cy="11" r="3"></circle> </g> </g></svg>      
                    Saved     
                </span>
    
    `
    const emailPill = `
    
                <span class="text-dark badge float-end rounded-pill py-0 px-1" style="border: ${pillBorder}px solid rgb(24, 29, 170); ">
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11225)"> <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z" stroke="#1916d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 5L12 14L21 5" stroke="#1916d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11225"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>    
                    Email
                </span>
                
    `
    
    function getThumbnailUrl(url) {
        let img = url;
        let file = img.split("/")[img.split("/").length - 1];
               
        let thumb = `public/invoice-uploads/thumbnail/th_${file}`;
        return thumb;
    }
    function getDaysInMonth(month){
            let days = 0;
            if (month == 1) { days = 31 }
            if (month == 2) { days = 28 }
            if (month == 3) { days = 31 }
            if (month == 4) { days = 30 }
            if (month == 5) { days = 31 }
            if (month == 6) { days = 30 }
            if (month == 7) { days = 31 }
            if (month == 8) { days = 31 }
            if (month == 9) { days = 30 }
            if (month == 10) { days = 31 }
            if (month == 11) { days = 30 }
            if (month == 12) { days = 31 }
            return days
    }
    function getDueDate(timestamp){
    
        let date = new Date(timestamp)
        let day = date.getUTCDate();
        let year = date.getFullYear();
        let due = day;
        let da = date.getDay();
        let month = date.getMonth() + 1;
        let actualDay;
        let daysInMonth = getDaysInMonth(month)
    
        let dueDate = {
                'month' : '',
                'day' : '',
                'year' : '',
                'weekday' : 'Fri',
                'invoiceDate' : `${month}/${day}/${year}`,
                'dueDateString' : function() {
                    return `${this.weekday} ${this.month}/${this.day}/${this.year}`
                }
        }
    
        if (da == 7) { actualDay = 'Sun'; due = due + 5}
        if (da == 0) { actualDay = 'Mon'; due = due + 4 + 7}
        if (da == 1) { actualDay = 'Tue'; due = due + 3 + 7 }
        if (da == 2) { actualDay = 'Wen'; due = due + 2 + 7}
        if (da == 3) { actualDay = 'Thur'; due = due + 1 + 7}
        if (da == 4) { actualDay = 'Fri'; due = due + 7}
        if (da == 5) { actualDay = 'Sat'; due = due + 6}
        let dDue = due;
        if (due > daysInMonth) {
                if (month == 12) {
                    getDaysInMonth(1)
                    dueDate.month = 1
                    dueDate.year = year + 1
                } else {
                    getDaysInMonth(month + 1);
                    dueDate.month = month + 1
                    dueDate.year = year; 
                
                }
                due = (due - (getDaysInMonth(month)));
            } else if (dueDate.month == '') {
                dueDate.month = month;
                dueDate.year = year; 
        }
    
    
            
        dueDate.day = due;
        return(dueDate)
    }
    function editdate2(ts){

            const date = new Date(ts);
            let day = date.getDate(ts);let month = date.getMonth(ts) + 1;let year = date.getFullYear(ts);let da = date.getDay(ts) + 1;let actualDay = '';
            if (da == 0) { actualDay = 'Sun'}
            if (da == 1) { actualDay = 'Mon'}
            if (da == 2) { actualDay = 'Tue'}
            if (da == 3) { actualDay = 'Wen'}
            if (da == 4) { actualDay = 'Thur'}
            if (da == 5) { actualDay = 'Fri'}
            if (da == 6) { actualDay = 'Sat'}
            let formattedDate = `${month}/${day}/${year}  `

            return formattedDate;
    }
    
   
    
    const { door, color, cost, fJname, fAddress, fCity, fState, fZip, fPo, fDate, fVendor, fProducts, timePaid, status, isEmailed, th_fImg, vEmail, invoiceId, fImg } = data;
   
    const vendor = JSON.parse(fVendor)[0];
    const products = JSON.parse(fProducts);
    const invoiceDate = editdate2(fDate);
    const imgMaxHeight = '115'
    const invoiceWidth = '660px';
    const invoiceHeight = '';
    const logoWidth = '60px';
    const dueDate = getDueDate(fDate).dueDateString();


    let htmlTemplate = ``;


    // head tag
    // let htmlTemplate = headTag(vendor.name);
    
    //styles
    htmlTemplate += `
        <style>
        .content{
        color:#333;
        font-size:13px !important;
        }
        .modal-backdrop {
            z-index: -1;
            }
        
        #myImg {
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }
      
        </style>
    `
    let file = fImg.split("/")[fImg.split("/").length - 1];
    //top table
    htmlTemplate += `
    
<div id="activeInvoice${invoiceId}" class="mx-auto pt-1 " style="max-width:${invoiceWidth}; min-height:70vh;">
<div class="content ">

   
    <div class="container-fluid  " >

                     

        <div class="row ">
            <div class="col-12">
                <div class="card border-0 rounded-2 my-1 bg-lighter" style="min-height:${invoiceHeight}; max-width:${invoiceWidth};" >
                    <div class="card-body">

                        

                        <div class="clearfix">
                            <div class="float-start mb-3">
                                <img src="${bmUser().avatar}" alt="dark logo" style="width:${logoWidth};">
                                <span class="fw-bold border-bottom border-dark-subtle text-secondary"> 
                                <small>${bmUser().fullname} &middot; ${bmUser().email}</small>  </span>
                            </div>
                            <div class="float-end">
                                <span id="imgLoading"></span>
                                <h4 class="m-0 d-print-none">
                                Invoice
                                </h4>
                            </div>
                        </div>

                        

                        <div class="row">

                            <div class="col-sm-6">
                                <div class="float-end mt-3">
                                    <p><b>Hello, ${vendor.name}</b></p>
                                    <p class="text-muted fs-13">Please find below details for the recent work completed for ${fJname}. 
                                        Please submit a payment by <strong class="fw-bold">${dueDate}</strong>, and do not hesitate to contact me with any questions.
                                    </p>
                                </div>

                            </div>
                            
                            <div class="col-sm-4 offset-sm-2">
                                <div class="mt-3 float-sm-end">
                                    <p class="fs-13"><strong>Invoice Date: </strong> &nbsp;&nbsp;&nbsp; <span class="float-end">${invoiceDate}</span></p>
                                    <p class="fs-13"><strong>Invoice Status: </strong> ${timePaid == 'false' ? duePill : paidPill} </p>
                                    <p class="fs-13"><strong>Invoice ID: </strong> <span class="float-end">${invoiceId}</span></p>
                                </div>
                            </div>
                        </div>
                       
                        

                        <div class="row mt-4">
                            <div class="col-4">
                                <h6 class="fw-bold">Billing Address</h6>
                                <address>
                                    ${vendor.name}<br>
                                    <small>${vendor.address}</small><br>
                                    ${vendor.city}<br>
                                    <small>${vEmail}</small>
                                </address>
                            </div> 

                            <div class="col-4">
                                <h6 class="fw-bold">Job Address</h6>
                                <address>
                                    ${fJname}<br>
                                    ${fAddress}<br>
                                    ${fCity}, ${fState} ${fZip}<br>
                                    PO ${fPo}
                                </address>
                            </div> 

                            <div class="col-4">
                                <div class="text-sm-end">
                                    <img id="invoiceUploadImg" name="${fImg}" src="${'https://www.bm-app.org/invoice-uploads/' + file}" alt="${fJname}-${door + ' ' +color} door photo." class="img-fluid me-2"  style="max-height: ${imgMaxHeight}px;"/>
                                </div>
                            </div> 
                        </div>    
                             

                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-sm table-centered table-borderless  mb-0 mt-3" style="cursor:inherit;">
                                        <thead class="border-top border-bottom bg-light-subtle border-dark-subtle">
                                        <tr><th>#</th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Unit Cost</th>
                                            <th class="text-end">Total</th>
                                        </tr></thead>
                                        <tbody>

                        `
                        
                        
    // table rows per products
    let subtotal = 0;
    let balanceDue = 0;
    let count = 1;
    products.forEach(product => {
                
                    let qty = Number(product.qty)
                    let cost = Number(product.cost)
                    let each = cost / qty;
                    
                    subtotal = subtotal + cost;
                    
                    htmlTemplate += `
                                <tr>
                                    <td>${count ++}</td>
                                    <td>
                                            <b>${product.item}</b> <br/>
                                            ${product.description}
                                            
                                    </td>
                                    <td>${qty.toFixed(1)}</td>
                                    <td>${each.toFixed(2)}</td>
                                    <td class="text-end">${cost.toFixed(2)}</td>
                                </tr>
                    
                    `
    });
    (timePaid == 'false' ? balanceDue = cost : balanceDue = 0)

    // end table
    htmlTemplate += `
                                    
                                        </tbody>
                                    </table>
                                </div> 
                            </div> 
                        </div>
                      

                        <div class="row mt-3">
                            <div class="col-sm-6">
                                <div class="clearfix pt-5">
                                    

                                   

                                    ${timePaid == 'false'
                                        ? ` 
                                            <h6 class="fw-bold">Notes:</h6>
                                            <small>
                                                A balance of ${cost} is now due! <br>
                                                Invoice ${invoiceId} due on ${getDueDate(fDate).dueDateString()}
                                                <br>
                                            </small>

                                            <br>
                                            
                                            ${isEmailed != null 
                                                ? ` <small class="text-primary">Sent email on ${isEmailed.slice(0,25)} </small>`
                                                : ` <small style="color:purple;">Saved ${editDate(fDate)} </small>`}
                                            
                                            `
                                        : `
                                        <h6 class="fw-bold">Notes:</h6>
                                            <small>
                                                Balance of ${cost} has been paid in full. <br>
                                                Thank you ${vendor.name} for your payment. <br>
                                            </small>
                                            <br>

                                            ${isEmailed != null 
                                                ? ` <small class="text-primary">Sent email on ${isEmailed.slice(0,25)} </small>`
                                                : ` <small>Saved ${editDate(fDate)} </small>`}

                                            <br>
                                            
                                            <small>
                                             <span class="text-success">${timePaid}</span>
                                            </small>
                                        <br>

                                        
                                        
                                        `
                                    
                                    }


                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="float-end mt-3 mt-sm-0">
                                    <p><b>Total:</b> <span class="float-end">$${subtotal}</span></p>
                                    <h3>$${balanceDue} USD</h3>
                                </div>
                                <div class="clearfix"></div>
                            </div> 
                        </div>
                       
                        <div class="d-print-none mt-4">
                            <div class="text-end">

                            <a href="javascript:void(0)"  onclick="" type="button" class="btn btn-outline-dark" data-bs-dismiss="offcanvas">
                                <i class="ri-printer-line"></i><img class="" src="public/assets/icons/backspace-black.png" alt="" width="25" heigh"25">
                                Back
                            </a>
                                <a href="javascript:window.print()" class="btn btn-dark"><i class="ri-printer-line"></i> 
                                <svg width="25"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V11C20.6569 11 22 12.3431 22 14V18C22 19.6569 20.6569 21 19 21H5C3.34314 21 2 19.6569 2 18V14C2 12.3431 3.34315 11 5 11V5ZM5 13C4.44772 13 4 13.4477 4 14V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V14C20 13.4477 19.5523 13 19 13V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V13ZM7 6V12V14H17V12V6H7ZM9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9C15 9.55228 14.5523 10 14 10H10C9.44772 10 9 9.55228 9 9ZM9 12C9 11.4477 9.44772 11 10 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H10C9.44772 13 9 12.5523 9 12Z" fill="#ffffff"></path> </g></svg>
                                Print</a>


         
                            </div>



                        </div>   
                       

                    </div> 
                </div> 
            </div>
        </div>
       
        
    </div> 

</div> 
</div>

    
    `

           
    return htmlTemplate;
}





function actionBTN(invoice){
    return `
          <button class="invoice-action-btn my-2 me-1" onclick="alert('Handle all actions for ${invoice.fJname}')">
          <svg fill="#fff" width="25px" height="25px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.967-3.47a.792.792 0 0 0-.792-.792H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.791zm0 3.487a.792.792 0 0 0-.792-.791H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.792zm0 3.487a.792.792 0 0 0-.792-.791H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.792z"></path></g></svg>
        </button>`
  }
function backBTN(invoice){
    return `
          <button class="go-back-btn" data-bs-dismiss="offcanvas">
            <svg fill="#7b5cfa" width="27px" height="27px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 299.021 299.021" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M292.866,254.432c-2.288,0-4.443-1.285-5.5-3.399c-0.354-0.684-28.541-52.949-146.169-54.727v51.977 c0,2.342-1.333,4.48-3.432,5.513c-2.096,1.033-4.594,0.793-6.461-0.63L2.417,154.392C0.898,153.227,0,151.425,0,149.516 c0-1.919,0.898-3.72,2.417-4.888l128.893-98.77c1.87-1.426,4.365-1.667,6.461-0.639c2.099,1.026,3.432,3.173,3.432,5.509v54.776 c3.111-0.198,7.164-0.37,11.947-0.37c43.861,0,145.871,13.952,145.871,143.136c0,2.858-1.964,5.344-4.75,5.993 C293.802,254.384,293.34,254.432,292.866,254.432z"></path> </g> </g> </g></svg>
            <span class="ps-3"> Go back</span>
          </button>`
  }
function invoiceCardTemplate(obj){

  let html = `
    <div id="inv${obj.invoiceId}" class="invoice box" data-bs-toggle="offcanvas" data-bs-target="#sidebar"
            onclick="toggleSidebarContent('inv', ${obj.invoiceId})"
        >
      <div class="invoice-info">
        <div class="invoice-id">#<span id="invoiceId">RBH07${obj.invoiceId}</span></div>
        <div class="invoice-due">${obj.fDate}</div>
        <div class="invoice-total">$ <span>${obj.cost}</span></div>
        
      </div>

      <div class="invoice-detail">
        <div class="invoice-project">${JSON.parse(obj.fVendor)[0].name.slice(0,14)}</div>
        <div class="invoice-project "> ${obj.fJname}</div>
        <div id="badge${obj.invoiceId}"class="invoice-status badge-`

        if (obj.isEmailed == null && obj.timePaid == 'false'){
          html += 'save'
        } else if(obj.timePaid != 'false' && obj.isEmailed != null){
            html += 'paid'
        } else if (obj.timePaid == 'false' && obj.isEmailed != null){
            html += 'email'
        } else {
            html += 'due'
        }
              
  html +=  `">
        </div>
       </div>
      </div>   
  `
  return html;
}




function renderInvoices(invoices){
    
    invoiceData = [];
    let html = ``;
    for (let x=0; x<invoices.length; x++){
        html += invoiceCardTemplate(invoices[x])
        invoiceData.push(invoices[x])
    }
  
    invoiceContainer.innerHTML = html
    invoiceTotalCountElem.innerHTML = invoices.length
}
const temp_invoices = [
    {"type":"header","version":"5.2.1deb3","comment":"Export to JSON plugin for PHPMyAdmin"},
    {"type":"database","name":"invoice_app"},
    {"type":"table","name":"invoices","database":"invoice_app","data":
    [
    {"invoiceId":"380","userId":"2","fJname":"Yogi Beara","fAddress":"1997 Gulf TO Bay Blvd","fCity":"Boston","fState":"PA","fZip":"19963    ","fPo":"XYZ9963","fDate":"2025-01-01","fVendor":"[{\"id\":\"28\",\"name\":\"Lusha Vegas\",\"address\":\"356 Muscle St\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"724-366-4777\"}]","fProducts":"[{\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800}]","fImg":"https:\/\/www.bm-app.org\/invoice-uploads\/20240811_134224.jpg","vendorId":"28","cost":"800.00","status":"paid","vEmail":"brianrmcgee@gmail.com","isHide":"true","door":"rent","color":"white","isEmailed":"Mon Feb 24 2025 09:41","timePaid":"#51 INV-381- Pd Check 1\/1 bm 1\/1\/2025"},
    {"invoiceId":"381","userId":"2","fJname":"Rent","fAddress":"356 Musick St","fCity":"Hannastown","fState":"PA","fZip":"15635    ","fPo":"R356-jan","fDate":"2025-01-01","fVendor":"[{\"id\":\"28\",\"name\":\"Ralph Sarpolis\",\"address\":\"356 Musick St\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"724-419-4777\"}]","fProducts":"[{\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800}]","fImg":"https:\/\/www.bm-app.org\/invoice-uploads\/20240811_134224.jpg","vendorId":"28","cost":"800.00","status":"paid","vEmail":"brianrmcgee@gmail.com","isHide":"true","door":"rent","color":"white","isEmailed":"Mon Feb 24 2025 09:41","timePaid":"#51 INV-381- Pd Check 1\/1 bm 1\/1\/2025"},
    {"invoiceId":"382","userId":"2","fJname":"Hanns Stubert","fAddress":"814 Brookfield Dr","fCity":"Seven Fields","fState":"PA","fZip":"16046    ","fPo":"C14861","fDate":"2025-01-03","fVendor":"[{\"id\":\"21\",\"name\":\"Mike Johnson\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"door install only\",\"qty\":1,\"cost\":340,\"total\":340},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":1,\"cost\":80,\"total\":80}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250103_140312.jpg","vendorId":"21","cost":"420.00","status":"unpaid","vEmail":"slackorheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"almond","isEmailed":"Sun Feb 23 2025 19:39","timePaid":"false"},
    {"invoiceId":"383","userId":"2","fJname":"Rick Hendrickson","fAddress":"1150 Conway Wollrose Rd","fCity":"Freedom","fState":"PA","fZip":"15042\r\n   ","fPo":"C14883","fDate":"2025-01-14","fVendor":"[{\"id\":21,\"name\":\"Amarr Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16x7\",\"description\":\"door install only\",\"qty\":\".5\",\"cost\":\"170\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\"1\",\"cost\":\"80\"},{\"prodId\":2,\"item\":\"Single 9x7 door\",\"description\":\"door install only\",\"qty\":\".5\",\"cost\":\"105\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250114_133924.jpg","vendorId":"21","cost":"355.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"almond","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"#53 INV-385-384-383 Slack-Pd check 13647 1\/23\/2025"},
    {"invoiceId":"384","userId":"2","fJname":"Suwalli Wadhawan","fAddress":"142 Phillips Pl","fCity":"Squirrel Hill ","fState":"PA","fZip":"15217\n    ","fPo":"C14863","fDate":"2025-01-16","fVendor":"[{\"id\":21,\"name\":\"Vegas Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":\"3\",\"item\":\"Double 16ftx7ft Insulated\",\"description\":\"door install only\",\"qty\":\"1\",\"cost\":\"310\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250116_124728.jpg","vendorId":"21","cost":"310.00","status":"paid","vEmail":"slackoverheaddoor@comcast.net","isHide":"false","door":"lincoln","color":"almond","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"#53 INV-385-384-383 Slack-Pd check 13647 1\/23\/2025"},
    {"invoiceId":"385","userId":"2","fJname":"John Guest","fAddress":"918 California Ave","fCity":"Avalon ","fState":"PA","fZip":"15202\n    ","fPo":"C14870","fDate":"2025-01-17","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\",\"email\":\"slackoverheaddoors@comcast.net\"}]","fProducts":"[{\"prodId\":\"2\",\"item\":\"Single 8x6.5\",\"description\":\"door install only - rear drops\",\"qty\":\"1\",\"cost\":\"210\"},{\"prodId\":\"0\",\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\"1\",\"cost\":\"80\"},{\"prodId\":\"5\",\"item\":\"Wood jamb - 1x\/2x\",\"description\":\"wood work - 16-2x6, 7-1x4\",\"qty\":\"23\",\"cost\":\"46\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250117_132523.jpg","vendorId":"21","cost":"336.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"brown ","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"false"},
    {"invoiceId":"386","userId":"2","fJname":"Missy Potts","fAddress":"715 Old Mill Rd","fCity":"Fox Chapel","fState":"PA","fZip":"15238\n    ","fPo":"C14878","fDate":"2025-01-24","fVendor":"[{\"id\":21,\"name\":\"American Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\",\"email\":\"slackoverhddoors@comcast.net\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Single 8x6.5 \",\"description\":\"door install only - recessed at drywall\",\"qty\":\"1\",\"cost\":\"290\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only - recessed\",\"qty\":\"1\",\"cost\":\"100\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250123_135213.jpg","vendorId":"21","cost":"390.00","status":"paid","vEmail":"slaoverheaddoors@comcast.net","isHide":"false","door":"recessed","color":"black","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"#54 INV-386- Slack-Pd check 13655 1\/29\/2025"},
    {"invoiceId":"387","userId":"2","fJname":"Suma Nowading","fAddress":"203 Upper Heckman","fCity":"North Versaillles","fState":"PA","fZip":"15137\n    ","fPo":"S14854","fDate":"2025-01-27","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":\"1\",\"item\":\"Double door 18x9 Pan\",\"description\":\"18x9 door install only - 6 struts\",\"qty\":\"1\",\"cost\":\"300\"},{\"prodId\":\"0\",\"item\":\"Opener residential\",\"description\":\"res opener install only - 10ft rail\",\"qty\":\"1\",\"cost\":\"0\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250127_131935.jpg","vendorId":"21","cost":"300.00","status":"paid","vEmail":"slackovheaoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"false"},
    {"invoiceId":"388","userId":"2","fJname":"Michale Schnurer","fAddress":"2024 Broad Hill Farms Rd","fCity":"Moon Township","fState":"PA","fZip":"15108\n    ","fPo":"C14875","fDate":"2025-01-28","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\",\"email\":\"slackoverheaddoors@comcast.net\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"16x7 door install only\",\"qty\":\"1\",\"cost\":\"340\"},{\"prodId\":2,\"item\":\"Single 8\/9ft  door\",\"description\":\"8x7 door install only\",\"qty\":\"1\",\"cost\":\"210\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250128_150105.jpg","vendorId":"21","cost":"550.00","status":"paid","vEmail":"slkoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"wicker tan","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"#57 INV-387-388-389-390- Slack-Pd check 13665 2\/7\/2025"},
    {"invoiceId":"389","userId":"2","fJname":"George","fAddress":"6505 Brighton Rd","fCity":"Ben Avon ","fState":"PA","fZip":"15202\n    ","fPo":"C14852","fDate":"2025-01-29","fVendor":"[{\"id\":21,\"name\":\"Smith Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"16x7 door install only\",\"qty\":\"1\",\"cost\":\"300\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\"1\",\"cost\":\"0\"},{\"prodId\":5,\"item\":\"Wood jamb - 1x\/2x\",\"description\":\"wood work install only\",\"qty\":\"112\",\"cost\":\"0\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250129_130024.jpg","vendorId":"21","cost":"300.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Sun Feb 23 2025 15:06","timePaid":"#57 INV-387-388-389-390- Slack-Pd check 13665 2\/7\/2025"},
    {"invoiceId":"390","userId":"2","fJname":"Potts","fAddress":"715 Old Mill Rd","fCity":"Fox Chapel","fState":"PA","fZip":"15238\n    ","fPo":"C14878-2","fDate":"2025-01-30","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\",\"email\":\"slackoverheaddoors@comcast.net\"}]","fProducts":"[{\"prodId\":2,\"item\":\"Single 8\/9ft  door\",\"description\":\"8x7 door install only - rear spring mounts\/drop at concrete\",\"qty\":\"1\",\"cost\":\"225\"},{\"prodId\":6,\"item\":\"Lockbar\/Snaplatch\",\"description\":\"install only\",\"qty\":\"1\",\"cost\":\"15\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250130_125450.jpg","vendorId":"21","cost":"240.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"recessed","color":"black","isEmailed":"Fri Feb 21 2025 21:09","timePaid":"false"},
    {"invoiceId":"391","userId":"2","fJname":"Kyriacopoulos","fAddress":"2583 Corteland Dr","fCity":"Upper St Clair","fState":"PA","fZip":"15241    ","fPo":"C14872","fDate":"2025-02-11","fVendor":"[{\"id\":\"21\",\"name\":\"Smith Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Single door 10ft \",\"description\":\"10x7 New construction insulated door install only\",\"qty\":1,\"cost\":210,\"total\":210},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"Belt res opener install only\",\"qty\":1,\"cost\":80,\"total\":80}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250211_134235.jpg","vendorId":"21","cost":"290.00","status":"paid","vEmail":"slackoveraddoors@comcast.net","isHide":"false","door":"lincoln","color":"sandtone","isEmailed":"Fri Feb 21 2025 21:08","timePaid":"#58 INV-391-392-393- Slack-Pd check 13679 2\/18\/2025"},
    {"invoiceId":"392","userId":"2","fJname":"Xin Bingxing","fAddress":"1430 Mystic Valley Dr","fCity":"Sewickley","fState":"PA","fZip":"15143\n    ","fPo":"C13444","fDate":"2025-02-12","fVendor":"[{\"id\":21,\"name\":\"Door Discounter\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16ft Insulated\",\"description\":\"16x8 insulated door install only\",\"qty\":\".5\",\"cost\":\"200\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"Belt res opener install only\",\"qty\":\".5\",\"cost\":\"40\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250212_124611.jpg","vendorId":"21","cost":"240.00","status":"paid","vEmail":"slaoverheaoors@comcast.net","isHide":"false","door":"hillcrest","color":"almond","isEmailed":"Fri Feb 21 2025 21:08","timePaid":"#58 INV-391-392-393- Slack-Pd check 13679 2\/18\/2025"},
    {"invoiceId":"393","userId":"2","fJname":"Rich Gamez","fAddress":"530 Mount Royal Blvd","fCity":"Shaler Twp","fState":"PA","fZip":"15223\n    ","fPo":"C15060","fDate":"2025-02-14","fVendor":"[{\"id\":21,\"name\":\"Door Install Services\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 15x6.75 \",\"description\":\"15x6.75 New construction door install only\",\"qty\":\"1\",\"cost\":\"315\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\"1\",\"cost\":\"80\"}]","fImg":"https:\/\/web.boxcar.site\/invoice-uploads\/20250214_124338.jpg","vendorId":"21","cost":"395.00","status":"paid","vEmail":"slaoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"sandtone","isEmailed":"Mon Feb 24 2025 07:57","timePaid":"false"},
    {"invoiceId":"394","userId":"2","fJname":"Dana Oberleitner","fAddress":"1028 Old Noblestown Rd","fCity":"Oakdale ","fState":"PA","fZip":"15071\n    ","fPo":"C15072","fDate":"2025-02-17","fVendor":"[{\"id\":21,\"name\":\"Frank Micahels\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16x7 Insulated\",\"description\":\"16x7 door install only\",\"qty\":\".5\",\"cost\":\"200\"},{\"prodId\":15,\"item\":\"Single Insulated 9x7\",\"description\":\"9x7- install- insulated\",\"qty\":\".5\",\"cost\":\"115\"}]","fImg":"https:\/\/www.brmnow.com\/invoice-uploads\/20250217_143209.jpg","vendorId":"21","cost":"315.00","status":"paid","vEmail":"slackoveeaddoors@comcast.net","isHide":"false","door":"lincoln","color":"sandtone","isEmailed":"Tue Feb 18 2025 08:27","timePaid":"#59 INV-394-395- Slack-Check 13694 bm 2\/27\/2025"},
    {"invoiceId":"395","userId":"2","fJname":"Lisa Lucas","fAddress":"5123 Harvard Dr","fCity":"Aliquippa","fState":"PA","fZip":"15001\n    ","fPo":"C15059","fDate":"2025-02-18","fVendor":"[{\"id\":21,\"name\":\"Doors America\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":2,\"item\":\"Single door 8x6.5\",\"description\":\"8x6.5 door install only\",\"qty\":\"1\",\"cost\":\"210\"},{\"prodId\":5,\"item\":\"Wood jamb - 1x\/2x\",\"description\":\"wood work install only 2x4 1x4 x8\",\"qty\":\"16\",\"cost\":\"32\"}]","fImg":"https:\/\/www.brmnow.com\/invoice-uploads\/20250218_130251.jpg","vendorId":"21","cost":"242.00","status":"paid","vEmail":"slackeraddoors@comcast.net","isHide":"false","door":"lincoln","color":"sandtone","isEmailed":"Mon Feb 24 2025 12:11","timePaid":"#59 INV-394-395- Slack-Check 13694 bm 2\/27\/2025"},
    {"invoiceId":"396","userId":"2","fJname":"George Young","fAddress":"404 Chapel Way","fCity":"Cranberry Twp","fState":"PA","fZip":"16066\n    ","fPo":"C14907","fDate":"2025-02-25","fVendor":"[{\"id\":21,\"name\":\"Big Top Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"16x7 door install only\",\"qty\":\"1\",\"cost\":\"340\"}]","fImg":"https:\/\/www.brmnow.com\/invoice-uploads\/20250225_125235.jpg","vendorId":"21","cost":"340.00","status":"paid","vEmail":"slackoverheaddoor@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Mon Mar 03 2025 11:45:15 GMT+0000 (Coordinated Universal Time)","timePaid":"#60 INV-396-397- Slack-Pd check 13703 3\/5\/2025"},
    {"invoiceId":"397","userId":"2","fJname":"Jim Seech","fAddress":"240 Gross St","fCity":"Bloomfield ","fState":"PA","fZip":"15224\n    ","fPo":"C14903","fDate":"2025-02-26","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":2,\"item\":\"Single door\",\"description\":\"8x7 @ 3 door install assist\",\"qty\":\"1\",\"cost\":\"300\"}]","fImg":"https:\/\/www.brmnow.com\/invoice-uploads\/20250226_132310.jpg","vendorId":"21","cost":"300.00","status":"paid","vEmail":"slackoverheaddoor@comcast.net","isHide":"false","door":"lincoln","color":"brown","isEmailed":"Mon Mar 03 2025 01:21:47 GMT+0000 (Coordinated Universal Time)","timePaid":"#60 INV-396-397- Slack-Pd check 13703 3\/5\/2025"},
    {"invoiceId":"398","userId":"2","fJname":"Albert Slack","fAddress":"1354 Barry Dr","fCity":"Irwin","fState":"PA","fZip":"15642\n    ","fPo":"AS1354","fDate":"2025-03-03","fVendor":"[{\"id\":21,\"name\":\"Door Discounter\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"Hourly labor charge\",\"qty\":\"6\",\"cost\":\"270\"}]","fImg":"\/invoice-uploads\/door.png","vendorId":"21","cost":"270.00","status":"paid","vEmail":"slackoeheaddoors@comcast.net","isHide":"false","door":"","color":"","isEmailed":"Mon Mar 10 2025 11:07:48 GMT+0000 (Coordinated Universal Time)","timePaid":"#61 INV-398-399-400- Slack-Pd check  4588 3\/14\/2025"},
    {"invoiceId":"399","userId":"2","fJname":"Joel Sager","fAddress":"1006 Chelton Avenue","fCity":"Brookline","fState":"PA","fZip":"15226\n    ","fPo":"C14018","fDate":"2025-03-05","fVendor":"[{\"id\":21,\"name\":\"Tri City Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"2 8x7.5, jambs, opener, Hourly labor charge\",\"qty\":\"12.5\",\"cost\":\"562.5\"}]","fImg":"\/invoice-uploads\/20250305_114927.jpg","vendorId":"21","cost":"562.50","status":"paid","vEmail":"slackoverheaddoor@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Mon Mar 10 2025 11:07:08 GMT+0000 (Coordinated Universal Time)","timePaid":"#61 INV-398-399-400- Slack-Pd check  4588 3\/14\/2025"},
    {"invoiceId":"400","userId":"2","fJname":"Truck delivery","fAddress":"322 Rt 30","fCity":"North Versaillles","fState":"PA","fZip":"15137\n    ","fPo":"Truck3-7","fDate":"2025-03-07","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"Truck unload and rolloff. Hourly labor charge\",\"qty\":\"2\",\"cost\":\"90\"}]","fImg":"\/invoice-uploads\/truck.jpg","vendorId":"21","cost":"90.00","status":"paid","vEmail":"sackoverheaddoor@comcast.net","isHide":"false","door":"","color":"","isEmailed":"Sat Mar 08 2025 03:02:05 GMT+0000 (Coordinated Universal Time)","timePaid":"#61 INV-398-399-400- Slack-Pd check  4588 3\/14\/2025"},
    {"invoiceId":"401","userId":"2","fJname":"Proctor","fAddress":"11000 Rt 993","fCity":"Irwin","fState":"PA","fZip":"15642\n    ","fPo":"14x14-door","fDate":"2025-03-10","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"Hourly labor charge\",\"qty\":\"7\",\"cost\":\"315\"}]","fImg":"\/invoice-uploads\/20250310_140237.jpg","vendorId":"21","cost":"315.00","status":"paid","vEmail":"slackovereaddoors@comcast.net","isHide":"false","door":"","color":"white","isEmailed":"Mon Mar 10 2025 19:22:08 GMT+0000 (Coordinated Universal Time)","timePaid":"#66 INV-401-402-403-404- Slack-Pd check  4593 3\/20\/2025"},
    {"invoiceId":"402","userId":"2","fJname":"Todd Novak ","fAddress":"3117 Barberry Ct","fCity":"Murrysville","fState":"PA","fZip":"15668    ","fPo":"S14912","fDate":"2025-03-11","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pittsburgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":14,\"item\":\"16x8 Classica Double Insulated\",\"description\":\"16x8 door insulated install only\",\"qty\":0.5,\"cost\":600,\"total\":300}]","fImg":"\/invoice-uploads\/20250311_121945.jpg","vendorId":"21","cost":"300.00","status":"paid","vEmail":"slackoverheadoor@comcast.net","isHide":"false","door":"classica","color":"black","isEmailed":"Tue Mar 11 2025 16:34:26 GMT+0000 (Coordinated Universal Time)","timePaid":"#66 INV-401-402-403-404- Slack-Pd check  4593 3\/20\/2025"},
    {"invoiceId":"403","userId":"2","fJname":"Glenn Kraskey","fAddress":"2518 Forest Brook Dr","fCity":"Upper St Clair","fState":"PA","fZip":"15241    ","fPo":"S14938","fDate":"2025-03-13","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":2,\"item\":\"2-8x7 Single door\",\"description\":\"door install only\",\"qty\":1,\"cost\":210,\"total\":210},{\"prodId\":0,\"item\":\"2-Chain Opener residential\",\"description\":\"res opener install only\",\"qty\":1,\"cost\":80,\"total\":80}]","fImg":"\/invoice-uploads\/20250313_134625.jpg","vendorId":"21","cost":"290.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Thu Mar 13 2025 18:32:29 GMT+0000 (Coordinated Universal Time)","timePaid":"#66 INV-401-402-403-404- Slack-Pd check  4593 3\/20\/2025"},
    {"invoiceId":"404","userId":"2","fJname":"Michael Lowe","fAddress":"3469 MacArthur Dr","fCity":"Murryville","fState":"PA","fZip":"15668    ","fPo":"C14932","fDate":"2025-03-14","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":2,\"item\":\"Single door\",\"description\":\"2-8x7 door install only\",\"qty\":1,\"cost\":210,\"total\":210},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"1belt 1chain res opener install only&nbsp;\",\"qty\":1,\"cost\":80,\"total\":80}]","fImg":"\/invoice-uploads\/20250314_130928.jpg","vendorId":"21","cost":"290.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"charcoal gray","isEmailed":"Fri Mar 14 2025 18:45:37 GMT+0000 (Coordinated Universal Time)","timePaid":"#66 INV-401-402-403-404- Slack-Pd check  4593 3\/20\/2025"},
    {"invoiceId":"405","userId":"3","fJname":"Test job","fAddress":"548 Pollins Ave","fCity":"Hannastown","fState":"PA","fZip":"15635    ","fPo":"C12336  ","fDate":"2025-03-14","fVendor":"[{\"id\":\"30\",\"name\":\"Brian McGee\",\"address\":\"548 Pollins Ave\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"7247873758\"}]","fProducts":"[{\"prodId\":33,\"item\":\"Inspection\",\"description\":\"visual non-destructive roof evaluation\",\"qty\":1,\"price\":175,\"cost\":175}]","fImg":"\/invoice-uploads\/20240224_133706.jpg","vendorId":"30","cost":"175.00","status":"paid","vEmail":"bianrmcgee@gmail.com","isHide":"false","door":"rent","color":"designers","isEmailed":"Sat Mar 15 2025 14:12:23 GMT+0000 (Coordinated Universal Time)","timePaid":"#65 INV-405- Brian-Pd check  63 3\/15\/2025"},
    {"invoiceId":"406","userId":"2","fJname":"Jim Kyriacopoulos","fAddress":"2583 Corteland Dr","fCity":"Upper St Clair ","fState":"PA","fZip":"15241\n    ","fPo":"C14949","fDate":"2025-03-18","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16ft Insulated\",\"description\":\"door install only\",\"qty\":\".5\",\"cost\":\"200\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\".5\",\"cost\":\"40\"}]","fImg":"\/invoice-uploads\/20250318_124127.jpg","vendorId":"21","cost":"240.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"olympus","color":"sandtone","isEmailed":"Tue Mar 18 2025 17:13:36 GMT+0000 (Coordinated Universal Time)","timePaid":"#67 INV-406-407-408-409- Slack-Pd check  13705 3\/26\/2025"},
    {"invoiceId":"407","userId":"2","fJname":"Bryan Chomicki","fAddress":"1015 Marsh Dr","fCity":"Valencia","fState":"PA","fZip":"16059\n    ","fPo":"C14939","fDate":"2025-03-19","fVendor":"[{\"id\":21,\"name\":\"Big Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":13,\"item\":\"Classica Double Door\",\"description\":\"install only \",\"qty\":\".5\",\"cost\":\"250\"},{\"prodId\":7,\"item\":\"Deco Handle\/Hinge\",\"description\":\"install only\",\"qty\":\"1\",\"cost\":\"10\"}]","fImg":"\/invoice-uploads\/20250319_124546.jpg","vendorId":"21","cost":"260.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"classica","color":"white","isEmailed":"Wed Mar 19 2025 17:29:07 GMT+0000 (Coordinated Universal Time)","timePaid":"#67 INV-406-407-408-409- Slack-Pd check  13705 3\/26\/2025"},
    {"invoiceId":"408","userId":"2","fJname":"Mario Leone","fAddress":"4423 South Beverly Dr","fCity":"Aliquippa","fState":"PA","fZip":"15001    ","fPo":"C14914","fDate":"2025-03-20","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16ft Insulated\",\"description\":\"door install only\",\"qty\":0.5,\"cost\":220,\"total\":220},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":0.5,\"cost\":40,\"total\":40}]","fImg":"\/invoice-uploads\/20250320_130123.jpg","vendorId":"21","cost":"260.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"black","isEmailed":"Thu Mar 20 2025 17:46:22 GMT+0000 (Coordinated Universal Time)","timePaid":"#67 INV-406-407-408-409- Slack-Pd check  13705 3\/26\/2025"},
    {"invoiceId":"409","userId":"2","fJname":"Devon Vollmer","fAddress":"6544 English Ln ","fCity":"Squirrel Hill","fState":"PA","fZip":"15217    ","fPo":"C14911","fDate":"2025-03-21","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":15,\"item\":\"Single Insulated 8-10\",\"description\":\"8ftx7.5 - install- insulated\",\"qty\":1,\"price\":260,\"cost\":260}]","fImg":"\/invoice-uploads\/20250321_120506.jpg","vendorId":"21","cost":"260.00","status":"paid","vEmail":"slckoverheaddoor@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Fri Mar 21 2025 16:23:54 GMT+0000 (Coordinated Universal Time)","timePaid":"#67 INV-406-407-408-409- Slack-Pd check  13705 3\/26\/2025"},
    {"invoiceId":"410","userId":"2","fJname":"Jessica Silvas","fAddress":"125 Manchester Dr","fCity":"Irwin","fState":"PA","fZip":"15642    ","fPo":"53786","fDate":"2025-03-24","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":18,\"item\":\"Service call\",\"description\":\"Repair- standard labor service call labor only - bottom section 21x15ft 7ft weather strip white\",\"qty\":1,\"price\":75,\"cost\":75}]","fImg":"\/invoice-uploads\/20250324_100711.jpg","vendorId":"21","cost":"75.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"","color":"","isEmailed":"Mon Mar 24 2025 14:13:10 GMT+0000 (Coordinated Universal Time)","timePaid":"#68 INV-410-411-412- Slack-Pd check  5073 4\/2\/2025"},
    {"invoiceId":"411","userId":"2","fJname":"Justin Bowser","fAddress":"236 E Main St","fCity":"Evans City ","fState":"PA","fZip":"16033    ","fPo":"S14937","fDate":"2025-03-25","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":0,\"item\":\"Double door\",\"description\":\"11x7 new construction door install\",\"qty\":1,\"price\":270,\"cost\":270}]","fImg":"\/invoice-uploads\/20250325_123251.jpg","vendorId":"21","cost":"270.00","status":"paid","vEmail":"slackverheaddoor@comcast.net","isHide":"false","door":"recessed","color":"white","isEmailed":"Tue Mar 25 2025 18:04:44 GMT+0000 (Coordinated Universal Time)","timePaid":"#68 INV-410-411-412- Slack-Pd check  5073 4\/2\/2025"},
    {"invoiceId":"412","userId":"2","fJname":"Mark Cidboy","fAddress":"804 Sean Ct","fCity":"Jefferson Hills","fState":"PA","fZip":"15025    ","fPo":"S14925","fDate":"2025-03-26","fVendor":"[{\"id\":\"21\",\"name\":\"Door Discounter\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16x7\",\"description\":\"16x7 door install only\",\"qty\":1,\"price\":340,\"cost\":340},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":1,\"price\":80,\"cost\":80}]","fImg":"\/invoice-uploads\/20250326_132714.jpg","vendorId":"21","cost":"420.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"almond","isEmailed":"Wed Mar 26 2025 17:55:15 GMT+0000 (Coordinated Universal Time)","timePaid":"#68 INV-410-411-412- Slack-Pd check  5073 4\/2\/2025"},
    {"invoiceId":"413","userId":"2","fJname":"David Smith","fAddress":"100 Thunderbird Dr","fCity":"McKeesport ","fState":"PA","fZip":"15135    ","fPo":"S14956","fDate":"2025-04-02","fVendor":"[{\"id\":\"21\",\"name\":\"American Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":0,\"item\":\"9x6.5 insulated door\",\"description\":\"Install door\",\"qty\":2,\"price\":210,\"cost\":420},{\"prodId\":1,\"item\":\"Door opener&nbsp;\",\"description\":\"Install opener&nbsp;\",\"qty\":1,\"price\":80,\"cost\":80}]","fImg":"\/invoice-uploads\/20250402_152602.jpg","vendorId":"21","cost":"500.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Wed Apr 02 2025 20:16:19 GMT+0000 (Coordinated Universal Time)","timePaid":"#69 INV-413- Slack-Pd check  13709 4\/8\/2025"},
    {"invoiceId":"414","userId":"3","fJname":"test","fAddress":"","fCity":"","fState":"PA","fZip":"         ","fPo":"test","fDate":"2025-04-06","fVendor":"[{\"id\":\"30\",\"name\":\"Brian McGee\",\"address\":\"548 Pollins Ave\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"7247873758\"}]","fProducts":"[{\"prodId\":33,\"item\":\"Inspection\",\"description\":\"visual non-destructive roof evaluation\",\"qty\":1,\"price\":10,\"cost\":10}]","fImg":"\/invoice-uploads\/IMG_20130902_201510.jpg","vendorId":"30","cost":"10.00","status":"paid","vEmail":"brianrmee@gmail.com","isHide":"false","door":"","color":"","isEmailed":null,"timePaid":"#72 INV-414- Brian-Pd check   4\/25\/2025"},
    {"invoiceId":"415","userId":"2","fJname":"Chris Keller","fAddress":"700 Stonegate Dr","fCity":"Oakdale","fState":"PA","fZip":"15017    ","fPo":"C14481","fDate":"2025-04-07","fVendor":"[{\"id\":\"21\",\"name\":\"Top Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 14x7\",\"description\":\"door install only - Reconnect opener\",\"qty\":1,\"price\":300,\"cost\":300}]","fImg":"\/invoice-uploads\/20250407_125659.jpg","vendorId":"21","cost":"300.00","status":"paid","vEmail":"slack@comcast.net","isHide":"false","door":"lincoln","color":"mahogany","isEmailed":"Mon Apr 07 2025 19:38:08 GMT+0000 (Coordinated Universal Time)","timePaid":"#70 INV-415-416-417- Slack-Pd check  5078 4\/15\/2025"},
    {"invoiceId":"416","userId":"2","fJname":"Kathryn Neidinger","fAddress":"204 Sleepy Hollow Rd ","fCity":"Mt Lebanon","fState":"PA","fZip":"15216    ","fPo":"14933C","fDate":"2025-04-08","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":0,\"item\":\"Single&nbsp;\",\"description\":\"8x6.5 door\",\"qty\":2,\"price\":210,\"cost\":420}]","fImg":"\/invoice-uploads\/20250408_140426.jpg","vendorId":"21","cost":"420.00","status":"paid","vEmail":"slackoveaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Tue Apr 08 2025 19:11:42 GMT+0000 (Coordinated Universal Time)","timePaid":"#70 INV-415-416-417- Slack-Pd check  5078 4\/15\/2025"},
    {"invoiceId":"417","userId":"2","fJname":"Patty Orelly","fAddress":"444 Blackberry Dr","fCity":"Monroeville ","fState":"PA","fZip":"15146    ","fPo":"S14617","fDate":"2025-04-10","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"16x7 door install only\",\"qty\":1,\"price\":340,\"cost\":340},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":1,\"price\":80,\"cost\":80}]","fImg":"\/invoice-uploads\/20250410_124108.jpg","vendorId":"21","cost":"420.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Thu Apr 10 2025 17:17:50 GMT+0000 (Coordinated Universal Time)","timePaid":"#70 INV-415-416-417- Slack-Pd check  5078 4\/15\/2025"},
    {"invoiceId":"418","userId":"2","fJname":"Albert Slack","fAddress":"1524 Barry Dr","fCity":"White Oak","fState":"PA","fZip":"15624    ","fPo":"Door trim","fDate":"2025-04-15","fVendor":"[{\"id\":\"21\",\"name\":\"Top Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"Hourly labor charge\",\"qty\":4,\"price\":45,\"cost\":180}]","fImg":"\/invoice-uploads\/20250415_113516.jpg","vendorId":"21","cost":"180.00","status":"paid","vEmail":"slackovrhddoors@comcast.net","isHide":"false","door":"","color":"sandtone","isEmailed":"Tue Apr 15 2025 15:58:23 GMT+0000 (Coordinated Universal Time)","timePaid":"#71 INV-418-419-420- Slack-Pd check  4596 4\/23\/2025"},
    {"invoiceId":"419","userId":"2","fJname":"Scott Mihalek","fAddress":"304 Country Hills Dr","fCity":"Irwin ","fState":"PA","fZip":"15642\n    ","fPo":"S14972","fDate":"2025-04-16","fVendor":"[{\"id\":21,\"name\":\"Door Discounter\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"16x7 rear torsion door install only\",\"qty\":\"1\",\"cost\":\"375\"},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":\"1\",\"cost\":\"80\"},{\"prodId\":5,\"item\":\"Wood jamb - 1x\/2x\",\"description\":\"wood work install only\",\"qty\":\"16\",\"cost\":\"0\"},{\"prodId\":8,\"item\":\"Misc service\",\"description\":\"Spring pad misc charge\",\"qty\":\"1\",\"cost\":\"0\"}]","fImg":"\/invoice-uploads\/20250416_140205.jpg","vendorId":"21","cost":"455.00","status":"paid","vEmail":"slackoverheaddoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Wed Apr 16 2025 19:06:49 GMT+0000 (Coordinated Universal Time)","timePaid":"#71 INV-418-419-420- Slack-Pd check  4596 4\/23\/2025"},
    {"invoiceId":"420","userId":"2","fJname":"Truck drop","fAddress":"455 E Pgh McKeesport Blvd","fCity":"North Versaillles","fState":"PA","fZip":"15137    ","fPo":"Shop","fDate":"2025-04-17","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"Hourly labor charge\",\"qty\":1,\"price\":45,\"cost\":45}]","fImg":"\/invoice-uploads\/truck.jpg","vendorId":"21","cost":"45.00","status":"paid","vEmail":"slackoverhaddoors@comcast.net","isHide":"false","door":"","color":"","isEmailed":"Fri Apr 18 2025 12:50:47 GMT+0000 (Coordinated Universal Time)","timePaid":"#71 INV-418-419-420- Slack-Pd check  4596 4\/23\/2025"},
    {"invoiceId":"421","userId":"2","fJname":"Jason Espersen","fAddress":"1443 Barry Dr","fCity":"North Huntingdon","fState":"PA","fZip":"15642\n    ","fPo":"S14964","fDate":"2025-04-22","fVendor":"[{\"id\":21,\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16ft Insulated\",\"description\":\"door install only\",\"qty\":\".5\",\"cost\":\"250\"}]","fImg":"\/invoice-uploads\/20250422_114806.jpg","vendorId":"21","cost":"250.00","status":"unpaid","vEmail":"slacoverhedoors@comcast.net","isHide":"false","door":"lincoln","color":"white","isEmailed":"Tue Apr 22 2025 16:25:01 GMT+0000 (Coordinated Universal Time)","timePaid":"false"},
    {"invoiceId":"422","userId":"2","fJname":"Kim Torok","fAddress":"2205 Fawcett Ave","fCity":"White Oak","fState":"PA","fZip":"15131    ","fPo":"S14983","fDate":"2025-04-23","fVendor":"[{\"id\":\"21\",\"name\":\"Slack Overhead Doors\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":3,\"item\":\"Double 16ft Insulated\",\"description\":\"16x7 door install only\",\"qty\":0.5,\"price\":500,\"cost\":250},{\"prodId\":0,\"item\":\"Opener residential\",\"description\":\"res opener install only Mike pittsburgh job\",\"qty\":0.5,\"price\":80,\"cost\":40}]","fImg":"\/invoice-uploads\/20250423_123014.jpg","vendorId":"21","cost":"290.00","status":"unpaid","vEmail":"slackoverhedoors@comcast.net","isHide":"false","door":"recessed","color":"white","isEmailed":null,"timePaid":"false"},
    {"invoiceId":"423","userId":"3","fJname":"Mickey Mantle","fAddress":"110 N Mercury Ave","fCity":"Clearwater","fState":"FL","fZip":"33765    ","fPo":"XR489TEST","fDate":"2025-04-25","fVendor":"[{\"id\":\"32\",\"name\":\"BM Services LLC\",\"address\":\"500 Pollins Ave\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"7247873758\"}]","fProducts":"[{\"prodId\":27,\"item\":\"Opener residential\",\"description\":\"res opener install only\",\"qty\":1,\"price\":2,\"cost\":2},{\"prodId\":28,\"item\":\"Double door\",\"description\":\"door install only\",\"qty\":1,\"price\":3,\"cost\":3},{\"prodId\":30,\"item\":\"Misc service\",\"description\":\"misc charge\",\"qty\":3,\"price\":1,\"cost\":3},{\"prodId\":33,\"item\":\"Inspection\",\"description\":\"visual non-destructive roof evaluation\",\"qty\":1,\"price\":1,\"cost\":1},{\"prodId\":31,\"item\":\"Hourly labor\",\"description\":\"Hourly labor charge\",\"qty\":12,\"price\":1,\"cost\":12}]","fImg":"\/invoice-uploads\/20240531_192420.jpg","vendorId":"32","cost":"21.00","status":"paid","vEmail":"brianrmcgee@gmail.com","isHide":"false","door":"heritage","color":"mahogany","isEmailed":null,"timePaid":"false"},
    {"invoiceId":"424","userId":"2","fJname":"Ravi Veru","fAddress":"9327 Marshall Rd","fCity":"Cranberry Twp","fState":"PA","fZip":"16066\n    ","fPo":"C14950","fDate":"2025-04-29","fVendor":"[{\"id\":21,\"name\":\"Door Discounter\",\"address\":\"455 E Pgh McKeesport Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-678-2929\"}]","fProducts":"[{\"prodId\":1,\"item\":\"Double door 16ft \",\"description\":\"door install only\",\"qty\":\"1\",\"cost\":\"340\"}]","fImg":"\/invoice-uploads\/20250429_125913.jpg","vendorId":"21","cost":"340.00","status":"unpaid","vEmail":"slackoveaddoors@comcast.net","isHide":"false","door":"recessed","color":"white","isEmailed":"Tue Apr 29 2025 19:06:42 GMT+0000 (Coordinated Universal Time)","timePaid":"false"}
    ]
    }
]
renderInvoices(temp_invoices[2].data)    





function newInvoiceHTML(){
    let bodyHTML = `
    
    <div class="wrapper bg-dark-subtle p-0 m-0 p-1" style="font-family: Arial, Helvetica, sans-serif; min-height: 100%;">
 
     <button type="button" onclick="updateInvoiceRecord(this)" class="btn btn-warning rounded-2 d-none">Save</button>
     <input type="number" value="380" onchange="getInvoiceObjectToForm(this.value)" min="380" class="d-none float-end form-control" style="width: 7rem;">
     <div id="note"></div>
     
     <div class="inv-container container-md p-3 bg-wrapper mt-1 rounded-2 shadow" style="max-width: 775px;">
 
         <h5 class="py-1 bg-dark-subtle p-1">Vendor 
             <span class="float-end fw-bold fs-4 pe-3 ">ID: <span id="invoiceId" class="float-end fw-bold fs-4 pe-3 "></span></span>
         </h5>
         <input type="text" name="userId" id="userId" value="user" class="d-none">
         
         <form action="">
 
             <div class="vendor">
                 <div class="row">
                     <div class="col-xs-12 col-sm-6">
                         <label for="vendor" class="form-label">Vendor</label>
                         <input type="text" placeholder="vendor" id="vendor" name="vendor" class="form-control">
                     </div>
                     <div class="col-xs-11 col-sm-6">
                         <label for="vemail" class="form-label">Email</label>
                         <input type="text" placeholder="email" id="vemail" name="vemail"class="form-control">
                     </div>
                     <div class="col-xs-1 col-sm-1 d-none">
                         <label for="vendorId" class="form-label">ID</label>
                         <input type="text" placeholder="ID" id="vendorId" name="vendorId"class="form-control">
                     </div>
                 </div>
                 <div class="row">
                     <div class="col-xs-12 col-sm-7">
                         <label for="address" class="form-label">Address</label>
                         <input type="text" placeholder="address" id="address" name="address" class="form-control">
                     </div>
                     <div class="col-xs-12 col-sm-5">
                         <label for="phone" class="form-label">Phone</label>
                         <input type="text" placeholder="phone" id="phone" name="phone"class="form-control">
                     </div>
                 </div>
                 <div class="row">
                     <div class="col-xs-12">
                         <label for="city" class="form-label">City</label>
                         <input type="text" placeholder="city" id="city" name="city" class="form-control">
                     </div>
                 </div>
 
             </div>    
             
 
             <h5 class="py-1 bg-dark-subtle p-1 mt-2">Project </h5>
             <div class="project">
                 <div class="row">
                     <div class="col-xs-12 col-sm-8">
                         <label for="jobname" class="form-label">Job Name</label>
                         <input type="text" placeholder="job name" id="jobname" name="jobname" class="form-control">
                     </div>
                     <div class="col-xs-12 col-sm-4">
                         <label for="jobdate" class="form-label">Date</label>
                         <input type="text" placeholder="date" id="jobdate" name="jobdate"class="form-control">
                     </div>
                 </div>
                 <div class="row">
                     <div class="col-xs-12 col-sm-8">
                         <label for="jobaddress" class="form-label">Address</label>
                         <input type="text" placeholder="address" id="jobaddress" name="address" class="form-control">
                     </div>
                     <div class="col-xs-12 col-sm-4">
                         <label for="jobpo" class="form-label">PO</label>
                         <input type="text" placeholder="PO" id="jobpo" name="jobpo"class="form-control">
                     </div>
                 </div>
                 <div class="row">
                     <div class="col-xs-12 col-sm-5">
                         <label for="jobcity" class="form-label">City</label>
                         <input type="text" placeholder="city" id="jobcity" name="jobcity" class="form-control">
                     </div>
                     <div class="col-xs-12 col-sm-3">
                         <label for="jobstate" class="form-label">State</label>
                         <input type="text" placeholder="state" id="jobstate" name="jobstate"class="form-control">
                     </div>
                     <div class="col-xs-12 col-sm-4">
                         <label for="jobzip" class="form-label">Zip</label>
                         <input type="text" placeholder="zip" id="jobzip" name="jobzip"class="form-control">
                     </div>
                 </div>
 
                 
                 <div class="row">
                     <div class="col-xs-12">
                         <label for="isEmailed" class="form-label">Saved/Email</label>
                         <input type="text" placeholder="isEmailed" id="isEmailed" name="isEmailed" class="form-control">
                     </div>
                     <div class="col-xs-12">
                         <label for="timePaid" class="form-label">Due/Paid</label>
                         <input type="text" placeholder="timePaid" id="timePaid" name="timePaid"class="form-control">
                     </div>
                 </div>
             </div>
             
 
             <div class="py-1 bg-dark-subtle p-1 mt-2">
                 <h5 class="">Line Items 
                     <span>
                         <button onclick="addLineItem()" type="button" class="btn btn-sm btn-transparent float-end">
                             <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0e1ce1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" stroke="#2907d5" stroke-width="2"></path> <path d="M16.2739 11.1377C16.6644 10.7472 16.6644 10.114 16.2739 9.7235L14.4823 7.9319C14.0918 7.54137 13.4586 7.54138 13.0681 7.9319L8.96106 12.0389L8.34768 15.7477C8.3365 15.8154 8.39516 15.874 8.4628 15.8627L12.1669 15.2448L16.2739 11.1377Z" stroke="#2907d5" stroke-width="2"></path> </g></svg>
                         </button>
                     </span>
                 </h5>
             </div>
     
             <table class="product-table table text-light">
                     <thead>
                     <tr>
                         <th scope="col">#</th>
                         <th scope="col">Item</th>
                         <th scope="col">Description</th>
                         <th scope="col">Qty</th>
                         <th scope="col" >Cost</th>
                         <th scope="col" >Total</th>
                     </tr>
                     </thead>
                     <tbody id="tableBody">
                     <tr>
                         <th scope="row">1</th>
                         <td contenteditable="true"></td>
                         <td contenteditable="true"></td>
                         <td contenteditable="true"></td>
                         <td contenteditable="true"></td>
                         <td contenteditable="true"></td>
                     </tr>
                     </tbody>
             </table>
 
             <div class="text-end fs-3">$<span id="cost" class="fs-3"></span></div>
 
             <button id="deleteBtn" name="" type="button" class="btn btn-danger btn-sm float-start" onclick="confirmDeleteInvoiceRecord(this.name)">
                 <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                 Delete Invoice
             </button>
 
             <div class="modal-footer">
                 <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" onclick="fetchAllInvoices()">Close</button>
                 <button class="btn btn-sm btn-danger d-none" onclick="document.getElementById('addExpenseForm').reset()" type="button">Clear</button>
                 <button onclick="updateInvoiceRecord(event)" class="btn btn-success btn-sm" type="button">Save</button>
             </div>
 
         </form>
 
 
     </div>  
 
   </div>    
     
     
     `;
     return bodyHTML;
}




let count_filter = 0;
function filterShowAll(){
    let badgeElem = document.querySelectorAll('.invoice-status')

    for (let x = 0; x < badgeElem.length; x++){
        let invoice_id = (badgeElem[x].id.slice(5))
        let invoiceElem = document.getElementById(`inv${invoice_id}`)

        if (invoiceElem.classList.value.includes('d-none')) {
            invoiceElem.classList.remove('d-none')
        }

    }
    count_filter = 0;

}

function filterStatus(id){
    let invs = document.querySelectorAll('.invoice');
    let countElem = document.getElementById('invoiceTotalCount');

    if (id == 'all') {
        filterShowAll()
        let statusBox = document.querySelectorAll('.status-box');
        statusBox.forEach((box) => {
            box.checked = false
        })
        document.getElementById(id).checked = true;
        countElem.innerHTML = (invs.length)
        return;
    }

    filterShowAll()
    let statusBox = document.querySelectorAll('.status-box');
    statusBox.forEach((box) => {
        box.checked = false
    })
    document.getElementById(id).checked = true

    console.log(invs.length)

    invs.forEach(i => {
        let inv_id = (i.id.slice(3));
       let elem = document.getElementById(`badge${inv_id}`)
       let classes = elem.classList;
       if (!classes.value.includes(id)) {
        document.getElementById(`inv${inv_id}`).classList.add('d-none')
        count_filter ++
       }
    })

    countElem.innerHTML = (invs.length - count_filter)

}






async function fetchDataAPI(){
    
    function bmUser(){
        let obj = 
            {   'avatar' : "https://www.bm-app.org/users/bm_hat.png",
                'email' : "brianrmcgee@gmail.com",
                'fullname' : "Brian McGee",
                'id' : 2,
                'role' : "system",
                'token' : "987779tk99mirage724787996603338475hddsAlpha$221@**52Dffewq562204j3m6b8KK*7%bbbtgh",
                'username' : "Brian",
                'address' : "PO Box 66",
                'city' : "Hannastown PA 15635",
                'page' : "<h1>Welcome B Dizzo</h1>",
                'phone' : "724.787.3758"

        }
        return obj;
    }
  let html = '';
  let response = await fetch('https://www.brmnow.com/backoffice/customers');

  // set data to initial fetch json and create array invoiceRecord
  let data = await response.json();
  recordCount = data.length/1;
  

  renderInvoices(data)
}
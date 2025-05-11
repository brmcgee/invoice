const invoiceContainer = document.getElementById('invoiceContainer');
const invoiceTotalCountElem = document.getElementById('invoiceTotalCount');
const offCanvasFooterRoot = document.getElementById('offCanvasFooterRoot')
var invoiceData = [];
let recordCount = 0;


class Invoice {

    constructor(id, user, jobname, address, city, state, zip,  po, date, vendor, products, img, vendorId, cost, status, email, hide, sent, paid){
        this.invoiceId = id;
        this.userId = user;
        this.fJname = jobname;
        this.fAddress = address;
        this.fCity = city;
        this.fState = state;
        this.fZip = zip;
        this.fPo = po;
        this.fDate = date
        this.fVendor = vendor;  // array { id, name, address, city (state, zip), phone }
        this.vEmail = email;
        this.fProducts = products; // array { prodId, item, description, qty, cost }
        this.cost = cost;
        this.timePaid = paid;
        this.isEmailed = sent;
        this.status = status;
        this.isHide = hide;
        this.vendorId = vendorId
        this.fImg = img
    }
}

const inv1 = new Invoice ( "340","2","Yogi Beara","1997 Gulf TO Bay Blvd","Boston","PA","19963","XYZ9963","2025-01-01","[{\"id\":\"28\",\"name\":\"Lusha Vegas\",\"address\":\"356 Muscle St\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"724-366-4377\"}]","[{\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800, }]","https:\/\/www.bm-app.org\/invoice-uploads\/20240811_134224.jpg","28","800.00","paid","brianmcee@gmail.com","true","Mon Feb 24 2025 09:41","#51 INV-381- Pd Check 1\/1 bm 1\/1\/2025" )
const inv2 = new Invoice ( "399","2","Bill Sager","1706 Chelton Avenue","Brookline","PA","15226\n","C14018","2025-03-05","[{\"id\":21,\"name\":\"Tri City Doors\",\"address\":\"4655 E Pitts McKees Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-679-2929\"}]","[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"2 8x7.5, jambs, opener, Hourly labor charge\",\"qty\":\"12.5\",\"cost\":\"562.5\"}]","\/invoice-uploads\/20250305_114927.jpg","21","562.50","paid","slackdoor@comcast.net","false","Mon Mar 10 2025 11:07:08 GMT+0000","#61 INV-398-399-400- Johnson-Pd check  4588 3\/14\/2025")
const inv3 = new Invoice ( "311","2","Frank Mustard","1988 Smithon St","Pittsburgh","PA","15226\n","XC6631","2025-03-15","[{\"id\":22,\"name\":\"West Coast Doors\",\"address\":\"4655 E Pitts McKees Blvd\",\"city\":\"North Versailles, PA 15137\",\"phone\":\"412-679-2929\"}]","[{\"prodId\":9,\"item\":\"Hourly labor\",\"description\":\"2 8x7.5, jambs, opener, Hourly labor charge\",\"qty\":\"12.5\",\"cost\":\"562.5\"}]","\/invoice-uploads\/20250305_114927.jpg","21","562.50","paid","headdoor@comcast.net","false","Mon Mar 10 2025 11:07:08 GMT+0000","false")
const inv4 = new Invoice ( "380","2","Biff MacGyver","333 Cemetery Rd","Westin","PA","19963","FC63369","2025-01-01","[{\"id\":\"28\",\"name\":\"Lusha Vegas\",\"address\":\"356 Muscle St\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"724-366-4377\"}]","[{\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800}]","https:\/\/www.bm-app.org\/invoice-uploads\/20240811_134224.jpg","28","540.00","unpaid","briamcgee@gmail.com","true",null )
const inv5 = new Invoice ( "355","2","Leigh Manuel","565 West Hanover Rd","Westin","PA","19963","FC63369","2025-01-01","[{\"id\":\"28\",\"name\":\"Lusha Vegas\",\"address\":\"356 Muscle St\",\"city\":\"Hannastown, PA 15635\",\"phone\":\"724-366-4377\"}]","[{\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800,\"prodId\":8,\"item\":\"Rent Payment&nbsp;\",\"description\":\"356 Musick St - rental month Jan25<br>\",\"qty\":1,\"price\":800,\"cost\":800}]","https:\/\/www.bm-app.org\/invoice-uploads\/20240811_134224.jpg","28","840.00","unpaid","brianmgee@gmail.com","true",null )



class InvoiceApp {

    constructor(){
        this.invoices = this.loadInvoices();
    }

    loadInvoices(){
        const invoices = localStorage.getItem('invoices');
        return invoices ? JSON.parse(invoices) : [];
    }
    loadInvoiceId(id) {     
        return this.invoices.filter(inv => inv.invoiceId === id);
    }
    saveInvoices(){
        localStorage.setItem('invoices', JSON.stringify(this.invoices))
    }
    createInvoice(invoice){
        this.invoices.push(invoice)
        this.saveInvoices()

        invoiceContainer ? invoiceContainer.innerHTML += invoiceCardTemplate(invoice) : ''
        invoiceTotalCountElem ? invoiceTotalCountElem.innerHTML = app.getAllInvoices().length : ''
    }
    deleteInvoice(invoiceId){
        this.invoices = this.invoices.filter(inv => inv.invoiceId !== invoiceId)
        this.saveInvoices();

        document.getElementById(`inv${invoiceId}`) && document.getElementById(`inv${invoiceId}`).remove()
        invoiceTotalCountElem ? invoiceTotalCountElem.innerHTML = app.getAllInvoices().length : ''
    }
    editInvoice(id, updatedData) {
        const index = this.invoices.findIndex(invoice => invoice.invoiceId == id);
        if (index !== -1) {
            this.invoices[index] = { ...this.invoices[index], ...updatedData };
            this.saveInvoices();
        }
    }
    updateInvoice(id, updatedData) {
        this.editInvoice(id, updatedData);
    }

    getAllInvoices(){
        return this.invoices;
    }
    getInvoiceIdTotal(id) {     
        let invoice = this.invoices.filter(inv => inv.invoiceId === id);
        let sum = 0;
        JSON.parse(invoice[0].fProducts).forEach(prod => { sum = sum + Number(prod.cost) })
        return sum;
    }
    getInvoiceThumbnail(id){
        let invoice = this.invoices.filter(inv => inv.invoiceId === id);    
        let img = invoice[0].fImg.split('/')[invoice[0].fImg.split('/').length-1]
        let thumb = 'https://www.bm-app.org/invoice-uploads/' + `thumbnail/th_${img}`
        return thumb;
    }
    getInvoiceDataURL(id){
        let url = this.getInvoiceThumbnail(id);
        var xmlHTTP = new XMLHttpRequest();

        xmlHTTP.open('GET', url, true);
        xmlHTTP.responseType = 'arraybuffer';
        xmlHTTP.onload = function(e) {
          var arr = new Uint8Array(this.response);
          var raw = String.fromCharCode.apply(null,arr);
          var b64 = btoa(raw);
          var dataURL="data:image/png;base64," + b64;
            console.log(dataURL)
        };
        xmlHTTP.send();
        
    }

}

app = new InvoiceApp();
mydata = app.loadInvoices();
// app.createInvoice(Invoice)   // create new invoice parameter invoice class
// app.deleteInvoice(invoiceId)   // create new invoice parameter string of invoiceId

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
                                                ? ` <small class="text-primary">Sent email on ${isEmailed} </small>`
                                                : ` <small style="color:purple;">Saved ${(fDate)} </small>`}
                                            
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
                                                : ` <small>Saved ${editDate2(fDate)} </small>`}

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
        <button id="offcanvasCloseBtn" type="button" class="btn-discard my-2 ms-1" onclick="confirmDeleteInvoiceRecord(${invoiceId})" data-bs-dismiss="offcanvas" aria-label="Close">Discard</button>


         
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
        <div class="invoice-id">#<span id="invoiceId">${obj.invoiceId}</span></div>
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

// renderInvoices(temp_invoices[2].data)    
renderInvoices(mydata)




function newInvoiceHTML(){
    let bodyHTML = `
    
    <div class="wrapper bg-dark-subtle p-0 m-0 p-1" style="font-family: Arial, Helvetica, sans-serif; min-height: 100%;">
 
     <button type="button" onclick="updateInvoiceRecord(this)" class="btn btn-warning rounded-2 d-none">Save</button>
     <input type="number" value="380" onchange="getInvoiceObjectToForm(this.value)" min="380" class="d-none float-end form-control" style="width: 7rem;">
     <div id="note"></div>
     <span class="float-end">${backBTN()}</span>
     
     <div class="inv-container container-md p-3 bg-wrapper mt-1 rounded-2 shadow" style="max-width: 775px;">
 
         <h5 class="py-1 bg-dark-subtle p-1">Vendor 
             <span class="float-end fw-bold fs-4 pe-3 ">ID: <span id="invoiceId" class="float-end fw-bold fs-4 pe-3 ">${app.getAllInvoices().length+1}</span></span>
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
                         <input type="date" placeholder="date" id="jobdate" name="jobdate"class="form-control">
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
 
                 
                 <div class="row d-none">
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
                         <button onclick="addLineItem()" type="button" class="btn btn-sm btn-light rounded-circle float-end">
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
                     <tbody id="tableBody" class="bg-light text-dark">

                     </tbody>
             </table>
 
             <div class="text-end fs-3">$<span id="cost" class="fs-3"></span></div>
 
             <button id="deleteBtn" name="" type="button" class="btn btn-danger btn-sm float-start" onclick="confirmDeleteInvoiceRecord(this.name)">
                 <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                 Delete Invoice
             </button>
 
             <div class="modal-footer">
                 <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="offcanvas">Close</button>
                 <button class="btn btn-sm btn-danger d-none" onclick="document.getElementById('addExpenseForm').reset()" type="button">Clear</button>
                 <button onclick="updateInvoiceRecord(event)" class="btn btn-success btn-sm" type="button" data-bs-dismiss="offcanvas">Save</button>
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
    // filter all 
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

    // filter d-none added to excluded invs
    filterShowAll()
    let statusBox = document.querySelectorAll('.status-box');
    statusBox.forEach((box) => {
        box.checked = false
    })
    document.getElementById(id).checked = true


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




let productCount = 0;
// let user_id = 9;

function confirmDeleteInvoiceRecord(id) {

  

    
    let deleteText = `Are you sure to delete invoice, once deleted this can not be undone!`
    if (confirm(deleteText)){

        app.deleteInvoice(id)
        // document.getElementById(`inv${id}`).remove()
        
    } else {
        alert('close call we shall not delete!')
    }



}
function getRowTotal(id){
    let totalCost = 0;
    let qty = Number(document.getElementById(`qty${id}`).innerHTML) ? Number(document.getElementById(`qty${id}`).innerHTML) : 0
    let cost = Number(document.getElementById(`cost${id}`).innerHTML) ? Number(document.getElementById(`cost${id}`).innerHTML) : 0
    let total = qty * cost
    document.getElementById(`total${id}`).innerHTML = total

    let costElem = document.getElementById('cost')
    let totals = document.querySelectorAll('.total');
    totals.forEach(t => {
        totalCost = totalCost + Number(t.innerHTML)
    })
    costElem.innerHTML = totalCost
}
function addLineItem(){
    
    let html = `  
            <p class="d-none" id='prodId${productCount}'>${productCount}</p>
            <tr id="lineItem${productCount}" name="x"  >
                <th scope="row" class="prodId">
                    <button id="${productCount}" onclick="deleteRow('lineItem${productCount}')" class="btn btn-sm btn-transparent">
                        <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="#d10000" width="64px" height="64px" viewBox="0 0 24 24" stroke="#d10000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>
                    </button>  
                </th>
                <td contenteditable="true" class="item" id="item${productCount}"></td>
                <td contenteditable="true" class="description" id="description${productCount}"></td>
                <td contenteditable="true" class="qty" id="qty${productCount}" onkeyup="getRowTotal(${productCount})"></td>
                <td contenteditable="true" class="cost" id="cost${productCount}" onkeyup="getRowTotal(${productCount})"></td>
                <td contenteditable="false" class="total" id="total${productCount}">0</td>
            </tr>
            `
    document.getElementById('tableBody').innerHTML += html
}
function deleteRow(target){
    document.getElementById(target).remove()
}
function updateInvoiceRecord(e){

    e.preventDefault;
    let record = makeInvoiceObjectFromForm();

   app.createInvoice(record)

}
function makeInvoiceObjectFromForm(){
    let invId = document.getElementById('invoiceId')
    let jobname = document.getElementById('jobname')
    let jobdate = document.getElementById('jobdate')
    let jobaddress = document.getElementById('jobaddress')
    let jobcity = document.getElementById('jobcity')
    let jobstate = document.getElementById('jobstate')
    let jobzip = document.getElementById('jobzip')
    let jobpo = document.getElementById('jobpo')
    let vendor = document.getElementById('vendor')
    let vaddress = document.getElementById('address')
    let vcity = document.getElementById('city')
    let vphone = document.getElementById('phone')
    let vemail = document.getElementById('vemail')
    let vendorId = document.getElementById('vendorId')
    let tableBody = document.getElementById('tableBody')
    let timePaid = document.getElementById('timePaid');
    let isEmailed = document.getElementById('isEmailed');
    let userId = document.getElementById('userId');
    let cost = document.getElementById('cost');
    

    let products = [];
    let totalCost = 0;

    let items = document.querySelectorAll('.item');
    let descriptions = document.querySelectorAll('.description')
    let qtys = document.querySelectorAll('.qty')
    let costs = document.querySelectorAll('.cost')
    let totals = document.querySelectorAll('.total')
        
    for (let i = 0; i < items.length; i++){
        let obj = { 
            'prodId' : Number(document.getElementById(`prodId${i}`).innerHTML), 
            'item': items[i].innerHTML, 'description' : descriptions[i].innerHTML, 
            'qty' : Number(qtys[i].innerHTML), 
            'price': Number(costs[i].innerHTML), 
            'cost' : Number(totals[i].innerHTML) }
        products.push(obj)
        totalCost = totalCost + Number(totals[i].innerHTML)
    }

    let vendor_active = [{ 'id' : vendorId.value, 'name' : vendor.value, 'address' : vaddress.value, 'city' : vcity.value, 'phone' : vphone.value}]
    let obj = {
            'invoiceId' : app.getAllInvoices().length+1,
            'userId' : Number(userId.value),
            'fDate' : jobdate.value,
            'fJname' : jobname.value,
            'fAddress' : jobaddress.value,
            'fCity' : jobcity.value,
            'fState' : jobstate.value,
            'fZip' : jobzip.value,
            'fPo' : jobpo.value,
            'fVendor' : JSON.stringify(vendor_active),
            'vEmail' : vemail.value,
            'fProducts' : JSON.stringify(products),
            'cost' : totalCost,
            'timePaid' : 'false',
            'isEmailed' : null,
            'status' : 'unpaid',
            'isHide' : 'false',
            'cost' : Number(cost.innerHTML),
            'fImg' : '/invoice-uploads/placeholder.jpg'
        }
      
        return obj
}

function getInvoiceObjectToForm(id){
    let invId = document.getElementById('invoiceId')
    let jobname = document.getElementById('jobname')
    let jobdate = document.getElementById('jobdate')
    let jobaddress = document.getElementById('jobaddress')
    let jobcity = document.getElementById('jobcity')
    let jobstate = document.getElementById('jobstate')
    let jobzip = document.getElementById('jobzip')
    let vendor = document.getElementById('vendor')
    let vaddress = document.getElementById('address')
    let vcity = document.getElementById('city')
    let vphone = document.getElementById('phone')
    let vemail = document.getElementById('vemail')
    let tableBody = document.getElementById('tableBody')
    let jobpo = document.getElementById('jobpo')
    let vendorId = document.getElementById('vendorId')
    let timePaid = document.getElementById('timePaid');
    let isEmailed = document.getElementById('isEmailed');
    let userId = document.getElementById('userId');
    let deleteBtn = document.getElementById('deleteBtn');
    let costElem = document.getElementById('cost')

    function populateForm(data){
       let inv = data[0]
       deleteBtn.name = inv.invoiceId   
       invId.innerHTML = inv.invoiceId
       jobname.value = inv.fJname
       jobdate.value = inv.fDate
       jobaddress.value = inv.fAddress
       jobcity.value = inv.fCity
       jobstate.value = inv.fState
       jobzip.value = inv.fZip
       jobpo.value = inv.fPo
       let customer = JSON.parse(inv.fVendor)
       vendor.value = customer[0].name
       vaddress.value = customer[0].address
       vcity.value = customer[0].city
       vendorId.value = customer[0].id
       vemail.value = inv.vEmail
       vphone.value = customer[0].phone
       isEmailed.value = inv.isEmailed
       timePaid.value = inv.timePaid
       userId.value = inv.userId
       costElem.innerHTML = `${inv.cost.toFixed(2)}` 


       let products = JSON.parse(inv.fProducts)
       let html = ``
       productCount = 0;
       products.forEach(product => {
            html += `<p class="d-none" id='prodId${productCount}'>${product.prodId}</p>
            <tr id="lineItem${productCount}" name="${product.prodId}">
                <th scope="row" class="prodId">
                    <button id="${productCount}" onclick="deleteRow('lineItem${productCount}')" class="btn btn-sm btn-transparent">
                        <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" fill="#d10000" width="64px" height="64px" viewBox="0 0 24 24" stroke="#d10000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>
                    </button>  
                </th>
                <td contenteditable="true" class="item" id="item${productCount}">${product.item}</td>
                <td contenteditable="true" class="description" id="description${productCount}">${product.description}</td>
                <td contenteditable="true" class="qty" id="qty${productCount}" onkeyup="getRowTotal(${productCount})">${product.qty}</td>
                <td contenteditable="true" class="cost" id="cost${productCount}" onkeyup="getRowTotal(${productCount})">${Number(product.cost) / Number(product.qty)}</td>
                <td contenteditable="false" class="total" id="total${productCount}">${product.cost}</td>
            </tr>
            `
            productCount ++;
       });
       tableBody.innerHTML = html;
       
       
    }
   
    $.get(`${pre}/invoices/${id}`, function(data){
        
        populateForm(data)
        
    })
    
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

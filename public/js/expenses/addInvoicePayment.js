function addPaymentModal(){
    return `
    
 <div class="modal fade" id="addInvoicePaymentModal" tabindex="-1">
  <div class="modal-dialog modal-fullscreen-md-down">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addInvoicePaymentModalLabel">Payments</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="addInvoicePaymentModalBody">
         



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-sm btn-danger" onclick="document.getElementById('addExpenseForm').reset()" type="button">Clear</button>
        <button onclick="getInvoicesForPayment(event)" class="btn btn-primary btn-sm" type="button"  data-bs-dismiss="modal">Submit</button>
      </div>
    </div>
  </div>
</div>   
    
    `;
}
let unpaidInvoices = [];
let totalPayment = 0;
let totalDue = 0;


async function getUnpaidInvoices() {
    let url = `${pre}/invoice-sort`
    let params = {
        'key' : 'status',
        'value' : 'unpaid'
    }
    $.post(url, params, function(data){
        unpaidInvoices = [];
        unpaidInvoices = data;
    })
    .then(function(data){
        // setCheckEventListeners()
    })

}
function addInvoicesForPayment(){
    let invoiceToPay = [];
    let checks = document.querySelectorAll('.unpaidCheck');
    checks.forEach(check => {
        (check.checked && invoiceToPay.push(check.name))
    })
    return invoiceToPay;
}

function getInvoicesForPayment(event){

    event.preventDefault();
    let invoiceToPayArray = addInvoicesForPayment();
    let url = `${pre}/add-payment`
    let firstInvoice = unpaidInvoices[0];
    let vendorInfo = JSON.parse(firstInvoice.fVendor);
   
    let params = {
        'invoices' : invoiceToPayArray,
        'date' : new Date(),
        'note' : document.getElementById('paymentNote').value,
        'amount' : Number(totalInvoicePayment.innerHTML),
        'vendor' : vendorInfo[0].name,
        'vEmail' : firstInvoice.vEmail
    }

    $.post(url, params, function(data){
        // console.log(data)

    })
    .then(function(data){
        let allInvoices = ``;
        data.invoices.forEach(i => {
            allInvoices += i + ' '
        })
        // document.getElementById('menu').innerHTML += 'Paid invoices ' + allInvoices + `. <br>Sent to ` + data.vEmail + `<br> ${data.note}`
        toastMessage('Paid invoices ' + allInvoices + `. <br>Sent to ` + data.vEmail + `<br> ${data.note}`, 'menu')
    })
}

function setCheckEventListeners() {
    totalPayment = 0;
    let checks = document.querySelectorAll('.unpaidCheck')
    checks.forEach(check => {
        check.addEventListener("change", () => {

            addInvoicesForPayment()
            if (check.checked) {
                totalPayment = totalPayment + Number(check.id)
            } else {
                totalPayment = totalPayment - Number(check.id)
            }
            document.getElementById('totalInvoicePayment').innerHTML = totalPayment
        })
    })
}


function loadUnpaidInvoiceToModal(){
        totalDue = 0;
        let html = `<div class="flex flex-row">
                        <div class="text-end">
                            <h5 class="badge bg-dark fs-4">Payment: $<span class="" id="totalInvoicePayment">0</span>.00</h5>
                        </div>`;

        let modalEl = document.getElementById('addInvoicePaymentModalBody');

        unpaidInvoices.forEach(unpaid => {
            html += `<div class="border mb-1 p-2 rounded alert alert-secondary">
                  <input type="checkbox" name="${unpaid.invoiceId}" id="${unpaid.cost}" 
                        value="${unpaid.invoiceId}" 
                        class="unpaidCheck"> Invoice ${unpaid.invoiceId} - <span class="ms-3 badge bg-primary fs-6 text-light float-end">$${unpaid.cost}</span> 
                            <br> <span class="ms-3">${editDate(unpaid.fDate)}</span> - ${unpaid.fJname.slice(0,11)}<br>
            </div>`
            totalDue = totalDue + unpaid.cost;
        })
        html += `
                    <div class="border border-2 shadow p-2 mt-3 rounded">
                        <label class="w-100" for="paymentNote">Notes
                        <textarea class="w-100 border" name="paymentNote" id="paymentNote" rows="4"></textarea>
                        </label>
                    </div>`
        html += `   <div class="border border-2 shadow p-2 mt-3 rounded">
                        <h5 class="text-danger fs-4 float-end">Balance Due: $${totalDue}.00 </h5>
                        <button onclick="getInvoicesForPayment(event)" data-bs-dismiss="modal" class="btn btn-dark">Pay</button>
                    </div>`
        modalEl.innerHTML = ``;
        modalEl.innerHTML += html
        setCheckEventListeners()
}





document.addEventListener("DOMContentLoaded", () => {
    let invoiceEl = document.getElementById('invoicePayment')
    invoiceEl.innerHTML += addPaymentModal();
    getUnpaidInvoices(); 
})
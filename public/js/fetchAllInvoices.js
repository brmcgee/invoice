function fetchAllInvoices(){
    let root = document.getElementById('root');
    handleFetchAllInvoices();
    
}

async function handleFetchAllInvoices() {
    let url = `${pre}/invoices`;
    try {
        let response = await fetch(url)
        root.innerHTML = loader('info', 'Fetching invoices..');
        try {
            let data = await response.json();
            let html = `<div class="mx-auto container-md pb-5 pt-3" style="width:100%;">`;
            data.forEach( d => {
                if (d.isHide == 'false' || d.status == 'unpaid') {   html += htmlFetchAllInvoice(d) };
            });
            html += `</div>`
           root.innerHTML = html;

        } catch (parseError) {
            root.innerHTML = loader('warning', parseError)
        }

    } catch (networkError) {
        root.innerHTML = loader('danger', networkError);
    }

}

function htmlFetchAllInvoice(data){

    let html =``;
    html +=`
    <li id="invoiceCard${data.invoiceId}"class="mt-2 g-2 p-2 list-group-item d-flex justify-content-between align-items-start border border-2 border-dark shadow" style="width:auto;">
        <div class="ms-0 me-auto">
            <div class="fw-bold">${vendor[data.vendorId].name}</div>
            
        <div class="">${data.fPo} - ${data.fJname}</div>
                
             <p class="small m-0"> ${data.fAddress} <p>
             <span class="small m-0">${data.fCity}, ${data.fState} ${data.fZip}</span>
             
            <div class="form-check">
             
                <label for="isHide" class="form-check-label">
                    <img class="mb-4" src="public/assets/icons/visibilityoff.png" alt="" width="26" height="26">
                </label>
                <input type="checkbox" name="isHide" id="isHide" class="form-check-input" onclick="handleInvoiceHide(${data.invoiceId})">
                <span><img class="ms-3 ing-fluid shadow" src="${data.fImg || 'public/assets/images/placeholder.jpeg'}" width="70" height="50"></span>

            </div>
        </div>
        



        <div class="d-flex flex-column">
            <span class="badge text-dark float-end m-0 fs-6">${data.fDate.slice(0, 10)}</span>
            <div class="ms-0 mt-3">

                <button type="button" class="btn btn-light" onclick="fetchInvoiceById(${data.invoiceId})">
                        <img class="" src="public/assets/icons/contract-black.png" alt="" width="30" height="30">
                </button> 

                <span>${getPaidStatus(data.status)}</span>
            </div>
        </div>
        
    </li>

    
    `;
    return html;
}

function handleInvoiceHide(invoiceId) {
    let invoice = document.getElementById(`invoiceCard${invoiceId}`);
    invoice.remove();
   


    let url = `${pre}/hide-invoice`;
    let params = `invoiceId=${invoiceId}`
 

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
                let response = this.response;
                console.log(response)

        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);


}
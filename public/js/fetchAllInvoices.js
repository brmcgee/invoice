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
            let html = `<div class="mx-auto container-md" style="width:100%;">`;
            data.forEach( d => {
                html += htmlFetchAllInvoice(d);
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
    <li class="mt-2 g-2 pb-3 p-3 list-group-item d-flex justify-content-between align-items-start border border-dark rounded " style="width:auto;">
        <div class="ms-2 me-auto">
            <div class="fw-bold">${vendor[0].name}</div>
            
        <div class="">${data.fJname}</div>
             <p class="small m-0"> ${data.fAddress} <p>
             <span class="small m-0">${data.fCity}, ${data.fState} ${data.fZip}</span>
             
        </div>
        <div class="d-flex flex-column">
            <span class="badge text-dark float-end m-0">${data.fDate.slice(0, 10)}</span>
            <div class="ms-1 mt-3">
                
                <button type="button" class="btn btn-light" onclick="fetchInvoiceById(${data.invoiceId})">
                        <img class="" src="public/assets/icons/invoice.png" alt="" width="25" height="25">

                </button> 

                <span>${getPaidStatus(data.status)}</span>
            </div>
        </div>
    </li>
    
    `;
    return html;
}
function fetchDatabase(){
    
    handleFetchDatabase()
}


async function handleFetchDatabase() {
    
    let url = `${pre}/invoices`;
    let html = ``;
    try {
        let response = await fetch(url)
        root.innerHTML = loader('info', `Fetching database...`);
        try {
            let data = await response.json();
                let totalCost = 0;
                let unpaid = 0;
                let unpaidCost = 0;
                
                data.forEach(d => {
                                    totalCost = totalCost + d.cost;
                                    (d.status == 'unpaid' && unpaid++);
                                    if (d.status == 'unpaid' ) { 
                                         unpaidCost = unpaidCost + d.cost 
                                    }
                            })


                root.innerHTML = `${alertMessage('secondary', `<div class="">Total jobs ${data.length} <br>Unpaid ${unpaid}  <br><span class="text-black">Total Revenue $${totalCost}.00</span> 
                                        <br><span class="text-success">Paid $${totalCost - unpaidCost}.00</span><br><span class="text-danger">Balance due $${unpaidCost}.00</span></div>`)}`
                                      
                root.innerHTML += htmlHandleFetchDatabase(data);
                root.innerHTML += `<div class="pb-5"></div>`

           
    
        } catch (parseError) {
            root.innerHTML = loader('warning', parseError)
        }
    
    } catch (networkError) {
        root.innerHTML = loader('danger', networkError);
    }
}

function htmlHandleFetchDatabase(data) {

    let html = `
        <table class="table table-striped table-light">
            <thead>
                <tr>
                <th scope="col">PO</th>
                <th scope="col">Address</th>
                <th scope="col" class="">Products</th>
                <th scope="col" class="text-end">Cost</th>
                </tr>
            </thead>
            <tbody>
    `;
let count = 1;
data.forEach(d => {
    let productsToDisplay = '';
    d.products.forEach(p => {
        productsToDisplay += `<span class="small">&#8226; ${p.item}</span><br>`
    })
    html += `
                <tr>

                    <th scope="row">

                        <button type="button" style="font-size:14px;" class="btn btn-outline-secondary p-1 text-black" onclick="fetchInvoiceById(${d.invoiceId})">
                        ${d.fPo} 
                        </button>
                        <br>
                        <span>${(d.status == 'paid') ? `<span class="text-success text-uppercase small ms-3">PAID</span>`  :  `<span class="ms-3 text-danger text-uppercase small">Due</span>` }<span>
                        <br><span>${(d.isEmailed != null) ? `<span class="text-primary text-uppercase small ms-3">SENT</span>`  :  `<span class="ms-3 text-success text-uppercase small"></span>` }<span>
                    </th>
                    <td class="small">${d.fJname.slice(0,14)}<br> <span class="small">${d.fAddress} <br> ${d.fCity} <br> ${editDate(d.fDate)}</span></td>
                    <td class="small">${productsToDisplay}</td>
                    <td class="small text-end">$${d.cost}.00
                        <br><span class="small text-secondary">${d.customer[0].name.slice(0,5)}</span>
                        <br><a href="${pre}/slack/invoices_brm/${d.fPo}">invoice</a>
     
                        
                    </td>
                    
                </tr> 
    
    `
});



    html += `
            </tbody>
        </table>
    `
    return html;
}

async function fetchDatabaseBy(status, direction)  {
    let url = `${pre}/invoices-per`;
    let params = `query=${status}&&direction=${direction}`;


    root.innerHTML = loader('primary', `Fetching ${status}..`)
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        let response = this.response;

        let html = ``;
        let parseRes = (JSON.parse(response));
        parseRes.forEach(r => {
            r.customer = JSON.parse(r.fVendor)
            r.customer[0].email = r.vEmail;
            r.address2 = r.fCity + ',' + r.fState + ' ' + r.fZip;
            r.products = JSON.parse(r.fProducts)
           
            
        })
        html +=htmlHandleFetchDatabase(parseRes);
        root.innerHTML = html
    }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}

async function fetchDatabaseByKeyValue(key, value)  {
    let url = `${pre}/invoice-sort`;
    let params = `key=${key}&&value=${value}`;

    root.innerHTML = loader('primary', `Fetching ${value}..`)
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        let response = this.response;

        let html = ``;
        let parseRes = (JSON.parse(response));
        parseRes.forEach(r => {
            r.customer = JSON.parse(r.fVendor)
            r.customer[0].email = r.vEmail;
            r.address2 = r.fCity + ',' + r.fState + ' ' + r.fZip;
            r.products = JSON.parse(r.fProducts) 
            
        })
        html +=htmlHandleFetchDatabase(parseRes);
        root.innerHTML = html
    }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}
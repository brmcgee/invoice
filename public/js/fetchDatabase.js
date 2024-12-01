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
                data.forEach(d => {totalCost = totalCost + d.cost; 
                                (d.status == 'unpaid' && unpaid++)
                            })
                root.innerHTML = `${alertMessage('secondary', `Total jobs ${data.length}<br>Total Revenue ${totalCost} <br>Unpaid ${unpaid}`)}`
                
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
                <th scope="col">Status</th>
                <th scope="col">Address</th>
                <th scope="col" class="text-end">Cost</th>
                </tr>
            </thead>
            <tbody>
    `;
let count = 1;
data.forEach(d => {
    html += `
                <tr>

                    <th scope="row">
                        <span class="small text-dark" style="font-size:12px;">${count++}</span> 
                        <button type="button" style="font-size:12px;" class="btn btn-light p-1 text-primary" onclick="fetchInvoiceById(${d.invoiceId})">
                        ${d.fPo} 
                        </button>
                        
                    </th>
                    <td class="small">${d.status}</td>
                    <td class="small">${d.fJname}<br> ${d.fAddress} <br> ${d.fCity} <br> ${d.fDate.slice(0,10)}</td>
                    <td class="small text-end">$${d.cost}.00
                        <br><span class="small text-secondary">${d.customer[0].name.slice(0,10)}</span>
                        <br><a href="https://office.boxcar.site/slack/auto-brm-gener8-invoice/${d.invoiceId}">invoice</a>
     
                        
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
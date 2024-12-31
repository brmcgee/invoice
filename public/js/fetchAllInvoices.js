function fetchAllInvoices(){
    let root = document.getElementById('root');
    handleFetchAllInvoices();
    
}
function imgModal (){
    return `<div class="modal fade bg-dark" id="imgModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-centered">
                    <div class="modal-content  bg-dark border-0">
                        <div class="modal-body  m-0 p-0">
                            <div class="w-100 h-100">
                            
                                <img class="rounded-2 lazy-loading bg-light" id="imgModalBody"src="https://brmcgee.github.io/invoice/public/assets/logos/brm-logo.jpg" alt="" style="width: 100%;height: 100%;">

                            </div>
                        </div>
                        <h5 id="imgModalFooter" class="text-secondary small ms-1"></h5>

                        </div>

                </div>
            </div>`;
}

function loadImgModal(img, door, color){

    let imgElem = document.getElementById('imgModalBody')
    let footerElem = document.getElementById('imgModalFooter')
    imgElem.src = img;
    footerElem.innerHTML = door + ' ' + color

}

async function handleFetchAllInvoices() {
    
    let url = `${pre}/invoices`;

    try {
        let response = await fetch(url)
        root.innerHTML = loader('info', 'Fetching invoices..');
        try {
            let data = await response.json();
            let html = `<h5 class="my-0 py-1 text-center text-primary fs-6 alert alert-secondary">${`${editDate(new Date())} ${new Date().getHours()}:${new Date().getMinutes()}`}</h4>` 
            html += `<div class="mx-auto container-md pb-5 pt-3" style="width:100%;">`;
            data.forEach( d => {
                if (d.isHide == 'false' || d.status == 'unpaid') {   html += htmlFetchAllInvoice(d) };
            });
            html += `</div>`
           root.innerHTML = html;
           root.innerHTML += imgModal();

        } catch (parseError) {
            root.innerHTML = loader('warning', parseError)
        }

    } catch (networkError) {
        root.innerHTML = loader('danger', networkError);
    }
    // if (tk) { 

    //     let ac = JSON.parse(activeUser);
    //     let url = `${pre}/invs`;
    //     let params = `tk=${tk}`;

    //     root.innerHTML = loader('primary', 'fetchin invs')
    //     var xml = new XMLHttpRequest();
    //     xml.onreadystatechange = function(){
    //         if (this.readyState == 4 && this.status == 200) {
    //             let response = this.response;
    //             let data = JSON.parse(response)
    //             root.innerHTML = response;
    //             let html = `<div class="mx-auto container-md pb-5 pt-3" style="width:100%;">`;
    //             data.forEach( d => {
    //                 if (d.isHide == 'false' || d.status == 'unpaid') {   html += htmlFetchAllInvoice(d) };
    //             });
    //             html += `</div>`
    //         root.innerHTML = html;
    //         }
    //     }
    //     xml.open("POST", url, true);
    //     xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    //     xml.send(params);

    // } else {
    //     document.getElementById('notification').innerHTML 
    //             =  loginPrompt(); 
    // }

}

function htmlFetchAllInvoice(data){
    let today = new Date();
    let todayDay = today.getDate();

    let html =``;
    html +=`
<div class=" rounded-3 shadow mb-2" 
                style=" opacity:${(data.status == 'paid') ? '.9' : '1'};
                        background-color:${(data.status == 'paid') ? 'rgb(226, 250, 228)' : 'rgb(255, 255, 255)'};
                        background-color:${(data.status != 'paid' && todayDay == getDueDate(data.fDate).day && 'rgb(252, 228, 228)')};
                        border:3px solid ${(data.status != 'paid' && todayDay == getDueDate(data.fDate).day && 'rgb(187, 14, 14)')}">
    <li id="invoiceCard${data.invoiceId}"
        class="mx-auto p-3 px-1 list-group-item d-flex justify-content-around"style="width:auto;">

        <div class="ms-0 me-auto row">

            <div class="order-2 order-sm-1 col-12 col-sm-6">
            
                <button class="m-0 p-0 btn border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#imgModal" onclick="loadImgModal('${data.fImg}', '${data.door.toUpperCase()}', '${data.color.toUpperCase()}')" >
                    <img class="img-fluid shadow lazy-loading rounded-1 shadow" src="${getThumbnailUrl(data.fImg) || 'public/assets/images/placeholder.jpeg'}" style="width:100%;max-width:190px;">
                </button>
            </div>  

            <div class="order-1 order-sm-2 col-12 col-sm-6">
                <p class="small text-black m-0">${data.fJname} </p>
                <p class="small m-0"> ${data.fAddress} <p>
                <span class="small m-0">${data.fCity} ${data.fZip}</span><br>
                <span>${(data.status != 'paid' && todayDay == getDueDate(data.fDate).day) 
                            ? '<span class="badge text-light pt-2" style="background-color:rgb(187, 17, 17);">DUE</span>' 
                            : `<span class="small text-secondary">Due: <span>${getDueDate(data.fDate).dueDateString()}</span></span>`}
                </span>
                
            </div>

                

        </div>
        

        
        <div class="right-col d-flex flex-column justify-content-between align-items-between">

            <div class="w-100">
                <p class="float-start m-0 mb-1 fs-strong small">
                    <strong>${editDate(data.fDate)}</strong>
                </p>
                <br>
                <p class="float-start text-uppercase"> ${data.fPo} </p>
                <label for="isHide" class="form-check-label float-end">
                    <img class="img-fluid" src="public/assets/icons/visibilityoff.png" alt="" width="15" height="15">
                    <input type="checkbox" name="isHide" id="isHide" class="form-check-input" onclick="handleInvoiceHide(${data.invoiceId})" style="cursor:pointer;">
                </label>

            </div>

            <div class="w-100 m-0">

            </div>

            <div class="ms-0 mt-3 d-flex flex-row justify-content-center align-items-center">
                <div class="d-flex flex-column" >
                    <div class="ps-1"><span>${(data.isEmailed != null) ? '<span class="small badge bg-primary text-white" style="width:53px;" >SENT</span>' : '<span style="width:53px;" class="small badge bg-warning text-black">SAVED</span>' }</span></div>
                    <div class="ps-1"><span>${data.status == 'paid' ? '<span class="small badge bg-success text-white" style="width:53px;">PAID</span>' : '<span style="width:53px;" class="small badge bg-danger text-white">DUE</span>' }</span></div>
                </div>
                <button type="button" class="btn btn-transparent border-0" onclick="fetchInvoiceById(${data.invoiceId})">
                    <img class="ms-1" src="public/assets/icons/invoice-2tone.png" alt="" width="35" height="35">
                </button> 

            </div>

        </div>
        
    </li>
</div>
    

    
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
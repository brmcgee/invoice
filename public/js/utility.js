function alertMessage(type, message) {
    return `
    <div class="alert bm-alert-${type}">${message}</div>
    `;
}

function loader(type, message) {
    return `
    <div class="d-flex">
        <div class="spinner-border text-${type} mx-auto mt-2" role="status">
            <span class="sr-only "></span>
        </div>
    </div>
    <h5 class="text-${type} text-center">${message} </h5>
    `
}

function viewBtn(){
    return `
        <button type="button" class="btn btn-light">
            <img class="" src="public/assets/icons/file-open-black.png" alt="" width="25">
        </button> 
    
    `;
}
function invoiceBtn(){
    return `
       
            <img class="" src="public/assets/icons/invoice.png" alt="" width="30" height="30">
       
    
    `;
}
function paidBtn(){
    return `
        <button type="button" class="btn btn-light">
            <img class="" src="public/assets/icons/paid-green.png" alt="" width="30" height="30">
        </button> 
    
    `;
}
function dueBtn(){
    return `
        <button type="button" class="btn btn-light">
            <img class="" src="public/assets/icons/payment-due.png" alt="" width="30" height="30">
        </button> 
    
    `;
}

function getPaidStatus(status){

    if (status == 'unpaid') {
        return ` ${dueBtn()}`;
    } 
    if (status == 'paid') {
        return ` ${paidBtn()}`;
    }
}

function invoiceBtn(){
    return `
        <button type="button" class="btn btn-light">
            <img class="" src="public/assets/icons/invoice.png" alt="" width="25" height="25">
        </button> 
    
    `;
}
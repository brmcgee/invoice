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
            <img class="" src="public/assets/icons/file-open-black.png" alt="" width="28">
        </button> 
    
    `;
}

function getPaidStatus(status){
    
    if (status == 'paid') {
        return ` <img class="img-fluid me-1" src="public/assets/icons/paid-green.png"
                     alt="" width="40" height="40">
               `;
    } else {
        return ` <img class="img-fluid" src="public/assets/icons/payment-due.jpg"
                     alt="" width="55" height="55">
               `;
    }
}
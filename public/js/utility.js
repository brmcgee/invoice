var elem = document.getElementById("appIt");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}


function toastMessage(message, target){
    let d = new Date();
    let date = ((d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear());
    let hour = d.getHours();
    let ap = 'AM'; 
    let fHour;
    if (hour > 12) { fHour = hour - 12; ap = 'PM'  } else { fHour = hour; ap = 'AM'}

    let edittedTime = `${fHour}:${d.getMinutes().toFixed(2)}${ap}`;
    let html = `
    
        <div class="toast-container top-50 start-50 translate-middle bg-light rounded mt-1">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="favico.ico" class="rounded me-2" alt="BM" width="40">
                <strong class="me-auto">BRM</strong>
                <small>${date} @ ${edittedTime}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
        </div> 
    
    `;

    document.getElementById(target).innerHTML += html;
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}

function generate(elementToPdf) {
    var doc = new jsPDF();
    doc.fromHTML(document.querySelector(elementToPdf), 15, 15, {
      'width': 670,
      'elementHandlers': function() {
        return true;
      }
    });
    doc.save('test.pdf');
  }

function alertMessage(type, message) {
    return `
    <div class="alert alert-${type}">${message}</div>
    `
    
    
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

    if (da == 0) { actualDay = 'Sun'; due = due + 5}
    if (da == 1) { actualDay = 'Mon'; due = due + 4 + 7}
    if (da == 2) { actualDay = 'Tue'; due = due + 3 + 7 }
    if (da == 3) { actualDay = 'Wen'; due = due + 2 + 7}
    if (da == 4) { actualDay = 'Thur'; due = due + 1 + 7}
    if (da == 5) { actualDay = 'Fri'; due = due + 7}
    if (da == 6) { actualDay = 'Sat'; due = due + 6}
    let dDue = due;
    if (due > daysInMonth) {
        if (month == 12) {
            getDaysInMonth(1)
            dueDate.month = 1
            dueDate.year = year + 1
        } else {
            getDaysInMonth(month + 1);
            dueDate.month = month + 1
           
        }
        due = (due - (getDaysInMonth(month)));
    } else if (dueDate.month == '') {
        dueDate.month = month;
        dueDate.year = year; 
    }


    
    dueDate.day = due;
   return(dueDate)

}
function editDate(ts){

    const date = new Date(ts);
    let day = date.getDate(ts);let month = date.getMonth(ts) + 1;let year = date.getFullYear(ts);let da = date.getDay(ts);let actualDay = '';
    if (da == 0) { actualDay = 'Sun'}
    if (da == 1) { actualDay = 'Mon'}
    if (da == 2) { actualDay = 'Tue'}
    if (da == 3) { actualDay = 'Wen'}
    if (da == 4) { actualDay = 'Thur'}
    if (da == 5) { actualDay = 'Fri'}
    if (da == 6) { actualDay = 'Sat'}
    let formattedDate = `${actualDay} ${month}/${day}/${year}  `

    return formattedDate;
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
        // return `<span class="badge bg-danger text-light">DUE</span>`
    } 
    if (status == 'paid') {
        return ` ${paidBtn()}`;
        // return `<span class="badge bg-success text-light">PAID</span>`
    }
}

function invoiceBtn(){
    return `
        <button type="button" class="btn btn-light">
            <img class="" src="public/assets/icons/invoice.png" alt="" width="25" height="25">
        </button> 
    
    `;
}

function loginPrompt(){
    let html = 
    `    <div class="alert alert-danger py-1 px-1 mt-1" role="alert">
                <button class="btn btn-warning btn-sm py-0" data-bs-toggle="modal" data-bs-target="#loginModal" type="button">
                 <img src="public/assets/icons/passkey-black.png" alt="add" width="28" height="28" >
            </button>
        </div>
    `; 
    return html;
}



  

function addNewCustomer() {
    let company = document.getElementById('company');
    let cPhone = document.getElementById('cPhone');
    let cAddress = document.getElementById('cAddress');
    let cCity = document.getElementById('cCity');
    let cState = document.getElementById('cState');
    let cZip = document.getElementById('cZip');
    let cEmail = document.getElementById('cEmail');
    let cAttn = document.getElementById('cAttn');

    let params = `company=${company.value}&&phone=${cPhone.value}&&address=${cAddress.value}&&city=${cCity.value}&&state=${cState.value}&&zip=${cZip.value}&&email=${cEmail.value}&&attn=${cAttn.value}`;
    let url = `${pre}/add-customer`;

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            let response = this.response;
            if (response) {
                alert('Added customer')
                fetchCustomersDb()
                fetchCustomerList();
            };
        
        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);

    company.value='';cPhone.value='';cAddress.value='';cCity.value='';cState.value='';cEmail.value='';cAttn.value='';
}
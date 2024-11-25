function saveJob(){


    handleSaveBlog();
}

async function handleSaveBlog() {
    let el = document.getElementById('dbHtml').value;
    let value = (el.slice(0, el.length-1)) + ']';
    document.getElementById('dbHtml').value = value;

    let url = `${pre}/add-invoice`;
    let fJname = document.getElementById('jName')
    let fAddress = document.getElementById('jAddress');
    let fCity = document.getElementById('jCity');
    let fState = document.getElementById('jState');
    let fZip = document.getElementById('jZip')
    let fPo = document.getElementById('po');
    let fDate = document.getElementById('jDate');
    let vendorId = document.getElementById('vendor');
    let cost = Number(document.getElementById('totalCost').innerHTML);

    let params = `cost=${cost}&&vendorId=${vendorId.value}&&fJname=${fJname.value}&&fAddress=${fAddress.value}&&fCity=${fCity.value}&&fState=${fState.value}&&fZip=${fZip.value}
            &&fPo=${fPo.value}&&fDate=${fDate.value}&&fVendor=${JSON.stringify(activeVendor)}&&fProducts=${JSON.stringify(productList)}`;

    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            (this.responseText == 'true') ? root.innerHTML = alertMessage('success', 'Successfully added invoice') : root.innerHTML = alertMessage('danger', 'Error adding invoice, try again')
        }
    }
    xml.open("POST", url, true);
    xml.setRequestHeader("Content-type", 'application/x-www-form-urlencoded')
    xml.send(params);
}
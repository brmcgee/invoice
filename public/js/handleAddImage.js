function handleAddImage(e, formId, invoiceId) {
    
    let url = `${pre}/upload-invoice`; 

      
    e.preventDefault(); 
    var data = new FormData(document.getElementById('invoiceForm'));  
    var xmlhttp = new XMLHttpRequest();
    document.getElementById('imgLoading').innerHTML = loader('primary', 'Uploading image now..')
    xmlhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
               
                let d = this.response;
                let respond = JSON.parse(d);

                document.getElementById('invoiceUploadImg').src = respond.url;
                 document.getElementById('imgLoading').innerHTML = '';
            
            }
      };
      
      xmlhttp.open("POST", url, true);
      xmlhttp.send(data);

    
}
const quoteForm = document.getElementById('quote-form')
const name = document.getElementById('name');
const email = document.getElementById('email');
const address = document.getElementById('address');
const telephone = document.getElementById('telephone');
const selectTag = document.querySelector('#quote-type');
let message = document.getElementById('message');
const submitBtn = document.querySelector('#submitButton');
const paypalContainer = document.querySelector('#paypal-button-container');

// Show Paypal buttons as premium quote is default selection
submitBtn.style.display = 'none';
paypalContainer.style.display = 'block';

selectTag.addEventListener('change', ()=>{
    if(selectTag.value == 'premium'){
        submitBtn.style.display = 'none';
        paypalContainer.style.display = 'block';
    }else{
        submitBtn.style.display = 'block';
        paypalContainer.style.display = 'none';
    }
})

quoteForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(checkFormNotComplete()){
        alert('Please complete all fields in the form.')
        return false
    }
    sendQuote()
})

function sendQuote(){
    let attachments = [];
    pond.getFiles().forEach(file => {
        let fileObj = {
            fileName: file.file.name,
            content: file.getFileEncodeBase64String(),
            encoding: 'base64'
        }
        attachments.push(fileObj);
        console.log(attachments);
    })

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/quote');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        alert('Thank you. Your request has been received.')
        location.reload()
    };
    xhr.send(JSON.stringify(
        {
            fullName: name.value,
            emailAddress: email.value,
            homeAddress: address.value,
            phone: telephone.value,
            quoteType: selectTag.value,
            message: message.value,
            filePond: attachments

        }
    ));
}

function checkFormNotComplete(){
    if(name.value == '' || email.value == '' || telephone.value == '' || address.value == ''){
        return true;
    }
    return false;
}

   
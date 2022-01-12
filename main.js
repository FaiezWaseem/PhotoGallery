function fileUpload(){
   const url = "https://v-point.000webhostapp.com/test/AnonFileUpload/api/" ;
const form = document.querySelector('form');
 form.addEventListener('submit', e => {
e.preventDefault();

const files = document.querySelector('[type=file]').files;
const formData = new FormData();

for (let i = 0; i < files.length; i++) {
   let file = files[i];

   formData.append('files[]', file);
}
fetch(url, {
   method: 'POST',
   body: formData
}).then(response => {
   return response.text();
}).then(data => {
   let j = JSON.parse(data);
    
    fetch("https://v-point.000webhostapp.com/test/photo/create.php?link="+j.data).then(response => {
        return response.text()}).then(res =>{alert("Image Uploaded \n Refresh Page to See changes")}).catch(err => {alert("Database : "+err)})

}).catch((err)=>{alert("File Uploading Error "+ JSON.stringify(err))})
});

}
function getFiles(){
   var container = document.querySelector('.row');
  
   fetch("https://v-point.000webhostapp.com/test/photo/get.php").then(response => {
      return response.text();
   }).then(data => {
      let x = JSON.parse(data);
      let arr = x.data.body;
      for(let i = 0; i < arr.length ; i++){
         fetchDownloadLink(arr[i].url , arr[i].id);
         container.innerHTML += `
         <div class="col-sm-4">
         <div class="card m-2">
          <img src="${arr[i].url}" id="${arr[i].id}" alt="" class="card-img-top" height="200px">
          <div class="card-footer">
           <small class="text-muted"> Date : ${arr[i].reg_date}
           <a href="${arr[i].url}"  class="btn btn-danger"> Download </a>
           </small>
          </div>
         </div>
        </div>
         ` 
      }
      
   })
}
async function fetchDownloadLink(url , id){

  await fetch("https://v-point.000webhostapp.com/test/AnonFileUpload/api/anonDirectDownloadLink.php?link="+url)
   .then(data=>{ return data.json()})
   .then(data=>{
  document.getElementById(id).src = data.data;
   })   
}

fileUpload();
getFiles();




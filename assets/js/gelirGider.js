let modal = document.querySelector("#modal");

let gelirGiderList = [];
let id =0;

if(localStorage.gelirGiderList) {
  gelirGiderList = JSON.parse(localStorage.gelirGiderList);
  render();
}
if(localStorage.id){

  id=Number(localStorage.id);

}

function generateId() {

  id++;
  localStorage.id = id;
  return id;

}

AddGelirGiderBtn.addEventListener("click",() => {
  modal.classList.remove('editModal');
  document.querySelector('input[name="id"]').value = "";
  modal.showModal()
});



function handleSubmitForm() {

  let formData = new FormData(gelirGiderForm);
  let formObj = Object.fromEntries(formData);
  gelirGiderForm.reset();
  
  if(formObj.id !== "") { // güncelle
  let gelirGider = gelirGiderList.find( x => x.id === Number(formObj.id));
  
  gelirGider.gelir = formObj.gelir;
  gelirGider.gider = formObj.gider;
  gelirGider.expenseList = formObj.expenseList;
  
  
  
  } else { // yeni ekle
  
    formObj.id=generateId();
    gelirGiderList.push(formObj);
  
  }
  
  save();
  render();
  modal.close();
  
  }

  gelirGiderForm.addEventListener("submit",handleSubmitForm);


  function save() {
    localStorage.gelirGiderList = JSON.stringify(gelirGiderList);
  }

  function createAdressHtml(gelirGider) {


    // let gelirToplam = 0;
    // let giderToplam = 0;
  
  
    // for (let i = 0; i < gelirGiderList.length; i++) {
  
    //   gelirToplam +=Number(gelir);

    // }
  
    // for (let i = 0; i < gelirGiderList.length; i++) {
  
    //   giderToplam += Number(gider);
  
    // }
  
    // let sonuc = gelir - gider;
   

    return `<div class="gelirGider">
          <div class="gelirGiderEditControls">
            <a class="gelirGiderEditBtn" href="#"  data-gelirgiderid="${gelirGider.id}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></a>
            <a class="gelirGiderDeleteBtn" href="#" data-gelirgiderid="${gelirGider.id}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></a>
          </div>
           <p>Gelir Tutarınız: ${gelirGider.gelir}</p>
           <p>Gider Tutarınız : ${gelirGider.gider}</p>
           <p>Sonuç : ${(gelirGider.gelir)-(gelirGider.gider)}</p>
        </div>`;
  
  }




function handleDeleteBtn(e){
  e.preventDefault();


  if(!confirm("emin misin")) {
    return;
  }


  gelirGiderList = gelirGiderList.filter(x => x.id !== Number(this.dataset.gelirgiderid));
  
  save();
  render();

}



function handleEditBtn(e) {
  e.preventDefault();

  modal.classList.add("editModal");

 let gelirGiderId =  Number(this.dataset.gelirgiderid);

 let gelirGider = gelirGiderList.find(x => x.id === gelirGiderId);

 document.querySelector('input[name="id"]').value = gelirGider.id;
 document.querySelector('input[name="gelir"]').value = gelirGider.gelir;
 document.querySelector('input[name="gider"]').value = gelirGider.gider;
  modal.showModal();
}



function render() {

  gelirGiderContainer.innerHTML = gelirGiderList.map(x => createAdressHtml(x)).join('');

  document.querySelectorAll('.gelirGiderDeleteBtn')
  .forEach(x => x.addEventListener("click", handleDeleteBtn));
  document.querySelectorAll('.gelirGiderEditBtn')
  .forEach(x => x.addEventListener('click', handleEditBtn));
}

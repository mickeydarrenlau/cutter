const input = document.querySelector("#url_input");
const btn = document.querySelector("#url_btn");
// const btn_copy=document.querySelector("#url_copy");
// const btn_new=document.querySelector("#url_new");
const form = btn.closest("form");
const myCutter = "http://misterpaps.me/cutter/v/#";
const body =document.querySelector("body");
function getRandomId() {
  return (
    Math.random().toString(32).substring(2, 6) +
    Math.random().toString(32).substring(2, 6)
  );
}
 
function getUrl(e) {
  let url = input.value;
  let regexp=/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  if (regexp.test(url)) {
      input.classList.remove("error");
    return url;
  } else {
      input.classList.add("error");
     input.placeholder="Invalid URL";
     input.value=input.value;
    return false
  }
}

function run(e) {
  e.preventDefault();
  let url = getUrl();
  if(!url){
      return
      console.log("re")
  }
  let ids = getRandomId();
  sendData(url, ids);
}

function sendData(url, id) {
    let request = new XMLHttpRequest();
    request.open("POST", "https://jsonbox.io/box_e095644c681d08a9e207");
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    let data = {
      url: url,
      id: id,
    };
    request.send(JSON.stringify(data));
  changeUi(id);
}
btn.addEventListener("click", run);


function changeUi(id) {
    const shortulr=myCutter + id;
  input.value = shortulr;
  input.style.fontWeight="600";
  form.removeChild(btn);

  let tempBtn_copy = btn.cloneNode(true);
  tempBtn_copy.id = "url_copy";
  tempBtn_copy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z"/>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
</svg>`;
  form.appendChild(tempBtn_copy);

  let tempBtn_new = btn.cloneNode(true);
  tempBtn_new.id = "url_new";
  tempBtn_new.textContent = "New";
  form.appendChild(tempBtn_new);
  tempBtn_copy.addEventListener("click", (e)=>{
      e.preventDefault();
      body.className="slideAnimation";
      setTimeout(() => {
        body.className="";
      }, 1500);
      copy(shortulr);
  })
  tempBtn_new.addEventListener("click", (e,shortulr)=>{
      e.preventDefault();
      input.value="";
      form.removeChild(tempBtn_copy);
      form.removeChild(tempBtn_new);
      form.appendChild(btn);
  });
}
function copy(url_copy) {
    let a = document.createElement("input");
    a.value=url_copy;
    body.appendChild(a);
    a.select();
    document.execCommand("copy");
    body.removeChild(a);   
}


endpoint = "https://jsonbox.io/box_e095644c681d08a9e207";

function getUrl(ed) {
  fetch(ed, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {console.log(res) 
       redirecter(res)
    }
    )
}
function getPahtId (){
    let path = window.location.pathname;
    path= new URL("http://henriquechigumane.github.io/cutter/v/djaf0a9h");
    if(path=="/"){
        return "";
    }
    return path.pathname.split("/")[3];
}
const pathId= getPahtId();
getUrl(endpoint+"/?q=id:"+pathId);

function redirecter(longURL) {
    if (longURL.length>=1) {
        window.location.href=longURL[0].url;
     }
     else{
         window.location.href="https://misterpaps.me/404"
     }
     
}

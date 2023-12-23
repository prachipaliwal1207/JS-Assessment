function saveFile(){
    const inputVal = document.getElementsByClassName("inputText");
    let fileSet = [];
     Array.from(inputVal).forEach((el, index) => {
         fileSet.push({
             fileName: el.dataset.file,
             fileContent: el.value
         })
         document.getElementById("textContainer").innerHTML += "<p class='bg"+index+"'>"+ el.value +"</p>";
     });
     // textContainer
     let xhr = new XMLHttpRequest();
     let url = "http://localhost:3000/saveFile";
     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             const json = JSON.parse(xhr.responseText);
             if(json.status == "success"){
                 Swal.fire({
                     title: "Files Saved!",
                     icon: "success"
                 }).then( () => {
                 });

             }
         }else {
             console.error("Error: " + xhr.status);
         }
     };
     xhr.send(JSON.stringify(fileSet));
     
 }

 function concatFiles(){
     let xhr = new XMLHttpRequest();
     const url = "http://localhost:3000/combineFiles";
     xhr.open("GET", url, true);
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             let json = JSON.parse(xhr.responseText);
             if(json.status == "success"){
                 Swal.fire({
                     title: "Files Concated!",
                     text: "Files are combined and saved to concatenated.txt",
                     icon: "success"
                 }).then( () => {
                     console.log(json.data)
                 });

             }
         }
     };
     xhr.send();
 }
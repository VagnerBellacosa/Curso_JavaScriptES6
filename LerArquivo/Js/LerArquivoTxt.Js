// Ler arquivo	
// Output arquivo em caixa box 

        window.onload = function () {
            //Check the support for the File API support
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var fileSelected = document.getElementById('txtfiletoread');
                fileSelected.addEventListener('change', function (e) {
                    //Set the extension for the file
                    var fileExtension = /text.*/;
                    //Get the file object
                    var fileTobeRead = fileSelected.files[0];
                    //Check of the extension match
                    if (fileTobeRead.type.match(fileExtension)) {
                        //Initialize the FileReader object to read the 2file
                        var fileReader = new FileReader();
                        fileReader.onload = function (e) {
                            var fileContents = document.getElementById('filecontents');
                            fileContents.innerText = fileReader.result;
                        }
                        fileReader.readAsText(fileTobeRead);
                    }
                    else {
                        alert("Por favor selecione arquivo texto");
                    }

                }, false);
            }
            else {
                alert("Arquivo(s) não suportado(s)");
            }
        }

    
var fs = require('fs');
var path = require("path")
var unzipper = require('unzipper');
var AdmZip = require('adm-zip');


exports.unzip = (path,destination)=>{

  /* Gave problems for be async :(  */
    // fs.createReadStream(path)
  //   .pipe(unzipper.Extract({ path: destination}));

  var unziped = new AdmZip(path);
  unziped.extractAllTo(destination,false);
  //fs.unlinkSync(path);

}
/*
exports.zip =(path)=>{
  var zip = new AdmZip();
	zip.addLocalFile(path);

}
*/

exports.myzip =(pathtoaip) =>{
var z = new AdmZip();
z.addLocalFolder(pathtoaip);
z.writeZip(pathtoaip +".zip");

console.log("CRIEI O ZIP ...");
}


exports.moveandclean = (currentPath, newPath)=> {

var splitSIP = currentPath.split("SIP");
var sipDIR = splitSIP[0]+"SIP";
var dirName = splitSIP[1];
 
if (!fs.existsSync(newPath)){
  fs.mkdirSync(newPath);
}

  try {
      fs.renameSync(currentPath, newPath+dirName)
      console.log("Successfully moved the file!")
  } 
  catch(err) {
    throw err
  }


/* Tratamento da limpeza dos ficheiros na diretoria SIP */

fs.readdir(sipDIR, (err, files) => {
  if (err)
      throw err;

  for (const file of files) {
      var filepath = path.join(sipDIR, file);
      if (fs.lstatSync(filepath).isDirectory()) {
          fs.rmdirSync(filepath, { recursive: true });
      }

      else {
          fs.unlink(filepath, err => {
              if (err)
                  throw err;
          })
      }


  }
});


}
/*
const directory = '/Users/etiennecosta/Documents/CleanDirectories/dir';

*/
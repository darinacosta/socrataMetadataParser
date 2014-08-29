function getJSONCatalog(){
  var url = 'https://data.nola.gov/api/dcat.json';
  var json = UrlFetchApp.fetch(url);
  metaset = JSON.parse(json);
  return metaset;
}

function getMetadata(url) {
  Utilities.sleep(1000);
  var json = UrlFetchApp.fetch(url);
  metadata = JSON.parse(json);
  return metadata;
}

function populateMeta(){
  
  var metaset = getJSONCatalog();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var rows = sheet.getDataRange();
  var row =  2

  for (var entry=1; entry <= metaset.length; entry++) {
    
    var metadata = getMetadata(metaset[entry].webService);
    var dataFormat = metaset[entry].format;

    var metaCol = "D" + row;
    var descripCol = "E" + row;
    var sourceCol = "F" + row;
    var attrCol = "G" + row;
    var typeCol = "J" + row
        
    var attribution = metadata.attribution;
    var description = metadata.description;
    
    if (metadata['metadata']['custom_fields'] !== undefined){
      var source = metadata['metadata']['custom_fields']['Source Information']['Source Department'];
    } else {
      var source = "undefined"
    }
    
    sheet.getRange(descripCol).setValue(description);
    sheet.getRange(sourceCol).setValue(source);
    sheet.getRange(attrCol).setValue(attribution);
    sheet.getRange(typeCol).setValue(dataFormat);
  }

  row = row + 1;
  
}
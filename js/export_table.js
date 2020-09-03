
var sheet={
        name: 'SorteioComSheet',
        sheet_name: 'SorteioComSheet',
        file: 'tabela-sorteio.xlsx',
        author: "SorteioCom company",
}

function export_sheet(){

    console.log('exporting')

    var wb = XLSX.utils.table_to_book(document.getElementById('table'),{sheet:sheet.sheet_name});
    wb.Props = {
            Title: sheet.name,
            Author: sheet.author,
            //CreatedDate: new Date(2017,12,19)
    }/*;var wscols = [
        {wch:100},
        {wch:7},
        {wch:140},
        {wch:20}
    ];
    wb['!cols'] = wscols;*/

    var wbout = XLSX.write(wb, {bookType:'xlsx',bookSST:true,  type: 'binary'});
    function s2ab(s) {

            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
            
    }
    /*document.querySelector(".btexcel").onclick=function(){
        console.log('CLICKED')
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), sheet.file);
    };*/
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), sheet.file);

}
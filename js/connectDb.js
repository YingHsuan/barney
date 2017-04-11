var sql = require('mssql');
// var excel = require('node-excel-export');
var Zip = require('node-zip');
var fs = require('fs');
var nodemailer = require('nodemailer');
var cmd = require('node-cmd');
var excel = require('exceljs');

// award list
var list = new Array
list[0] = require('../const/TGL1051222005.js');
list[1] = require('../const/TGL1051222001.js');

var resultList = new Array
var connection_stage = new sql.Connection({
    user: 'LS',
    password: 'pks@ls88',
    server: 'lsbackup.cloudapp.net',
    database: 'LS',
});

var connection_prod = new sql.Connection({
    user: 'Ls',
    password: 'ls@pks2013',
    server: 'sql.pks.com.tw',
    database: 'LS',
});
// 指定db
var targetConnect = connection_stage;

function mailTo() {
    //set mail sender
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ada.lin@leishan.com.tw',
            pass: 'sheldon313',
        },
    });

    // mail from, to, subject, content, attachment
    const mailOption = {
        from: 'ada.lin@leishan.com.tw',
        to: 'wish7912@gmail.com',
        subject: '獎金匯報',
        text: 'Dear all, 今日獎金達成進度如附件，謝謝。',
        attachments: [
            {
                contentType: 'application/zip',
                // content: new Buffer('final.zip', 'aes-256-ctr'),
                // content: fs.createReadStream('final.zip'),
                // content: "total.zip",
                path: './report.zip',
            },
        ],
    };

    // send mail
    transporter.sendMail(mailOption, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Msg %s sent: %s', info.messageId, info.response);
    });
}

// export to excel and zip
function exportToExcel() {
    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet('獎勵制度與結果');
    worksheet.columns = [
        { header: '保險公司' },
        { header: '代碼' },
        { header: '獎勵開始日期'},
        { header: '獎勵結束日期'},
        { header: '獎勵商品代碼'},
        { header: '獎勵條件'},
        { header: '獎勵內容結果'},
        { header: '對象'},
        { header: '目前結果'},
        { header: '進度'},
        { header: '差額'},
    ];
    var currentRow = 2;
    for (i=0; i< list.length; i++) {
        var nRows = list[i].award.length;
        var targetRow = currentRow + nRows -1;

        var result = null;
        var countValue = null;
        // result = getDataset(list[i].query);
        result = resultList[i].result;
        countValue = resultList[i].countValue;

        var row = worksheet.getRow(currentRow);
        worksheet.mergeCells("A"+currentRow+":A"+targetRow);
        worksheet.mergeCells("B"+currentRow+":B"+targetRow);
        worksheet.mergeCells("C"+currentRow+":C"+targetRow);
        worksheet.mergeCells("D"+currentRow+":D"+targetRow);
        worksheet.mergeCells("E"+currentRow+":E"+targetRow);
        worksheet.mergeCells("H"+currentRow+":H"+targetRow);
        worksheet.mergeCells("I"+currentRow+":I"+targetRow);
        row.getCell(1).value = list[i].providerName;
        row.getCell(2).value = list[i].code;
        row.getCell(3).value = list[i].beginDate;
        row.getCell(4).value = list[i].endDate;
        row.getCell(5).value = list[i].productCode;
        row.getCell(8).value = list[i].target;
        row.getCell(9).value = result;
        for (k=0; k<list[i].award.length; k++) {
            var row = worksheet.getRow(currentRow);
            row.getCell(6).value = list[i].award[k].name;
            row.getCell(7).value = list[i].award[k].resultDesc;
            if (result >= list[i].award[k].value) {
                row.getCell(10).value = "V";
            } else {
                row.getCell(11).value = list[i].award[k].value-result;
            }
            currentRow += 1;
        }
    }
    workbook.xlsx.writeFile('report.xlsx')
        .then( function() {
            // cmd.run('zip --password ls999 report.zip report.xlsx');
            // mailTo();
        });
}
targetConnect.connect();

// 連線
function getDataset() {
    var transaction = new sql.Transaction(targetConnect);
    transaction.begin(function(err) {
        var request = new sql.Request(transaction);
        for (i=0; i< list.length; i++) {
            request.query(list[i].query, function(err, recordset) {
                console.log('a: ',recordset);
                // return recordset;
                resultList.push(recordset[0]);
                if (resultList.length == list.length) {
                    exportToExcel();
                }
            });
        };
    })
}
getDataset();

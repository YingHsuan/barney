var sql = require('mssql');
// var excel = require('node-excel-export');
var Zip = require('node-zip');
var fs = require('fs');
var nodemailer = require('nodemailer');
var excel = require('exceljs');
var config = require('../config.js');
var helper = require('./helper.js');

// award list
var list = new Array
list[0] = require('../const/TGL1051222005.js');
list[1] = require('../const/TGL1051222001.js');
list[2] = require('../const/SK1060000008.js');
list[3] = require('../const/FG106034.js');
list[4] = require('../const/FG106061.js');
list[5] = require('../const/FG106022.js');
list[6] = require('../const/AIA1060026.js');
list[7] = require('../const/FB10601009.js');
list[8] = require('../const/FB10601010.js');
list[9] = require('../const/ACE106000711.js');
list[10] = require('../const/ACE106000712.js');
list[11] = require('../const/ACE106000713.js');

var resultList = new Array
var targetConnect = new sql.Connection(config.db.local);

function mailTo() {
    //set mail sender
    const transporter = nodemailer.createTransport(config.mail.sender);

    // mail from, to, subject, content, attachment
    const mailOption = {
        from: config.mail.sender.auth.user,
        to: config.mail.receiver,
        cc: config.mail.cc,
        subject: config.mail.subject,
        text: config.mail.text,
        html: config.mail.html,
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
        process.exit(1); // go back to command line
    });
}

// export to excel and zip
function exportToExcel() {
    var workbook = new excel.Workbook();
    var worksheet = workbook.addWorksheet('獎勵制度與結果');
    worksheet.columns = [
        { header: '保險公司', width: 10},
        // { header: '代碼' },
        // 受理
        { header: '目前結果(受理)', width: 20},
        { header: '進度', width: 5},
        { header: '可獲獎勵', width: 20},
        { header: '差額', width: 20},
        // 核實
        { header: '目前結果(核實)', width: 20},
        { header: '進度', width: 5},
        { header: '可獲獎勵', width: 20},
        { header: '差額', width: 20},
        // detail
        { header: '對象', width: 7},
        { header: '獎勵條件', width: 30},
        { header: '獎勵內容結果', width: 20},
        { header: '獎勵開始日期', width: 15},
        { header: '獎勵結束日期', width: 15},
        { header: '獎勵商品代碼', width: 50},
    ];
    // worksheet.getCell('A1').fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     bgColor: { argb: 'FF00FF00'}
    // };
    // worksheet.getCell('B2').fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     bgColor: { rgb: '#DDDDDD' }
    // };
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('G1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('H1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('I1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('J1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('K1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('L1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('M1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('N1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('O1').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(2).numFmt = '#,##0.00';
    worksheet.getColumn(4).numFmt = '#,##0.00';
    worksheet.getColumn(5).numFmt = '#,##0.00';
    worksheet.getColumn(6).numFmt = '#,##0.00';
    worksheet.getColumn(8).numFmt = '#,##0.00';
    worksheet.getColumn(9).numFmt = '#,##0.00';
    var currentRow = 2;
    for (i=0; i< list.length; i++) {
        var nRows = list[i].award.length;
        var targetRow = currentRow + nRows -1;

        var result = null;
        var countValue = null;

        result_receive = resultList[2*i].result;
        countValue_receive = resultList[2*i].countValue;

        result_feat = resultList[2*i+1].result;
        countValue_feat = resultList[2*i+1].countValue;

        var row = worksheet.getRow(currentRow);
        worksheet.mergeCells("A"+currentRow+":A"+targetRow);
        worksheet.mergeCells("B"+currentRow+":B"+targetRow);
        worksheet.mergeCells("F"+currentRow+":F"+targetRow);
        worksheet.mergeCells("J"+currentRow+":J"+targetRow);
        worksheet.mergeCells("M"+currentRow+":M"+targetRow);
        worksheet.mergeCells("N"+currentRow+":N"+targetRow);
        worksheet.mergeCells("O"+currentRow+":O"+targetRow);
        row.getCell(1).value = list[i].providerName;
        row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell(2).value = result_receive;
        row.getCell(2).alignment = { vertical: 'middle', horizontal: 'right' };
        row.getCell(6).value = result_feat;
        row.getCell(6).alignment = { vertical: 'middle', horizontal: 'right' };
        // detail
        row.getCell(10).value = list[i].target;
        row.getCell(10).alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell(13).value = list[i].beginDate;
        row.getCell(13).alignment = { vertical: 'middle', horizontal: 'center' };
        row.getCell(14).value = list[i].endDate;
        row.getCell(14).alignment = { vertical: 'middle', horizontal: 'center' };
        // row.getCell(15).value = list[i].code;
        row.getCell(15).value = list[i].productCode;
        row.getCell(15).alignment = { vertical: 'middle', horizontal: 'center' };

        for (k=0; k<list[i].award.length; k++) {
            var row = worksheet.getRow(currentRow);
            row.getCell(11).value = list[i].award[k].name;
            row.getCell(11).alignment = { vertical: 'middle', horizontal: 'center' };
            row.getCell(12).value = list[i].award[k].resultDesc;
            row.getCell(12).alignment = { vertical: 'middle', horizontal: 'center' };
            // 受理
            if (result_receive >= list[i].award[k].value) {
                if (k < list[i].award.length-1) {
                    if (result_receive < list[i].award[k+1].value) {
                        row.getCell(3).value = "V";
                        row.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' };
                        row.getCell(4).value = countValue_receive*list[i].award[k].resultP;
                        row.getCell(4).alignment = { vertical: 'middle', horizontal: 'right' };
                    }
                } else {
                    row.getCell(3).value = "V";
                    row.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' };
                    row.getCell(4).value = countValue_receive*list[i].award[k].resultP;
                    row.getCell(4).alignment = { vertical: 'middle', horizontal: 'right' };
                }
            } else {
                row.getCell(5).value = list[i].award[k].value-result_receive;
                row.getCell(5).alignment = { vertical: 'middle', horizontal: 'right' };
            }

            // 核實
            if (result_feat >= list[i].award[k].value) {
                if(k < list[i].award.length -1) {
                    if (result_feat < list[i].award[k+1].value) {
                        row.getCell(7).value = "V";
                        row.getCell(7).alignment = { vertical: 'middle', horizontal: 'center' };
                        row.getCell(8).value = countValue_feat*list[i].award[k].resultP;
                        row.getCell(8).alignment = { vertical: 'middle', horizontal: 'right' };
                    }
                } else {
                    row.getCell(7).value = "V";
                    row.getCell(7).alignment = { vertical: 'middle', horizontal: 'center' };
                    row.getCell(8).value = countValue_feat*list[i].award[k].resultP;
                    row.getCell(8).alignment = { vertical: 'middle', horizontal: 'right' };
                }
            } else {
                row.getCell(9).value = list[i].award[k].value-result_feat;
                row.getCell(9).alignment = { vertical: 'middle', horizontal: 'right' };
            }
            currentRow += 1;
        }
    }
    workbook.xlsx.writeFile('report.xlsx')
        .then( function() {
            console.log('file exported.');
            helper.zipFileWithPass();
            mailTo();
        });
}
targetConnect.connect();

// 連線
function getDataset() {
    var transaction = new sql.Transaction(targetConnect);
    transaction.begin(function(err) {
        var request = new sql.Request(transaction);
        for (i=0; i< list.length; i++) {
            request.query(list[i].query.receive, function(err, recordset) {
                if (err != undefined) {
                    console.log('err: ', err);
                }
                console.log('receive: ',recordset);
                // return recordset;
                resultList.push(recordset[0]);
            });
            request.query(list[i].query.feat, function(err, recordset) {
                if (err != undefined) {
                    console.log('err: ', err);
                }
                console.log('feat: ',recordset);
                resultList.push(recordset[0]);
                if (resultList.length == list.length*2) {
                    exportToExcel();
                }
            });
        };
    })
}
getDataset();

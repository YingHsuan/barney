var sql = require('mssql');
var excel = require('node-excel-export');
var Zip = require('node-zip');
var fs = require('fs');
var nodemailer = require('nodemailer');
var encryptor = require('file-encryptor');
var crypto = require('crypto');
var zlib = require('zlib');
var spawn = require('child_process').spawn;
var child = require('child_process');
var execcli = require('execcli');
var cmd = require('node-cmd');
// var chilkat = require('chilkat_node6_macosx');

var config = {
    user: 'LS',
    password: 'pks@ls88',
    server: 'lsbackup.cloudapp.net',
    database: 'LS',
}

var connection = new sql.Connection({
    user: 'LS',
    password: 'pks@ls88',
    server: 'lsbackup.cloudapp.net',
    database: 'LS',
});

// 連線ok!
connection.connect(function(err) {
    if (err == null) {
        console.log('connect success.');
    } else {
        console.log(err);
    }
})

var transaction = new sql.Transaction(connection);
transaction.begin(function(err) {
    var request = new sql.Request(transaction);
    request.query('select * from FType', function(err, recordset) {
        console.log(recordset);

        // create file
        var specification = {
            FType: {
                displayName: 'ID',
            },
            FItem: {
                displayName: 'Name',
            },
        };

        // buffer(report)
        var report = excel.buildExport(
            [
                {
                    name: '遠雄人壽',
                    specification: specification,
                    data: recordset,
                }
            ]
        );

        // 將buffer(report)寫入名為"report.xlsx"的檔案中
        fs.writeFile('report.xlsx', report, 'binary', function() {
            cmd.run('zip --password ls999 report.zip report.xlsx');
        });
        // cmd.get('zip --password ls999 report.zip report.xlsx', function() {
        //     console.log('zip completed.');
        // });
        // cmd.get(
        //     `
        //         zip -e totalZip.zip report.xlsx
        //         ls527
        //         ls527
        //     `, function() {
        //         console.log('bingo!');
        //     });
        //create zip ok!!
        // var zip = new Zip;
        // zip.file('全球人壽.xlsx', report); // add file to zip

        // var options = {base64: false, compression: 'DEFLATE'};
        // fs.writeFile('report.zip', zip.generate(options), 'binary', function(error) {
        //     console.log('wrote zip error: ', error);
        // });

        // ----- //

        // var zip = new chilkat.Zip();
        // var success;
        // success = zip.NewZip("./total.zip");
        // zip.SetPassword("ls527");
        // zip.PasswordProtect = true;

        // var saveExtraPath;
        // saveExtraPath = false;
        // success = zip.AppendOneFileOrDir("./report.xlsx", saveExtraPath);
        // var options = {base64: false, compression: 'DEFLATE'};
        // fs.writeFile('final.zip', report, 'binary', function(error) {
        //     console.log('eee');
        // });

        // var options = {base64: false, compression: 'DEFLATE'};
        // fs.writeFile('total.zip', zip.generate(options), 'binary', function(error) {
        //     console.log('wrote zip error: ', error);
        // });

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
    });
});

// var request = new sql.Request();
// request.query('select * from Group', function(err, recordset) {
//     console.log(err, recordset);
// });

// sql.connect(config).then(function() {
//     // Query
//
//     new sql.Request().query('select * from Group').then(function(err, recordset) {
//         console.log('start');
//         console.log(err, recordset);
//     }).catch(function(err) {
//         // ... query error checks
//     });
//
// }).catch(function(err) {
// // ... connect error checks
// });


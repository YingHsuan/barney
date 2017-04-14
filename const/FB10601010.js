var query_receive = require('../query/FB/10601010_receive.js');
var query_feat = require('../query/FB/10601010_feat.js');

item = {
  providerName: '富邦人壽',
  code: 'FB10601010',
  beginDate: '2017-04-01',
  endDate: '2017-06-30',
  productCode: 'XWO2, XWS1, HIW, HIX1, XLO, XEU, FID, XLV, IWQ, FIF, XW50, XW55, XW60, XW65, XLU, IWO',
  award: [
    {
      name: 'FYP >= 3,000,000',
      value: 3000000,
      resultDesc: 'FYC*3%',
      resultP: 0.03,
    },
    {
      name: 'FYP >= 5,000,000',
      value: 5000000,
      resultDesc: 'FYC*3.5%',
      resultP: 0.035,
    },
    {
      name: 'FYP >= 7,000,000',
      value: 7000000,
      resultDesc: 'FYC*4%',
      resultP: 0.04,
    },
    {
      name: 'FYP >= 9,000,000',
      value: 9000000,
      resultDesc: 'FYC*5%',
      resultP: 0.05,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

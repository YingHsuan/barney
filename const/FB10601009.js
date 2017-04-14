var query_receive = require('../query/FB/10601009_receive.js');
var query_feat = require('../query/FB/10601009_feat.js');

item = {
  providerName: '富邦人壽',
  code: 'FB10601009',
  beginDate: '2017-01-01',
  endDate: '2017-03-31',
  productCode: 'XWO2, XWS1, HIW, HIX1, XLO, XEU, FID, XLV, IWQ, FIF, XW50, XW55, XW60, XW65, XLU, IWO',
  award: [
    {
      name: 'FYP >= 2,100,000',
      value: 2100000,
      resultDesc: 'FYC*3%',
      resultP: 0.03,
    },
    {
      name: 'FYP >= 3,500,000',
      value: 3500000,
      resultDesc: 'FYC*3.5%',
      resultP: 0.035,
    },
    {
      name: 'FYP >= 4,900,000',
      value: 4900000,
      resultDesc: 'FYC*4%',
      resultP: 0.04,
    },
    {
      name: 'FYP >= 6,300,000',
      value: 6300000,
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

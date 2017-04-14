var query_receive = require('../query/TGL/1051222001_receive.js');
var query_feat = require('../query/TGL/1051222001_feat.js');

item = {
  providerName: '全球人壽',
  code: 'TGL1051222001',
  beginDate: '2017-01-01',
  endDate: '2017-12-31',
  productCode: 'all',
  award: [
    {
      name: 'APE>=70,000,000',
      value: 70000000,
      resultDesc: 'FYC*7%',
      result: 0.07,
    },
    {
      name: 'APE>=100,000,000',
      value: 100000000,
      resultDesc: 'FYC*9%',
      result: 0.09,
    },
    {
      name: 'APE>=150,000,000',
      value: 150000000,
      resultDesc: 'FYC*12%',
      result: 0.12,
    },
    {
      name: 'APE>=180,000,000',
      value: 180000000,
      resultDesc: 'FYC*13%',
      result: 0.13,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

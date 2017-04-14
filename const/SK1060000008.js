var query_receive = require('../query/SK/1060000008_receive.js');
var query_feat = require('../query/SK/1060000008_feat.js');

item = {
  providerName: '新光人壽',
  code: 'SK1060000008',
  beginDate: '2017-01-01',
  endDate: '2017-03-31',
  productCode: 'DQ0',
  award: [
    {
      name: 'FYP1>=100,000,000',
      value: 100000000,
      resultDesc: 'FYP1*0.1%',
      resultP: 0.001,
    },
    {
      name: 'FYP1>=200,000,000',
      value: 200000000,
      resultDesc: 'FYP1*0.2%',
      resultP: 0.002,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

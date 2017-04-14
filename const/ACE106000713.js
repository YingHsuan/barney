var query_receive = require('../query/ACE/106000713_receive.js');
var query_feat = require('../query/ACE/106000713_feat.js');

item = {
  providerName: '安達人壽',
  code: 'ACE106000713',
  beginDate: '2017-01-01',
  endDate: '2017-12-31',
  productCode: 'VMRA85C, VMRB85C, VMRC85C, NHICI, CIROPA',
  award: [
    {
      name: 'APE>10,000,000',
      value: 10000000,
      resultDesc: 'APE*2%',
      resultP: 0.02,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

var query_receive = require('../query/ACE/106000711_receive.js');
var query_feat = require('../query/ACE/106000711_feat.js');

item = {
  providerName: '安達人壽',
  code: 'ACE106000711',
  beginDate: '2017-01-01',
  endDate: '2017-06-30',
  productCode: 'VMRA85C, VMRB85C, VMRC85C, NHICI, CIROPA',
  award: [
    {
      name: 'APE<=3,000,000',
      value: 3000000,
      resultDesc: 'APE*1%',
      resultP: 0.01,
    },
    {
      name: 'APE>3,000,000',
      value: 3000000,
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

var query_receive = require('../query/AIA/1060026_receive.js');
var query_feat = require('../query/AIA/1060026_feat.js');

item = {
  providerName: '友邦人壽',
  code: 'AIA1060026',
  beginDate: '2017-01-01',
  endDate: '2017-06-30',
  productCode: 'all expect SPA',
  award: [
    {
      name: 'FYP<10,000,000',
      value: 10000000,
      resultDesc: 'FYP*5%',
      resultP: 0.05,
    },
    {
      name: '10,000,000 <= FYP < 20,000,000',
      value: 10000000,
      resultDesc: 'FYP*5.5%',
      resultP: 0.055,
    },
    {
      name: '20,000,000 <= FYP < 30,000,000',
      value: 20000000,
      resultDesc: 'FYP*6%',
      resultP: 0.06,
    },
    {
      name: '30,000,000 <= FYP < 40,000,000',
      value: 30000000,
      resultDesc: 'FYP*6.5%',
      resultP: 0.065,
    },
    {
      name: '40,000,000 <= FYP < 50,000,000',
      value: 40000000,
      resultDesc: 'FYP*7%',
      resultP: 0.07,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

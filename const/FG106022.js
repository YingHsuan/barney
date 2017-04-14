var query_receive = require('../query/FG/106022_receive.js');
var query_feat = require('../query/FG/106022_feat.js');

item = {
  providerName: '遠雄人壽',
  code: 'FG106022',
  beginDate: '2017-01-01',
  endDate: '2017-03-31',
  productCode: 'DP1',
  award: [
    {
      name: '',
      value: 0,
      resultDesc: 'FYP*1%',
      resultP: 0.01,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

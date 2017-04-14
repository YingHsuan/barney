var query_receive = require('../query/FG/106061_receive.js');
var query_feat = require('../query/FG/106061_feat.js');

item = {
  providerName: '遠雄人壽',
  code: 'FG106061',
  beginDate: '2017-01-01',
  endDate: '2017-03-31',
  productCode: 'FU6,DM1S99,DO1S99,ZH1S30,NJAS00',
  award: [
    {
      name: '30,000,000 <= FYP < 60,000,000',
      value: 30000000,
      resultDesc: 'FYP*0.1%',
      resultP: 0.001,
    },
    {
      name: '60,000,000 <= FYP < 100,000,000',
      value: 60000000,
      resultDesc: 'FYP*0.2%',
      resultP: 0.002,
    },
    {
      name: '100,000,000 <= FYP',
      value: 100000000,
      resultDesc: 'FYP*0.3%',
      resultP: 0.003,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

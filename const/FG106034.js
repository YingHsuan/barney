var query_receive = require('../query/FG/106034_receive.js');
var query_feat = require('../query/FG/106034_feat.js');

item = {
  providerName: '遠雄人壽',
  code: 'FG106034',
  beginDate: '2017-01-01',
  endDate: '2017-12-31',
  productCode: 'LK2,LJ2,DQ1,DR1,DT1,LL2,JG5,DL1,HU2,HW2,HV2,HS2,ZA2,ZJ1,ZC2',
  award: [
    {
      name: 'FYP<10,000,000',
      value: 10000000,
      resultDesc: 'FYC*4%',
      resultP: 0.04,
    },
    {
      name: '10,000,000 <= FYP < 20,000,000',
      value: 10000000,
      resultDesc: 'FYC*8%',
      resultP: 0.08,
    },
    {
      name: '20,000,000 <= FYP < 40,000,000',
      value: 20000000,
      resultDesc: 'FYC*9%',
      resultP: 0.09,
    },
    {
      name: '40,000,000 <= FYP < 70,000,000',
      value: 40000000,
      resultDesc: 'FYC*10%',
      resultP: 0.10,
    },
    {
      name: '70,000,000 <= FYP < 200,000,000',
      value: 70000000,
      resultDesc: 'FYC*11%',
      resultP: 0.11,
    },
    {
      name: '200,000,000 <= FYP < 300,000,000',
      value: 200000000,
      resultDesc: 'FYC*12%',
      resultP: 0.12,
    },
    {
      name: 'FYP >= 300000000',
      value: 300000000,
      resultDesc: 'FYC*13%',
      resultP: 0.13,
    },
  ],
  target: '公司',
  query: {
    receive: query_receive,
    feat: query_feat,
  },
}
module.exports = item

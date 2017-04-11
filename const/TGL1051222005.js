var query = require('../query/TGL/1051222005.js');

item = {
  providerName: '全球人壽',
  code: 'TGL1051222005',
  beginDate: '2017-01-01',
  endDate: '2017-06-30',
  productCode: 'all',
  award: [
    {
      name: 'APE>=30,000,000',
      value: 30000000,
      resultDesc: 'APE*1.8%',
      result: 0.018,
    },
    {
      name: 'APE>=50,000,000',
      value: 50000000,
      resultDesc: 'APE*2.5',
      result: 0.025,
    },
    {
      name: 'APE>=80,000,000',
      value: 80000000,
      resultDesc: 'APE*3.0%',
      result: 0.03,
    },
  ],
  target: '公司',
  query: query,
}
module.exports = item

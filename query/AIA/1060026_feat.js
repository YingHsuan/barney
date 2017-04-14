module.exports = (`
SELECT SUM(FYP) as result, SUM(FYP) as countValue FROM (
     SELECT
     FYP
     FROM
          SS_Detail

     WHERE
          SupCode = '300000717' AND ProNo != '3307970'

     AND IDate BETWEEN '2017-01-01'
     AND '2017-06-30'
) a
`);

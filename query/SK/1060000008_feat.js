module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYP) is null then 0 else SUM(FYP) end as countValue
FROM (
  SELECT
       FYP

  FROM
       SS_Detail

  WHERE
       SupCode = '300000749'
  AND ProNo = '3377759'
  AND IDate BETWEEN '2017-01-01'
  AND '2017-03-31'
) a
`);

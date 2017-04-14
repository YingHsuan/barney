module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYB*isCount) is null then 0 else SUM(FYP*isCount) end as countValue
FROM (
     SELECT
     FYP
     , FYB
     , PW
     , case when YP = 6 then 0 else 1 end as isCount
     FROM
          SS_Detail
     WHERE
          SupCode = '300000735'
     AND (
     ProNo = '3377810' or
     ProNo = '3377372' or
     ProNo = '3377801' or
     ProNo = '3377754' or
     ProNo = '3377861' or
     ProNo = '3377757' or
     ProNo = '3377733' or
     ProNo = '3377760' or
     ProNo = '3377786' or
     ProNo = '3377859'
     )
     AND IDate BETWEEN '2017-01-01'
     AND '2017-12-31'
) a
`);

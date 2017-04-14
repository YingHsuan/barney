module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYP) is null then 0 else SUM(FYP) end as countValue FROM (
     SELECT
     FYP
     FROM
          SS_Detail

     WHERE
          SupCode = '300000734' AND (
          ProNo = '3377741'
          OR ProNo = '3371702'
          OR ProNo = '3377459'
          OR ProNo = '3371648'
          OR ProNo = '3371883'
          OR ProNo = '3371817'
          OR ProNo = '3371836'
          OR ProNo = '3377804'
     )

     AND IDate BETWEEN '2017-04-01'
     AND '2017-06-30'
) a
`);

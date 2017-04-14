module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYP) is null then 0 else SUM(FYP) end as countValue
FROM (
     SELECT
     FYP
     FROM
          SS_Detail s
     RIGHT JOIN (
     select Pro_No, Ins_Code from Product
     where Ins_Code in ('FU6','DM1S99','DO1S99','ZH1S30', 'ZJAS00')
     ) p on p.Pro_No = s.ProNo
     WHERE
          SupCode = '300000735'

     AND IDate BETWEEN '2017-01-01'
     AND '2017-03-31'
) a
`);

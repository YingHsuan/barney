module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYP) is null then 0 else SUM(FYP) end as countValue
FROM (
     SELECT
     FYP
     FROM
          V_LS_Ins_Content

     WHERE
          SupCode = '300000735' AND Pro_No = '3377784'

     AND Receive_Date BETWEEN '2017-01-01'
     AND '2017-03-31'
) a
`);

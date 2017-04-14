module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYB*isCount) is null then 0 else SUM(FYP*isCount) end as countValue
FROM (
     SELECT
     FYP
     , FYB
     , InsType
     , PayType
     , case when YPeriod = 6 then 0 else 1 end as isCount
     FROM
          V_LS_Ins_Content
     WHERE
          SupCode = '300000735'
     AND (
     Pro_No = '3377810' or
     Pro_No = '3377372' or
     Pro_No = '3377801' or
     Pro_No = '3377754' or
     Pro_No = '3377861' or
     Pro_No = '3377757' or
     Pro_No = '3377733' or
     Pro_No = '3377760' or
     Pro_No = '3377786' or
     Pro_No = '3377859'
     )
     AND Receive_Date BETWEEN '2017-01-01'
     AND '2017-12-31'
     AND Audit = 1
     AND Void != 1
) a
`);

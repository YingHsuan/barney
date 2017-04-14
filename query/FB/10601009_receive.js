module.exports = (`
SELECT case when SUM(FYP) is null then 0 else SUM(FYP) end as result,
       case when SUM(FYP) is null then 0 else SUM(FYP) end as countValue FROM (
     SELECT
     FYP
     FROM
          V_LS_Ins_Content

     WHERE
          SupCode = '300000734' AND (
          Pro_No = '3377741'
          OR Pro_No = '3371702'
          OR Pro_No = '3377459'
          OR Pro_No = '3371648'
          OR Pro_No = '3371883'
          OR Pro_No = '3371817'
          OR Pro_No = '3371836'
          OR Pro_No = '3377804'
     )

     AND Receive_Date BETWEEN '2017-01-01'
     AND '2017-03-31'
) a
`);

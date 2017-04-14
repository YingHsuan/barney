module.exports = (`
SELECT SUM(FYP) as result, SUM(FYP) as countValue FROM (
     SELECT
     FYP
     FROM
          V_LS_Ins_Content

     WHERE
          SupCode = '300000717' AND Pro_No != '3307970'

     AND Receive_Date BETWEEN '2017-01-01'
     AND '2017-06-30'
) a
`);

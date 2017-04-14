module.exports = (`
SELECT case when SUM(firstHalf+secondHalf) is null then 0 else SUM(firstHalf+secondHalf) end as result,
       case when countValue is null then 0 else countValue end as countValue
FROM(
SELECT
     firstHalf, secondHalf
     ,case when firstHalf > 3000000
          then case when secondHalf > 3000000 then 0 else secondHalf/2 end
     else case when secondHalf > 3000000 then firstHalf/2 else (firstHalf+secondHalf) end
      end as countValue
from (
SELECT SUM(RFYP*isFirstHalf*APERate) as firstHalf, SUM(RFYP*isSecondHalf*APERate) as secondHalf FROM (
SELECT
     CRCRate * RFYP AS RFYP
     , Case
          WHEN Receive_Date BETWEEN '2017-01-31' AND '2017-06-30' then 1
          else 0 end as isFirstHalf
     , Case
          When Receive_Date BETWEEN '2017-07-01' AND '2017-12-31' then 1
          else 0 end as isSecondHalf
     , CASE PayType
          WHEN 'D' THEN
               CASE YPeriod
                    WHEN '1' THEN
                         0.1
                    ELSE
                         0
                    END
          WHEN 'Y' THEN
               CASE YPeriod
                    WHEN '1' THEN
                         0.1
                    WHEN '2' THEN
                         0.2
                    WHEN '3' THEN
                         0.3
                    WHEN '4' THEN
                         0.4
                    WHEN '5' THEN
                         0.5
                    ELSE
                         1
                    END
          WHEN 'S' THEN
               CASE YPeriod
                    WHEN '1' THEN
                         0.2
                    WHEN '2' THEN
                         0.4
                    WHEN '3' THEN
                         0.6
                    WHEN '4' THEN
                         0.8
                    WHEN '5' THEN
                         1
                    ELSE
                         2
                    END
          WHEN 'Q' THEN
               CASE YPeriod
                    WHEN '1' THEN
                         0.4
                    WHEN '2' THEN
                         0.8
                    WHEN '3' THEN
                         1.2
                    WHEN '4' THEN
                         1.6
                    WHEN '5' THEN
                         2
                    ELSE
                         4
                    END
          WHEN 'M' THEN
               CASE YPeriod
                    WHEN '1' THEN
                         0.6
                    WHEN '2' THEN
                         1.2
                    WHEN '3' THEN
                         1.8
                    WHEN '4' THEN
                         2.4
                    WHEN '5' THEN
                         3
                    ELSE
                         6
                    END
          ELSE
               0
          END AS APERate
FROM
     V_LS_Ins_Content v
left JOIN(
     SELECT
          Pro_No
          , Ins_Code
          , Pro_Name
     FROM
          Product
     WHERE
          Pro_Name LIKE '%鑫龍星高照%'
          OR Ins_Code in ('NHICI','CIROPA')
) p ON p.Pro_No = v.Pro_No
WHERE
SupCode = '300000725'
AND Receive_Date between '2017-01-01' and '2017-12-31'
AND Audit = 1
AND Void != 1
AND p.Pro_No is not null
) a
) b
) c group by countValue
`);

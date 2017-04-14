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
     i.RFYP
     , Case
          WHEN IDate BETWEEN '2017-01-31' AND '2017-06-30' then 1
          else 0 end as isFirstHalf
     , Case
          When IDate BETWEEN '2017-07-01' AND '2017-12-31' then 1
          else 0 end as isSecondHalf
     , CASE PW
          WHEN 'D' THEN
               CASE YP
                    WHEN '1' THEN
                         0.1
                    ELSE
                         0
                    END
          WHEN 'Y' THEN
               CASE YP
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
               CASE YP
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
               CASE YP
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
               CASE YP
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
     SS_Detail s
LEFT JOIN (Select CRCRate*RFYP as RFYP, Ins_No, Pro_No from V_LS_Ins_Content) i
on s.INo = i.Ins_No and s.ProNo = i.Pro_No
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
) p ON p.Pro_No = s.ProNo
WHERE
SupCode = '300000725'
AND IDate between '2017-01-01' and '2017-12-31'
AND p.Pro_No is not null
) a
) b
) c group by countValue
`);

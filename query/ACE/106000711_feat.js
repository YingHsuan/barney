module.exports = (`
SELECT
     case when SUM(RFYP*APERate) is null then 0 else SUM(RFYP*APERate) end as result,
     case when SUM(RFYP*APERate) is null then 0 else SUM(RFYP*APERate) end as countValue
FROM (
SELECT
     i.RFYP
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
AND IDate BETWEEN '2017-01-01'
AND '2017-06-30'
AND p.Pro_No is not null
) a
`);

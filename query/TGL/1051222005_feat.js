module.exports = (`
SELECT case when SUM(RFYP*APERate) is null then 0 else SUM(RFYP*APERate) end as result,
       case when SUM(RFYP*APERate) is null then 0 else SUM(RFYP*APERate) end as countValue
FROM (
SELECT
     i.RFYP
     ,case PW
          WHEN 'D' then
               case YP when '1' then 0.1 else 0 END
          when 'Y' then
               case YP
                    when '1' then 0.1
                    when '2' then 0.2
                    when '3' then 0.3
                    when '4' then 0.4
                    when '5' then 0.5
                    when '6' then 1
                    else 0 END
          WHEN 'S' then
               case YP
                    when '1' then 0.2
                    when '2' then 0.4
                    when '3' then 0.6
                    when '4' then 0.8
                    when '5' then 1
                    when '6' then 2
                    else 0 END
          WHEN 'Q' then
               case YP
                    when '1' then 0.4
                    when '2' then 0.8
                    when '3' then 1.2
                    when '4' then 1.6
                    when '5' then 2
                    when '6' then 4
                    ELSE 0 END
          when 'M' then 6
          else 0 end as APERate

FROM
     SS_Detail s
LEFT JOIN (Select CRCRate*RFYP as RFYP, Ins_No, Pro_No from V_LS_Ins_Content) i
on s.INo = i.Ins_No and s.ProNo = i.Pro_No

WHERE
     s.SupCode = '300000737'
AND IDate BETWEEN '2017-01-01'
AND '2017-06-30'
) a
`);


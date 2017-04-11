module.exports = (`
SELECT SUM(RFYP*APERate) as result
FROM (
        SELECT
                CRCRate*RFYP as RFYP
                ,case PayType
                        WHEN 'D' then
                                case YPeriod when '1' then 0.1 else 0 END
                        when 'Y' then
                                case YPeriod
                                        when '1' then 0.1
                                        when '2' then 0.2
                                        when '3' then 0.3
                                        when '4' then 0.4
                                        when '5' then 0.5
                                        else 1 END
                        WHEN 'S' then
                                case YPeriod
                                        when '1' then 0.2
                                        when '2' then 0.4
                                        when '3' then 0.6
                                        when '4' then 0.8
                                        when '5' then 1
                                        else 2 END
                        WHEN 'Q' then
                                case YPeriod
                                        when '1' then 0.4
                                        when '2' then 0.8
                                        when '3' then 1.2
                                        when '4' then 1.6
                                        when '5' then 2
                                        ELSE 4 END
                        when 'M' then
                                case YPeriod
                                        when '1' then 0.6
                                        when '2' then 1.2
                                        when '3' then 1.8
                                        when '4' then 2.4
                                        when '5' then 3
                                        ELSE 6 END
                        else 0 end as APERate
        FROM
                V_LS_Ins_Content
        WHERE
                SupCode = '300000737'
        AND Receive_Date BETWEEN '2016-01-01'
        AND '2016-06-30'
        AND Audit = 1
        AND Void != 1
) a
`);


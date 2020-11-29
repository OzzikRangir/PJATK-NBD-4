printjson(db.people.aggregate([
    { $match: { nationality: "Poland", sex: "Female"} },
    { $unwind : "$credit" },
    { $addFields: {balanceDecimal: {$convert: { input: "$credit.balance", to: "decimal", onError: Error }}} },
    { $group: { 
        _id: "$credit.currency" , 
        totalBalancePerCurrency: {$sum: "$balanceDecimal"}, 
        avarageBalance: {$avg: "$balanceDecimal"}
    } }
]).toArray())
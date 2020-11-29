printjson(db.people.aggregate([
    {
        $addFields: {
            heightDecimal: { $convert: { input: "$height", to: "decimal", onError: Error } },
            weightDecimal: { $convert: { input: "$weight", to: "decimal", onError: Error } }
        }
    },
    { $group: { _id: "$sex", avgHeight: { $avg: "$heightDecimal" }, avgWeight: { $avg: "$weightDecimal" } } }
]).toArray())
printjson(db.people.aggregate([
    { 
        $addFields: {
            weightDecimal: {$convert: { input: "$weight", to: "decimal", onError: Error }},
            heightDecimal: {$convert: { input: "$height", to: "decimal", onError: Error }} 
        }
    },
    { 
        $addFields: {
            bmi: { $divide: [ "$weightDecimal" , { $pow: [ { $divide: ["$heightDecimal", 100]}, 2 ] } ] },
        }
    },
    { $group: { _id: "$nationality",  minBmi: { $min: "$bmi" }, maxBmi: { $max: "$bmi" }} }
]).toArray())
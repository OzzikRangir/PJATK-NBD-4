printjson(db.people.mapReduce(
    function() { 
        let weightDecimal = parseFloat(this.weight)
        let heighDecimalMeters = parseFloat(this.height) * 0.01
        let bmi = (weightDecimal / (heighDecimalMeters * heighDecimalMeters))
        emit(this.nationality, {"minBmi": bmi, "maxBmi": bmi}) 
    },
    function(key, values) { return values.reduce((a, b) => {
            return {
                "minBmi": Math.min(a["minBmi"], b["minBmi"]), 
                "maxBmi": Math.max(a["maxBmi"], b["maxBmi"]),
            } 
        }) 
    },
    { out: { inline: 1 } }
).results)
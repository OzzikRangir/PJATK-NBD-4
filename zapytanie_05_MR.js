printjson(db.people.mapReduce(
    function() { 
        if (this.nationality === "Poland" && this.sex === "Female") {
            this.credit.forEach(e => emit(e.currency, {"sum": parseFloat(e.balance), "count": 1} ) ) 
        }
    },
    function(key, values) {
        return { "sum": Array.sum(values.map(c => c["sum"])), "count": values.length }
    },
    { 
        out: { inline: 1 },
        finalize: function(key, value) {
            return {"total" : (value.sum), "average": (value.sum / value.count) }
        },
    }
).results)
regex="^zapytanie_(.*)\.js$"

for f in zapytanie*.js; do
	[[ $f =~ $regex ]]
	name=${BASH_REMATCH[1]}
	mongo nbd $f >> wyniki_$name.json
done
echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": "80" }'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{ "name": "Vingador", "age": "19" }'

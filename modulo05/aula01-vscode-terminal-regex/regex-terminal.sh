# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt

find . -name *.js -not -path '*node_modules**' | ipt

cp -r path .

# 1s -> primeira linha
# ^ -> primeira coluna
# substitui pelo $CONTENT
# quebrou a linha adicionar um \n implicito

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i n "" -e '1s/^/\'${CONTENT}'\
/g' {file}

# muda tudo
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i n "" -e '1s/^/\'${CONTENT}'\
/g' {file}
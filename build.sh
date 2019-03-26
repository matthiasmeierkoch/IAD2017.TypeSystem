lead='<!-- page content start-->'
tail='<!-- page content end -->'

awk 'NR==FNR{new = new $0 ORS; next} /'"$tail"'/{f=0} !f{print} /'"$lead"'/{printf "%s",new; f=1}' ./text/loos.html ./src/index.html

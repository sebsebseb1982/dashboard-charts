set datafile separator ','
set term png size 400,250
set output "axis.png"
set tics font "Helvetica,7"
set xtics rotate by 90 right
set lmargin 3
set rmargin 0.5
set tmargin 0.5
set bmargin 2.5
set ytics 5
set xdata time
set timefmt "%Y-%m-%dT%H:%M:%S"
set format x "%H:%M"
set xtics 60
plot "data.csv" using 1:3 with lines notitle

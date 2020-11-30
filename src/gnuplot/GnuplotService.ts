let exec = require('child_process').exec;

export type Serie = 'downstairs' | 'upstairs' | 'outside';

export class GnuplotService {
    generateChart(serie: Serie): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let input = 'gnuplot/temperatures.csv';
            let output = `gnuplot/${serie}.png`;
            let gnuPlotFile = `gnuplot/${serie}.gnuplot`;
            let child = exec(`gnuplot \
            -e "input='${input}'" \
            -e "output='${output}'" \
            -p ${gnuPlotFile}`);
            child.stdout.on('data', (data) => {
                console.log('stdout: ' + data);
            });
            child.stderr.on('data', (data) => {
                console.error('stdout: ' + data);
            });
            child.on('close', (code) => {
                resolve();
            });
        });
    }
}

new GnuplotService().generateChart("downstairs");
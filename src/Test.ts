import * as png from "png-js";
import * as _ from "lodash";
import {Request, Response} from "express";
import * as core from "express-serve-static-core";
import {IRoutable} from "./routes";
import {GnuplotService, Serie} from "./gnuplot/GnuplotService";

export class TestRoutes implements IRoutable {
    private gnuplotService: GnuplotService;

    constructor() {
         this.gnuplotService = new GnuplotService();
    }

    private readonly png = 'test.png';

    public routes(router: core.Router): void {
        router.get(
            '/series/:serie',
            (req: Request, res: Response) => {
                this.gnuplotService.generateChart(<Serie>req.params.serie).then(() => {
                    png.decode(`gnuplot/${req.params.serie}.png`, (pixels: Uint8Array) => {
                        let retour: number[] = _.times(pixels.length/(4*8), _.constant(0));
                        _.chunk(pixels, 4 * 8)
                            .forEach((eightPixelsRGBA, index) => {
                                for (let pixelIndex = 0; pixelIndex < 8; pixelIndex++) {
                                    if (eightPixelsRGBA[pixelIndex * 4] != 255 || eightPixelsRGBA[(pixelIndex * 4) + 1] != 255 || eightPixelsRGBA[(pixelIndex * 4) + 2] != 255) {
                                        retour[index] = retour[index] + Math.pow(2, 7-pixelIndex);
                                    }
                                }
                            });

                        let hexString='';


                        retour.forEach((value) => {
                            hexString += value.toString(16).padStart(2, '0');
                        })

                        console.log(`Pixels présents dans ${this.png} : ${pixels.length/4}`);
                        console.log(`Nombre de caractères dans le retour : ${hexString.length}`);

                        res.send(hexString);
                    });
                });
            }
        );
    }
}
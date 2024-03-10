import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(private httpClient: HttpClient) {}

  async loadtiff(): Promise<void> {
    // const a = L.geoTiff('assets/test1.tiff', {
    //   bounds: true,
    //   wrap: false,
    //   opacity: 0.5,
    //   interactive: true,
    // });

    // console.log(a);
    // fromUrl('assets/test1.tiff').then((tiff) => {
    //   console.log(tiff);
    // });
    // // this.httpClient
    // //   .get('https://jmp.sh/s/oRtT5KfbzaJNyefpiXxP')
    // //   .subscribe((v) => {
    // //     console.log(v);
    // //   });
    // // const tiff = await fromUrl('assets/test1.tiff');
    // // const image = await tiff.getImage();
    // // const [gx1, gy1, gx2, gy2] = image.getBoundingBox();
    // // const rasters = await image.readRasters();
    // // .latLng(gx1, gy1);
    // // const
    const a1 = L.latLng(51, 39);
    const a2 = L.latLng(52, 40);
    const b: L.LatLngBoundsExpression = [
      [51, 39],
      [52, 40],
    ];
    // const b = new L.LatLngBounds([gx1, gy1]);
    const test = L.imageOverlay('assets/image031.jpg', b, {
      opacity: 0.5,
    });
    console.log(test);
  }
}

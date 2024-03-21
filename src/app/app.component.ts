import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  projection: any;
  customProjection: any;

  dataSource: string[] = [
    'assets/present/1.png',
    'assets/present/2.png',
    'assets/present/3.png',
    'assets/present/4.png',
    'assets/present/5.png',
    'assets/present/6.png',
    'assets/present/7.png',
    'assets/present/8.png',
    'assets/present/9.png',
    'assets/present/10.png',
  ];

  // public toggleView(): void {
  //   this.isViewVoronezh = !this.isViewVoronezh;
  //   if (this.map) this.map.pm.toggleControls();
  // }

  // map: L.Map | null = null;

  // public ngAfterViewInit(): void {}

  // private getCurrentPosition(): any {
  //   return new Observable((observer: Subscriber<any>) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position: any) => {
  //         observer.next({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //         observer.complete();
  //       });
  //     } else {
  //       observer.error();
  //     }
  //   });
  // }

  // onSelectLayer(changeLayer: ValueChangedEvent): void {
  //   if (this.map) {
  //     this.selectedLayer.removeFrom(this.map);
  //     const _selectedLayer =
  //       this.layerList.find((l) => l.id === changeLayer.value) ||
  //       this.layerList[0];
  //     this.selectedLayer = _selectedLayer.layer;
  //     this.selectedLayer.addTo(this.map);
  //   }
  // }
  // getcolor(a: any): string {
  //   return '#fff';
  // }
}

interface LineData {
  latlng: L.LatLngExpression[];
  speed: number;
}

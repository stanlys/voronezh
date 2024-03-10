import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { LAYERS } from '../layers';
import { LoadingService } from '../services/loading';
import { daDataService } from '../services/dadata';
import { ValueChangedEvent } from 'devextreme/ui/select_box';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  public opacityValue = 100;

  public rasters: L.ImageOverlay | null = null;

  public isViewVoronezh = true;
  public layerList = LAYERS;

  public address = '';

  public selectedLayer: L.Layer;

  map: L.Map | null = null;

  constructor(private loading: LoadingService, public dadata: daDataService) {
    this.selectedLayer = LAYERS[0].layer;
  }

  createMap() {
    this.map = L.map('map', { pmIgnore: false }).setView(
      [51.6, 39.2],
      12
    );
    console.log(this.map);
    this.loadMap();
    // if (this.map) {
    this.map.pm.setLang('ru');

    this.map.on('pm:create', (e) => {
      console.log('setmarker');
      const _ll = (e.layer as unknown as any)._latlng as L.LatLng;
      this.dadata.getAddress(_ll.lat, _ll.lng);
    });
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.map = L.map('mainmap', { pmIgnore: false }).setView(
    //     [51.6, 39.2],
    //     12
    //   );
    //   console.log(this.map);
    //   this.loadMap();
    //   // if (this.map) {
    //   this.map.pm.setLang('ru');

    //   this.map.on('pm:create', (e) => {
    //     console.log('setmarker');
    //     const _ll = (e.layer as unknown as any)._latlng as L.LatLng;
    //     this.dadata.getAddress(_ll.lat, _ll.lng);
    //   });
    // }, 5000);
  }

  ngAfterContentInit(): void {}

  async loadtiff(): Promise<void> {
    // const a1 = L.latLng(51.55281429059435, 39.06612136706727);
    // const a2 = L.latLng(51.78934592330817, 39.33514360867035);
    // const b: L.LatLngBoundsExpression = [
    //   [51.55281429059435, 39.06612136706727],
    //   [51.78934592330817, 39.33514360867035],
    // ];
    // this.rasters = L.imageOverlay('assets/test1.webp', b, {
    //   opacity: this.opacityValue / 100,
    // });
    // if (this.map) this.rasters.addTo(this.map);
  }

  // changedOpacity(value: any): void {
  //   this.opacityValue = value.value;
  //   if (this.rasters) {
  //     this.rasters.setOpacity(this.opacityValue / 100);
  //   }
  // }
  ngOnInit(): void {
    this.dadata.address$.subscribe((v) => {
      console.log(v.suggestions.length);
      if (v.suggestions.length > 0) this.address = v.suggestions[0].value;
    });

    //   this.loading.loadtiff();

    //   this.customProjection = {
    //     aspectRatio: 2,

    //     to(coordinates: number[]) {
    //       const x = coordinates[0] * RADIANS;
    //       const y = Math.min(
    //         Math.max(coordinates[1] * RADIANS, -WAGNER_6_P_LAT),
    //         +WAGNER_6_P_LAT
    //       );
    //       const t = y / Math.PI;
    //       return [(x / Math.PI) * Math.sqrt(1 - 3 * t * t), (y * 2) / Math.PI];
    //     },

    //     from(coordinates: number[]) {
    //       const x = coordinates[0];
    //       const y = Math.min(
    //         Math.max(coordinates[1], -WAGNER_6_U_LAT),
    //         +WAGNER_6_U_LAT
    //       );
    //       const t = y / 2;
    //       return [
    //         (x * Math.PI) / Math.sqrt(1 - 3 * t * t) / RADIANS,
    //         (y * Math.PI) / 2 / RADIANS,
    //       ];
    //     },
  }

  //   this.projection = {
  //     to(coordinates: number[]) {
  //       return [coordinates[0] / 100, coordinates[1] / 100];
  //     },
  //     from(coordinates: number[]) {
  //       return [coordinates[0] * 100, coordinates[1] * 100];
  //     },
  //   };
  // }
  onSelectLayer(changeLayer: ValueChangedEvent): void {
    if (this.map) {
      this.selectedLayer.removeFrom(this.map);
      const _selectedLayer =
        this.layerList.find((l) => l.id === changeLayer.value) ||
        this.layerList[0];
      this.selectedLayer = _selectedLayer.layer;
      this.selectedLayer.addTo(this.map);
    }
  }
  getcolor(a: any): string {
    return '#fff';
  }

  private loadMap(): void {
    console.log(this.map);
    if (this.map === null) return;
    // L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(this.map);

    this.map.pm.addControls({
      position: 'topleft',
      drawCircleMarker: false,
      rotateMode: false,
      drawMarker: true,
      drawCircle: false,
      drawPolygon: false,
      drawRectangle: false,
      drawText: false,
      drawPolyline: false,
    });

    // var drawnItems = new L.FeatureGroup();

    // var drawnItems = new L.FeatureGroup();
    // this.map.addLayer(drawnItems);

    var openTopoMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: ' ',
      }
    );

    this.map.addLayer(openTopoMap);

    // this.map.on('layeradd', (e) => {
    //   console.log(e);
    // });

    // Пример данных с координатами и скоростями
    // var lineData: LineData[] = [
    //   {
    //     latlng: [
    //       { lat: 51.6, lng: 42 },
    //       { lat: 52, lng: 42.3 },
    //     ],
    //     speed: 60,
    //   },
    //   {
    //     latlng: [
    //       { lat: 52, lng: 42.3 },
    //       { lat: 51, lng: 41.3 },
    //     ],
    //     speed: 101,
    //   },
    //   {
    //     latlng: [
    //       { lat: 50.6, lng: 42.5 },
    //       { lat: 51, lng: 41.3 },
    //     ],
    //     speed: 40,
    //   },
    // ];

    // function colorLine(lineData: LineData): {
    //   color: string;
    //   line: L.Polyline;
    // } {
    //   const { latlng, speed } = lineData;
    //   let color: string = 'blue';

    //   if (speed > 100) {
    //     color = 'red';
    //   } else if (speed < 30) {
    //     color = 'green';
    //   }

    //   const line: L.Polyline = L.polyline(latlng, { color });

    //   return { line, color };
    // }

    // Создаем группу линий
    // var polylineGroup = L.featureGroup();
    // // // Проходимся по нашим линиям и добавляем их на карту
    // if (this.map) {
    //   lineData.forEach((line, i) => {
    //     var polyline = L.polyline(line.latlng, colorLine(line)).addTo(
    //       polylineGroup
    //     );
    //   });
    // }

    // // Отображаем группу линий на карте
    // polylineGroup.addTo(this.map);

    // this.map.flyTo([51.509, 42.04], 17);

    // Create and add a draw layer
    // var drawLayer = new L.FeatureGroup();
    // this.map.addLayer(drawLayer);
    // var drawControl = new L.Control({
    //   position: 'bottomright',
    // });
    // this.map.addControl(drawControl);
    // this.map.on('draw:created', (event: any) => {
    //   var type = event.layerType;
    //   if (type == 'polygon') {
    //     // Get the polygon coordinates
    //     var coordinates = event.layer.getLatLngs();
    //     // Do something with the polygon coordinates here
    //     alert(`The polygon coordinates are: ${coordinates}`);
    //   }
    // });

    // var drawControl = new L.Control.Draw({
    //   edit: {
    //     featureGroup: drawnItems,
    //   },
    // });
    // this.map.addControl(drawControl);

    const url = 'assets/tiff/test1.tif';
    this.loadtiff();
  }
}

interface LineData {
  latlng: L.LatLngExpression[];
  speed: number;
}

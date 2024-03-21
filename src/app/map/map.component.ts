import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { LAYERS } from '../layers';
import { LoadingService } from '../services/loading';
import { daDataService } from '../services/dadata';
import { ValueChangedEvent } from 'devextreme/ui/select_box';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { GeoRaster } from 'georaster-layer-for-leaflet';
import GeoTIFF from 'geotiff';
import { RASTERS } from '../rasters';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  public opacityValue = 50;

  public rasters: L.ImageOverlay | null = null;

  public isViewVoronezh = true;
  public layerList = LAYERS;

  public address = '';

  public lat: number = 0;
  public lng: number = 0;

  public aaa = '';

  public iconOption: L.IconOptions = {
    iconUrl: 'assets/MarksIcons/parks.png',
    iconSize: [50, 50],
  };

  isAddMarker = false;
  isStart = false;

  public selectedLayer: L.Layer;
  public marker: L.Marker | null = null;

  public selectedLL: L.LatLng = new L.LatLng(51.67092, 39.20157);

  public rasterlist = RASTERS;
  public rasterIndex = 0;
  public mapTitle = '';

  public treeColor = '#008000';

  map: L.Map | null = null;

  constructor(private loading: LoadingService, public dadata: daDataService) {
    this.selectedLayer = LAYERS[0].layer;
  }

  createMap() {
    this.map = L.map('map', {
      pmIgnore: false,
      attributionControl: false,
    }).setView([51.67092, 39.20157], 16);
    this.loadMap();
    // if (this.map) {
    this.map.pm.setLang('ru');

    this.map.on('pm:create', (e) => {
      console.log('setmarker');
      const _ll = (e.layer as unknown as any)._latlng as L.LatLng;
      this.dadata.getAddress(_ll.lat, _ll.lng);
    });

    this.map.on('mousemove', (e) => {
      const _ll = e.latlng as L.LatLng;
      let lat = Math.round(_ll.lat * 100000) / 100000;
      let lng = Math.round(_ll.lng * 100000) / 100000;
      this.lat = lat;
      this.lng = lng;
    });
  }

  logXY(e: any): void {
    const _ll = e.latlng as L.LatLng;
    let lat = Math.round(e.lat * 100000) / 100000;
    let lng = Math.round(e.lng * 100000) / 100000;
    // this.lat = _ll.lat;
    // this.lng = _ll.lng;

    this.aaa = `${Math.random()}`;
    console.log(this.lat);
  }

  addMarker(e: any): void {
    this.iconOption.iconUrl = 'assets/MarksIcons/parks.png';
    let ourCustomIcon = L.icon(this.iconOption);
    this.isAddMarker = true;
    this.map?.on('click', (e) => {
      this.selectedLL = e.latlng;
      this.marker = L.marker(e.latlng, { icon: ourCustomIcon });

      if (this.map) this.marker.addTo(this.map);
      this.isAddMarker = false;
      const _ll = e.latlng as L.LatLng;
      this.dadata.getAddress(_ll.lat, _ll.lng);
      this.marker.bindPopup('');
      this.map?.off('click');
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

  startTest() {
    this.loadtiff();
    this.isStart = true;
  }

  ngAfterContentInit(): void {}

  async loadtiff(): Promise<void> {
    // const b: L.LatLngBoundsExpression = [
    //   [51.55281429059435, 39.06612136706727],
    //   [51.78934592330817, 39.33514360867035],
    // ];
    // this.rasters = L.imageOverlay('assets/test1.webp', b, {
    //   opacity: this.opacityValue / 100,
    // });

    const currentRaster = this.rasterlist[this.rasterIndex];
    this.mapTitle = currentRaster.name;
    this.opacityValue = currentRaster.opacity;

    this.rasters = L.imageOverlay(
      '/assets/' + currentRaster.src,
      currentRaster.xy,
      {
        opacity: currentRaster.opacity,
      }
    );
    if (this.map) this.rasters.addTo(this.map);
    this.treeColor = '#008000';
    this.map?.flyTo(this.selectedLL, 12);
  }

  public nextRaster(): void {
    this.rasterIndex = this.rasterIndex + 1;
    if (this.map) this.rasters?.removeFrom(this.map);

    this.loadtiff();
    console.log(this.rasterlist);
  }

  public prevRaster(): void {
    if (this.map) this.rasters?.removeFrom(this.map);
    if (this.rasterIndex > 0) this.rasterIndex--;
    this.loadtiff();
  }

  changedOpacity(value: any): void {
    this.opacityValue = value.value;
    if (this.rasters) {
      this.rasters.setOpacity(this.opacityValue / 100);
    }
  }

  saveMarker(): void {
    const sum =
      this.rasterlist.reduce((sum, el) => (sum = sum + el.mark), 0) /
      this.rasterlist.length;
    let mark = '';
    if (sum >= 75) {
      this.iconOption.iconUrl = 'assets/100.png';
      mark = 'Отлично';
    }
    if (sum >= 50 && sum < 75) {
      this.iconOption.iconUrl = 'assets/75.png';
      mark = 'Хорошо';
    }
    if (sum >= 25 && sum < 50) {
      this.iconOption.iconUrl = 'assets/50.png';
      mark = 'Удовлетрительно';
    }
    if (sum < 25) {
      this.iconOption.iconUrl = 'assets/25.png';
      mark = 'Плохо';
    }
    if (this.marker) {
      this.marker.setIcon(L.icon(this.iconOption));
      this.marker.bindTooltip(
        `<p>${this.address}</p> <p> Ваша оценка: ${mark}</p>`
      );
    }
    this.rasterIndex = 0;
    this.isStart = false;
    this.rasters?.setOpacity(0);
    this.address = '';
    this.isStart = false;
  }

  changedMark(value: any): void {
    const mark = value.value;
    if (mark >= 75) this.treeColor = '#008000';
    if (mark >= 50 && mark < 75) this.treeColor = '#9acd32';
    if (mark >= 25 && mark < 50) this.treeColor = '#ffff00';
    if (mark < 25) this.treeColor = '#ff0000';

    this.rasterlist[this.rasterIndex].mark = value.value;
  }

  ngOnInit(): void {
    this.dadata.address$.subscribe((v) => {
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

    // this.loadtiff();
  }
}

interface LineData {
  latlng: L.LatLngExpression[];
  speed: number;
}

import * as L from 'leaflet';

export interface ILayer {
  id: number;
  layer: L.Layer;
  layerName: string;
}

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
});

const osmHOT = L.tileLayer(
  'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France',
  }
);

const google = L.tileLayer(
  'https://mt0.google.com/vt/v=3.2&lyrs=y&hl=ru&x={x}&y={y}&z={z}',
  { maxZoom: 19 }
);

// var OffsetTileLayer = L.TileLayer.extend({
//   _getTilePos: function (coords: any) {
//     var pos = L.TileLayer.prototype._getTilePos.call(this, coords);
//     console.log(coords, pos);
//     return pos.add([25, 25]);
//   },
// });
// 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',

const yandex = L.tileLayer(
  '  http://vec01.maps.yandex.net/tiles?l=skl&x={x}&y={y}&z={z}&g={g}',
  { maxZoom: 19 }
);

const grayOSM = L.tileLayer(
  'https://a.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  { maxZoom: 19 }
);

const gis2 = L.tileLayer('http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
  className: '2gis',
});

export const LAYERS: Array<ILayer> = [
  {
    id: 0,
    layer: osm,
    layerName: 'OSM',
  },
  {
    id: 1,
    layer: yandex,
    layerName: 'yandex',
  },
  {
    id: 2,
    layer: google,
    layerName: 'Google',
  },
  {
    id: 3,
    layer: osmHOT,
    layerName: 'OSM HOT',
  },
  {
    id: 4,
    layer: gis2,
    layerName: '2 Gis',
  },
  {
    id: 5,
    layer: grayOSM,
    layerName: 'gray OSM',
  },
];

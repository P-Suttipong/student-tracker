<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "BaseMap",
  props: ["location"],
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiamltbXlrYXdhaWk3NyIsImEiOiJja2o1M3ByY2YxNnJvMnBwZGs2djQ3M3BwIn0.JUR4oq73pm2aDx2rc-Vcvw"
    };
  },
  mounted() {
    console.log(this.location);
    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            message: "Foo",
            iconSize: [60, 60]
          },
          geometry: {
            type: "Point",
            coordinates: [this.location[1], this.location[0]]
          }
        }
      ]
    };
    mapboxgl.accessToken = this.accessToken;
    const nav = new mapboxgl.NavigationControl();
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [this.location[1], this.location[0]],
      zoom: 15
    });

    map.addControl(nav, "bottom-right");

    geojson.features.forEach(function(marker) {
      var el = document.createElement("div");
      el.style.borderRadius = "50%";
      el.style.backgroundImage =
        "url(https://firebasestorage.googleapis.com/v0/b/cold-room-backoffice.appspot.com/o/van_marker.png?alt=media&token=d8a512d2-5651-4697-956f-a8fd117e0ba0)";
      el.style.width = marker.properties.iconSize[0] + "px";
      el.style.height = marker.properties.iconSize[1] + "px";
      //   el.addEventListener("click", function() {
      //     window.alert(marker.properties.message);
      //   });
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });
  }
};
</script>
<style scoped>
.basemap {
  width: 100%;
  height: 50vh;
}
</style>

<script lang="ts">
  // Three Js way to create the camera
  // import {PerspectiveCamera} from "three";
  // const camera = new PerspectiveCamera()

  import { T } from "@threlte/core";
  import Model1 from "./Model1.svelte";
  import Model2 from "./Model2.svelte";
  import Model3 from "./Model3.svelte";
  import { onMount } from "svelte";

// Model 2 Logic

  let myModel2: Model2;
  // Aprovechamos el onMount para cambiar el color del material
  onMount(async () => {
    myModel2?.changeMaterialColor("MaterialA", "#800080"); // Cambia MaterialA a morado
  });

 
</script>

<!-- Camera and Lights -->
<T.PerspectiveCamera
  fov={60}
  makeDefault
  position={[1, 1, 10]}
  rotation={[0, 0, 0]}
/>
<T.DirectionalLight position={[0, 10, 10]} />
<T.AmbientLight />

<!-- Cubo Basico -->
<!-- <T.Mesh>
    <T.BoxGeometry attach="geometry" />
    <T.MeshBasicMaterial attach="material" />
</T.Mesh> -->

<!-- <Model></Model> -->

<!-- El modelo 1 se cambia internamente a verde desde dentro -->
<!-- <Model1 position={[-1, 0, 0]} scale={[10, 10, 10]} rotation={[0, 180, 0]} /> -->

<!-- El modelo 2 deja expueso un metodo que podemos llamar desde afuera osea desde aqui la escene
Para aquello es necesario cachearlo desde el padre en una variable -->
<!-- <Model2
  position={[4, 0, 0]}
  scale={[10, 10, 10]}
  rotation={[0, 185, 0]}
  bind:this={myModel2}
/> -->

<Model3
position={[-1, 0, 0]} scale={[10, 10, 10]} rotation={[0, 180, 0]} />

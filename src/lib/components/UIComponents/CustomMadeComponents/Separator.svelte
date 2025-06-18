<script>
  /**
   * @type {string}
   * Width of the separator (e.g., 'full', 'w-1', 'w-[50%]')
   */
  export let width = "full";

  /**
   * @type {string}
   * Padding classes for the separator (e.g., 'px-4', 'py-2')
   */
  export let padding = "";

  /**
   * @type {string}
   * Margin classes for the separator (e.g., 'my-10', 'mx-auto')
   */
  export let margin = "my-10";

  // Compute the width class based on the input
  $: widthClass = width === "full" ? "w-full" : `w-${width}`;
</script>

<div class="{padding} {margin} flex justify-center">
  <hr class="{widthClass} border-gray-200 border-t-1" />
</div>

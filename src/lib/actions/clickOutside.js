/**
 * Action that dispatches an event when user clicks outside the node
 * @param {Node} node - The node to detect clicks outside of
 * @returns {object} - Svelte action object with destroy method
 */
export function clickOutside(node) {
  
  /**
   * @param {MouseEvent} event - The click event
   */
  const handleClick = (event) => {
    if (node && !node.contains(/** @type {Node} */ (event.target)) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('outclick', {
          detail: {
            target: event.target
          }
        })
      );
    }
  };

  document.addEventListener('click', handleClick, true);
  
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

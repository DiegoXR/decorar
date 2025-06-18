<script>
    import { onMount } from "svelte";
    import ArrowLeft from "$lib/components/IconComponents/ArrowLeft.svelte";
    import ArrowRight from "$lib/components/IconComponents/ArrowRight.svelte";
    import BaseIconButton from "$lib/components/UIComponents/CustomMadeComponents/BaseIconButton.svelte";
    
    // Default values and constraints
    const min = 1;   // Minimum value
    const max = 20;  // Maximum value
    let counter = 3; // Default value

    /**
     * @type {number}
     */
    export let selectedOption;

    /**
     * @type {number}
     */
    export let defaultValue;

    /**
     * @type {string}
     * Label text to display below the input
     */
    export let label = "";

    /**
     * @type {HTMLInputElement}
     */
    let inputElement;

    // Computed value to append "cm" postfix
    $: displayValue = `${counter} cm`;

    onMount(() => { 
        inputElement.addEventListener('change', handleInputChange);
        selectedOption = defaultValue;
        counter = selectedOption;
    });

    /**
     * @param {{ preventDefault: () => void; }} event
     */
    function increment(event) {
        event.preventDefault(); // Prevent default behavior
        if (counter < max) {
            counter++;
            selectedOption = counter;
        } 
    }

    /**
     * @param {{ preventDefault: () => void; }} event
     */
    function decrement(event) {
        event.preventDefault(); // Prevent default behavior
        if (counter > min) {
            counter--;
            selectedOption = counter;
        }
    }

    /**
     * Handle manual input changes
     */
    function handleInputChange() {
        // Convert from String to Number
        const inputValue = parseInt(inputElement.value, 10);
        
        // Check if the value is a valid number and within range
        if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
            selectedOption = inputValue;
            counter = inputValue;
        } else {
            // Reset to current counter value if invalid input
            inputElement.value = displayValue;
        }
    }
</script>

<style>
    /* Ensure font size is at least 16px to prevent Safari zooming */
    input {
        font-size: 16px;
    }
    
    /* Prevent double-tap zoom on mobile devices */
    :global(.number-input-button) {
        touch-action: manipulation;
    }
</style>

<div class="flex flex-col items-center justify-between w-[200px]">
    <div class="relative flex items-center w-full">
        <!-- Decrement button -->
        <BaseIconButton 
            on:click={decrement}
            variant="BaseSecondary"
            rounded="none"
            size="medium"
            ariaLabel="Decrease value"
            class="number-input-button"
        >
            <ArrowLeft />
        </BaseIconButton>
        
        <!-- Input field -->
        <input
            type="text"
            class="body-3 h-10 text-center text-black block w-full border-0 focus:ring-0 focus:border-0 focus:outline-none"
            value={displayValue}
            bind:this={inputElement}
            aria-label="Number input"
        />
        
        <!-- Increment button -->
        <BaseIconButton 
            on:click={increment}
            variant="BaseSecondary"
            rounded="none"
            size="medium"
            ariaLabel="Increase value"
            class="number-input-button"
        >
            <ArrowRight />
        </BaseIconButton>
    </div>
    
    <!-- Label below input -->
    {#if label}
        <div class="w-full text-center">
            <p class="body-4 text-gray-600">{label}</p>
        </div>
    {/if}
</div>

<script>
    import { onMount } from "svelte";
    import { mountParcel } from "../../Chef-carousel";
    import { v4 as uuid } from "uuid";
    import { SkeletonCard } from "@Chef/styleguide";

    export let className = "";

    const id = `card-container-${uuid()}}`;

    onMount(() => {
        const domElement = document.getElementById(id);
        mountParcel(SkeletonCard, { domElement, className });
    });
</script>

<div {id} />

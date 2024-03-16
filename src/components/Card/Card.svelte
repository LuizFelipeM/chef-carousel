<script>
    import { onMount } from "svelte";
    import { mountParcel } from "../../Chef-carousel";
    import { v4 as uuid } from "uuid";
    import { Card } from "@Chef/styleguide";

    export let className = "";
    export let title;
    export let tags;
    export let summary;
    export let stars;
    export let image;
    export let onClick;

    const id = `card-container-${uuid()}}`;

    onMount(() => {
        const domElement = document.getElementById(id);
        mountParcel(Card, {
            domElement,
            title,
            className,
            tags,
            summary,
            stars,
            image,
            onClick,
        });
    });
</script>

<div {id} />

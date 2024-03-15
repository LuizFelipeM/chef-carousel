<script>
    import { onMount } from "svelte";
    import { mountParcel } from "../../Chef-carousel";

    export let className = "";
    export let title;
    export let tags;
    export let summary;
    export let stars;
    export let image;
    export let onClick;

    onMount(() => {
        const domElement = document.getElementById("vanillajs-app-container");
        import("@Chef/styleguide").then((module) =>
            mountParcel(module.Card, {
                domElement,
                title,
                className,
                tags,
                summary,
                stars,
                image,
                onClick,
            })
        );
    });
</script>

<div id="vanillajs-app-container" />

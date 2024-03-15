<script>
    export let recipe;
    export let onClick;
    export let stars;
</script>

<div class="card px-2 mx-3 my-6">
    <div class="card-image">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a on:click={onClick}>
            <figure class="image is-4by3">
                <img src={recipe?.image} alt={`${recipe?.title} image`} />
            </figure>
        </a>
    </div>
    <div class="card-content">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a class="title is-4 two-lines" on:click={onClick}>
            {recipe?.title}
        </a>

        <div class="content">
            <div class="columns is-gapless m-0">
                {#each stars as className}
                    <span>
                        <i class={className} />
                    </span>
                {/each}
            </div>
            <p class="three-lines">
                {@html recipe?.summary}
            </p>
            <div class="tags">
                {#if recipe?.dishTypes}
                    {#each recipe?.dishTypes?.splice(0, 2) as tag}
                        <span class="tag is-light">{tag}</span>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .card a.title {
        line-height: 1.5rem;
        min-height: 3rem;
    }

    .two-lines {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .three-lines {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>

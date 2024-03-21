<script>
  import "@splidejs/splide/dist/css/themes/splide-default.min.css";
  import * as singleSpa from "single-spa";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { onMount } from "svelte";
  import { api, state, routes } from "@Chef/utility";
  import _ from "lodash";
  import Card from "./components/Card/Card.svelte";
  import SkeletonCard from "./components/SkeletonCard/SkeletonCard.svelte";

  const recipesQty = 16;
  const options = {
    rewind: true,
    perPage: 4,
    breakpoints: {
      640: {
        perPage: 1,
        fixedHeight: "574px",
      },
    },
  };

  let recipesAndStars = undefined;

  const setRecipesAndStars = _.debounce(async (recipe) => {
    try {
      let recipes = [];

      if (recipe)
        recipes.push(...(await api.recipes.getSimilar(recipe.id, recipesQty)));

      recipes.push(
        ...(await api.recipes.getRandom(recipesQty - recipes.length)).recipes
      );

      recipesAndStars = recipes.map((recipe) => [
        recipe,
        new Array(5).fill(null).map((_, i, arr) => {
          const score = recipe.spoonacularScore / 100;
          return i + 1 < arr.length * score
            ? "fa-solid fa-star"
            : score % 1 >= 0.5
            ? "fa-regular fa-star-half-stroke"
            : "fa-regular fa-star";
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  }, 1500);

  onMount(() => {
    state.subscribe(({ recipe }) => setRecipesAndStars(recipe));
  });

  const onClick = (recipe) => (e) => {
    e.preventDefault();
    state.next({ recipe });
    singleSpa.navigateToUrl(routes.RECIPE.replace(":id", recipe.id));
  };
</script>

{#if recipesAndStars}
  <Splide aria-label="Recipes" {options}>
    {#each recipesAndStars as [recipe, stars], i}
      <SplideSlide>
        <div class="is-flex">
          <Card
            className="px-2 mx-3 my-6"
            title={recipe?.title}
            image={recipe?.image}
            onClick={onClick(recipe)}
            summary={recipe?.summary}
            tags={recipe?.dishTypes?.splice(0, 2)}
            {stars}
          />
        </div>
      </SplideSlide>
    {/each}
  </Splide>
{:else}
  <Splide aria-label="Loading" {options}>
    {#each new Array(recipesQty).fill(null) as e, i}
      <SplideSlide>
        <SkeletonCard className="px-2 mx-3 my-6" />
      </SplideSlide>
    {/each}
  </Splide>
{/if}

<script>
  import "@splidejs/splide/dist/css/themes/splide-default.min.css";
  import * as singleSpa from "single-spa";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { onMount } from "svelte";
  import { api, state, routes } from "@Chef/utility";
  import _ from "lodash";
  import Card from "./components/Card/Card.svelte";

  const options = {
    rewind: true,
    perPage: 4,
  };

  let recipesAndStars = undefined;

  const setRecipesAndStars = _.debounce(async (recipe) => {
    try {
      let recipes = [];

      if (recipe)
        recipes.push(...(await api.recipes.getSimilar(recipe.id, 16)));

      recipes.push(
        ...(await api.recipes.getRandom(16 - recipes.length)).recipes
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
  <Splide aria-label="My Favorite Images" {options}>
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
  <div class="section skeleton">
    <div class="columns">
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64" />
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <br />
                  <br />
                  <br />
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left" />
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <article class="message">
          <div class="message-header">
            <p />
          </div>
          <div class="message-body">
            <p />
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}

<style>
  .skeleton .message-header {
    background-color: #e2e2e2;
    animation: loading 0.5s infinite alternate;
  }

  @keyframes loading {
    from {
      background-color: #b8b3b3;
    }
    to {
      background-color: hsl(0, 5%, 78%);
    }
  }
</style>

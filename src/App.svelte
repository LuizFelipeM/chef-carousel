<script>
  import "@splidejs/splide/dist/css/themes/splide-default.min.css";
  import * as singleSpa from "single-spa";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { onMount } from "svelte";
  import { api, state, routes } from "@Chef/utility";
  import _ from "lodash";
  import Card from "./components/Card/Card.svelte";
  import VanillaCard from "./components/VanillaCard/VanillaCard.svelte";

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
          <Card {recipe} {stars} onClick={onClick(recipe)} />
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

<VanillaCard
  className="px-2 mx-3 my-6"
  title="Lemon Drop Jello Shots"
  image="https://spoonacular.com/recipeImages/649625-556x370.jpg"
  onClick={() => console.log("click")}
  stars={new Array(5).fill("fa-solid fa-star")}
  summary="Lemon Drop Jello Shots is a <b>gluten free, dairy free, and fodmap friendly</b> side dish. This recipe serves 4. One serving contains <b>177 calories</b>, <b>4g of protein</b>, and <b>1g of fat</b>. For <b>$1.32 per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. 4 people were glad they tried this recipe. It is brought to you by Foodista. A mixture of lemon vodka, lemon jello, sugar, and a handful of other ingredients are all it takes to make this recipe so tasty. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 35%</b>. This score is rather bad. <a href='https://spoonacular.com/recipes/lemon-cake-jello-shots-959266'>Lemon Cake Jello Shots</a>, <a href='https://spoonacular.com/recipes/lemon-drop-martini-jelly-shots-53439'>Lemon Drop Martini Jelly Shots</a>, and <a href='https://spoonacular.com/recipes/margarita-jello-shots-of-the-jello-masters-147346'>Margarita Jello Shots of the Jello Masters</a> are very similar to this recipe."
  tags={["side dish"]}
/>

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

Vue.component('product', {

    template: `

      <div class="souls">

      <div class="SoulsImage">
        <a v-bind:href="link"><img v-bind:src="image" alt=""></a>
      </div>

      <div class="SoulsInfo">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>

        <ul>
          <li v-for="index in productDetails">{{ index }}</li>
        </ul>


        <name-form @setName="setUserName"></name-form>


        <exercise-form @exerciseAdded="addExercise"></exercise-form>

        <div v-if="routines.length">
          <button v-on:click="sortList"><p v-if="!listSorted">Sort List</p>
            <p v-else-if="listSorted">Unsort List</p>
          </button>

        </div>

        <div>

          <h2>Routines</h2>
          <p v-if="routines.length === 0">No routines added yet.</p>

          <ul>
            <li v-for="routine in routines">
              <p>{{ routine.name }}</p>
              <p>{{ routine.e2 }}</p>
              <p>{{ routine.e3 }}</p>
              <p>{{ routine.e4 }}</p>
              <p>{{ routine.e5 }}</p>
            </li>
          </ul>

          <p v-if="routines.length !== 0">
            <delete-form @deletion="removeRoutine"></delete-form>
          </p>


        </div>
      </div>
      </div>
    `,

    data() {

        return {
            gameSuffix: "Routine Rodeo",
            game: "Swole Souls",
            description: "Gaze at the sun, and bask in its welcoming warm embrace.",
            selectedVariant: 0,
            link: "https://www.youtube.com/watch?v=bzJDimvPW1Y",
            productDetails: ["98% Swole", "1% Natty", "1% Vegan"],
            sunBroSwoleGod: [
                {
                    variantId: 1,
                    variantStyle: "Solaire of Astora (Coop)",
                    variantImage: "../img/solaire.jpg",
                    variantColor: "yellow",
                    variantQuantity: 5,
                }
            ],
            routines: [],
            listSorted: false,
            username: ""

        }


    },

    methods: {

        removeRoutine(userInput) {

            for (let i = 0; i < this.routines.length; i++) {
                if (this.routines[i].name === userInput) {
                    alert("Routine: " + this.routines[i].name + " deleted.")
                    this.routines.splice(i, 1);
                    break;
                } else {
                    alert("No such routine.")
                }
            }

        },

        addExercise(userExercises) {
            this.routines.push(userExercises)
        },

        sortList() {
            this.routines.sort((a, b) => (a.color > b.color) ? 1 : -1)
            this.listSorted = !this.listSorted;
        },

        setUserName(userInput) {
            if (userInput) {
                this.game = userInput
            }

        }

    },

    computed: {
        title() {
            if (this.username) {
                return this.username + " " + this.game + " " + this.gameSuffix;
            } else {
                return this.game + " " + this.gameSuffix;
            }

        },
        image() {
            return this.sunBroSwoleGod[this.selectedVariant].variantImage
        },
    }
})

Vue.component('deleteForm', {

    template: `

      <form class="delete-form" @submit.prevent="onSubmit">
      <p>
        <label for="delete">Enter the name of a routine to delete:</label>
        <input id="delete" v-model="userInput" required placeholder="<Enter Routine Name Here>">
      </p>
      <input type="submit" class="deleteButton" value="DELETE">
      </form>

    `,
    methods: {

        onSubmit() {

            this.$emit('deletion', this.userInput)

        }
    },
    data() {
        return {
            userInput: null
        }
    }
})

Vue.component('nameForm', {

    template: `

      <form class="name-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Enter Your Name:</label>
        <input id="name" v-model="userInput" style="width: auto" placeholder="<Enter Name>">
        <input type="submit" class="submitButton" value="Confirm">
      </p>
      </form>

    `,
    methods: {

        onSubmit() {

            this.$emit('setName', this.userInput)

        }
    },
    data() {
        return {
            userInput: null
        }
    }
})

Vue.component('exerciseForm', {
    template: `
      <form class="exercise-form" @submit.prevent="onSubmit">
      <p>
        <label for="activity">Routine Name:</label>
        <input id="activity" v-model="routineName" required placeholder="<Enter Routine Name Here>">
      </p>
      <p>
        <label for="activity">Exercise 1:</label>
        <input id="activity" v-model="exercise2" required placeholder="<Enter Exercise Here>">
      </p>
      <p>
        <label for="activity">Exercise 2:</label>
        <input id="activity" v-model="exercise3" required placeholder="<Enter Exercise Here>">
      </p>
      <p>
        <label for="activity">Exercise 3:</label>
        <input id="activity" v-model="exercise4" required placeholder="<Enter Exercise Here>">
      </p>
      <p>
        <label for="activity">Exercise 4:</label>
        <input id="activity" v-model="exercise5" required placeholder="<Enter Exercise Here>">
      </p>

      <p>
        <input type="submit" class="submitButton" value="Add Routine">
        <input type="reset" class="submitButton" value="Reset Form">
      </p>
      </form>
    `,
    data() {
        return {
            routineName: null,
            exercise2: null,
            exercise3: null,
            exercise4: null,
            exercise5: null,
        }
    },
    methods: {
        onSubmit() {

            let userExercises = {
                name: this.routineName,
                e2: this.exercise2,
                e3: this.exercise3,
                e4: this.exercise4,
                e5: this.exercise5,
            }

            this.$emit('exerciseAdded', userExercises)
            this.routineName = null
            this.exercise2 = null
            this.exercise3 = null
            this.exercise4 = null
            this.exercise5 = null

        },
    }
})

app = new Vue({
    el: "#app"
})
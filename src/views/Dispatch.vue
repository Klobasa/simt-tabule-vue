<template>

  <div class="primary">
    <div class="title">
      <div class="align-items-center row flex-fill">
        <div class="col text-center text-sm-start pb-3 pb-sm-0">
          <h2>Dispečink</h2>
        </div>
        <div class="col-12 col-sm-7 col-md-5 col-lg-4 text-sm-end"><!--   <input type="text" spellcheck="false" placeholder="Vyhledat zastávku" autocomplete="off" class="form-control px-2" v-model="this.queryStation" @keyup="filterStations"> -->
          <button type="button" class="btn btn-danger" v-if="logged" v-on:click="logout">➲ Odhlásit</button>
        </div>
      </div>
    </div>
  </div>

  <div class="secondary" v-if="logged">
    <div class="align-items-start col-12 col-md-3">
      <form ref="addPlayer">
        <div class="mb-0">
          <label for="search" class="visually-hidden">Nick</label>
          <div class="input-group">
            <div class="input-group-text">Nick</div>
            <input type="text" class="form-control" placeholder="" id="search" v-model="formPlayer">
          </div>
          <!--
          <ul v-if="searchNicks.length" class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10">
            <li v-for="nick in searchNicks" :key="nick" class="cursor-pointer hover:bg-gray-100 p-1">
              {{ nick }}
            </li>
          </ul>
          -->
        </div>
        <div class="mb-0">
          <label for="sluzba" class="visually-hidden">Služba</label>
          <div class="input-group">
            <div class="input-group-text">Služba</div>
            <input type="text" class="form-control" placeholder="" id="sluzba" v-model="formSluzba">
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="addPlayer">Přidat</button>
      </form>

    </div>
  </div>

  <div class="board" v-if="!logged">
    <div class="boardHeader d-flex">
      <div class="col-12">
        <p>Přihlášení pro dispečery SIMT - ježdění</p>
        <p v-for="error in errors" :key="error" style="color: #f08080">{{ error }}</p>
        <a :href="discordUrl">
          <img src="../assets/discord-login.png" height="50">
        </a>
      </div>
    </div>
  </div>

  <div class="board" v-if="logged">
    <table class="table table-hover">
      <thead class="d-none d-md-table-row">
      <th scope="col">Hráč</th>
      <th scope="col">Služba</th>
      <th scope="col">Linka</th>
      <th scope="col">Výchozí</th>
      <th scope="col">Aktuální</th>
      <th scope="col">Cílová</th>
      <th scope="col">Odchylka</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-if="timeFromLastRespond > 1.0">
        <td style="background-color: #f08080" colspan="8">
          <svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <b>Nelze aktualizovat data. Poslední aktualizace: <format-date-time :datetime="trips.timeGenerated" :datetimeFormat="'HH:mm:ss'"/></b>
        </td>
      </tr>
      <tr v-for="error in errors" :key="error">
        <td style="background-color: #f08080" colspan="8" v-if="trips.length === 0">
          <svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          {{ error }}
        </td>
      </tr>
      </tbody>
      <draggable v-model="players" tag="tbody" item-key="nick" @change="regeneratePlayers">
      <!--  <tr v-for="showPlayer in players" :key="showPlayer.nick"> -->
        <template #item="{ element }">
          <tr>
            <dispatch-player-div :player="element" :trips="trips" :key="trips"></dispatch-player-div>
            <td><button type="button" class="btn btn-danger btn-sm" @click="removePlayer(element.id)">🗑</button></td>
          </tr>
        </template>
      </draggable>
    </table>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import DispatchPlayerDiv from "../components/DispatchPlayerDiv";
import { DateTime, Interval } from "luxon";
import FormatDateTime from "../components/FormatDateTime";

//import { computed, ref } from "vue";
export default {
  name: "Dispatch.vue",
  components: { FormatDateTime, DispatchPlayerDiv, draggable },
  data() {
    return {
      authentication: [],
      players: [],
      logged: false,
      formPlayer: "",
      formSluzba: "",
      trips: [],
      timeInterval: null,
      promiseResolved: false,
      errors: [],
      drag: false,
      randomString: this.stringGenerator(15),
      discordUrl: "https://discord.com/oauth2/authorize?response_type=token&client_id=1051915606359814164&scope=identify%20guilds.members.read&redirect_uri=",
      timeFromLastRespond: 0,
    };
  },

/*
  async setup() {
    //https://stevencotterill.com/articles/how-to-build-an-autocomplete-field-with-vue-3

    //const responsePlayers = await fetch(process.env.VUE_APP_ROOT_API + "playersList");
    //this.necoplayers = await responsePlayers.json();

    let searchTerm = ref("");
    let lplayers = this.necoplayers;

    const searchNicks = computed(() => {
      if (searchTerm.value === "") {
        return [];
      }

      let matches = 0;

      return lplayers.filter(nick => {
        if (nick.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
          matches++;
          return nick;
        }
      });
    });

    const selectNick = (nick) => {
      selectedNick = nick;
      searchTerm.value = "";
    }

    let selectedNick = ref("");

    return {
      lplayers,
      searchTerm,
      searchNicks,
      selectNick,
      selectedNick
    }
  },

 */

  beforeMount() {
    this.discordUrl = process.env.NODE_ENV === 'development' ? this.discordUrl += "http%3A%2F%2Flocalhost%3A8081%2Fdispecer" : this.discordUrl += "https%3A%2F%2Fsimt-tabule.cz%2Fdispecer";
  },

  created() {
    this.callData();
    this.timeInterval = setInterval(() => this.callData(), 10000);

    let path = useRoute().fullPath;
    path = path.includes("#") ? path : path + "#";
    //remove "/dispecer#"
    path = path.replace(/.*#/, "");

    if (path) {
      this.getAuthentication(path);
    }
    if (this.$cookie.isCookieAvailable("access_token")) {
      this.isUserDispatcher(this.$cookie.getCookie("access_token"));
    }

    let players = [];
    let cookiePlayers = this.$cookie.isCookieAvailable("filteredPlayers") ? this.$cookie.getCookie("filteredPlayers") : "";
    cookiePlayers = cookiePlayers.split("¥");
    cookiePlayers.forEach(function (cookiePlayer) {
      if (cookiePlayer !== "") {
        const split = cookiePlayer.split("₱");
        players.push({id: split[0], nick: split[1], sluzba: split[2]});
      }
    });
    this.players = players;

  },

  beforeUnmount() {
    clearInterval(this.timeInterval);
  },

  methods: {
    async callData() {
      try {
        const response = await fetch(process.env.VUE_APP_ROOT_API + "spoj?man=true");
        if (response.ok) {
          this.trips = await response.json();
          this.errors = [];
        } else {
          this.errors.push("Spoje se nepodařilo načíst");
          this.errors.push(response.status);
        }
      } catch (e) {
        this.errors = [];
        this.errors.push("Spoje se nepodařilo načíst");
        this.errors.push(e.toString());
      }
      this.timeFromLastRespond = Interval.fromDateTimes(DateTime.fromISO(this.trips.timeGenerated), DateTime.now()).length("minutes");
    },

    getAuthentication(path) {
      let auth = [];
      const splitPath = path.split("&");
      splitPath.forEach(function (element) {
        const sp = element.split("=");
        auth[sp[0]] = sp[1];
      });
      this.authentication = auth;
      this.$cookie.setCookie("access_token", this.authentication["access_token"], {expire: this.authentication["expires_in"]});
      this.$router.push({name: "dispecer"});
    },

    async isUserDispatcher(token) {
      try {
        const response = await fetch("https://discord.com/api/users/@me/guilds/697876355269787668/member", {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const user = await response.json();

          const dispatcherUsers = process.env.VUE_APP_DISCORD_USER_DISPATCHER.split(",");
          if (user.roles.includes(process.env.VUE_APP_DISCORD_ROLE_DISPECER)
            || user.roles.includes(process.env.VUE_APP_DISCORD_ROLE_ZASKOLENA)
            || user.roles.includes(process.env.VUE_APP_DISCORD_ROLE_DISPECER_ZACVIK)
            //   || user.roles.includes(process.env.VUE_APP_DISCORD_ROLE_DEVELOPMENT)
            || dispatcherUsers.includes(user.user.id)
          ) {
            this.logged = true;
          } else {
            this.errors.push("Nemáte oprávnění k přístupu");
          }
        } else {
          this.errors.push("Nemáte oprávnění k přístupu");
          return;
        }
      } catch (e) {
        this.errors.push("Nemáte oprávnění k přístupu");
        return;
      }
    },

    logout() {
      this.$cookie.removeCookie("access_token");
      this.logged = false;
    },

    addPlayer() {
      this.$emit("addPlayer", this.formPlayer);
      this.$emit("addPlayer", this.formSluzba);
      let cookiePlayers = this.$cookie.isCookieAvailable("filteredPlayers") ? this.$cookie.getCookie("filteredPlayers") : "";
      cookiePlayers = cookiePlayers + "¥" + this.players.length + "₱" + this.formPlayer + "₱" + this.formSluzba;
      this.$cookie.setCookie("filteredPlayers", cookiePlayers);
      this.players.push({id: this.players.length, nick: this.formPlayer, sluzba: this.formSluzba});
      this.$refs.addPlayer.reset();
    },

    removePlayer(playerId) {
      this.players.splice(playerId, 1); //odstranění
      let cookiePlayers = "";
      let players = this.players;
      this.players = [];
      players.forEach(player => {
        cookiePlayers = cookiePlayers + "¥" + this.players.length + "₱" + player.nick + "₱" + player.sluzba;
        this.$cookie.setCookie("filteredPlayers", cookiePlayers);
        this.players.push({id: this.players.length, nick: player.nick, sluzba: player.sluzba});
      });
    },

    regeneratePlayers() {
      let cookiePlayers = "";
      let players = this.players;
      this.players = [];
      players.forEach(player => {
        cookiePlayers = cookiePlayers + "¥" + this.players.length + "₱" + player.nick + "₱" + player.sluzba;
        this.$cookie.setCookie("filteredPlayers", cookiePlayers);
        this.players.push({id: this.players.length, nick: player.nick, sluzba: player.sluzba});
      });
    },

    stringGenerator(length) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
  },


  /*
  async findPlayerInTrip(playerNick) {
    console.log(this.trips);
    const a = this.trips.filter((n)=> n.playerNick === playerNick);
    console.log(a);
    return "";
  },

   */

  computed: {
    showPlayers: function() {
      if (this.$cookie.isCookieAvailable("filteredPlayers")) {
        let array = [];
        const split = this.$cookie.getCookie("filteredPlayers").split("|");
        for (let i = 0; i < split.length; i++) {
          const split2 = split[i].split("/");
         // const tripPlayer = this.findPlayerInTrip(split2[0]);
         // console.log(tripPlayer);
          array[i] = { nick: split2[0], sluzba: split2[1] };
        }
        return array;
      } else {
        return "";
      }
    },

  }
 };
</script>

<style scoped>
.input-group-text {
  min-width: 50px !important;
}
</style>